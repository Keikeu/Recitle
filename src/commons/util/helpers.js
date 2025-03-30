import { eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { APP_URL_DEV, TIME_FRAMES } from "./constants";

export function isEmailValid(email) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export const getNextId = items => {
  if (!items.length) return 0;
  const ids = items.map(item => item.id);
  return Math.max(...ids) + 1;
};

export const generateRandomUUID = () => {
  const uuidTemplate = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return uuidTemplate.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const caseInsensitiveCompare = (a = "", b = "") => {
  return a.toUpperCase().includes(b.toUpperCase());
};

export const getDomainFromUrl = url => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

export const shortenLink = link => {
  if (!link) return "";
  const linkRegex = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/;
  const match = link.match(linkRegex);
  return match ? match[1] : link;
};

export const formatTime = minutes => {
  if (!minutes) {
    return "-";
  }

  const min = minutes % 60;
  const h = Math.floor(minutes / 60);

  if (!h) {
    return `${min}min`;
  }

  if (!min) {
    return `${h}h`;
  }

  return `${h}h ${min}min`;
};

export const getRandomIntInRange = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function minutesToHoursAndMinutesAndSeconds(totalMinutes) {
  const seconds = Math.floor((totalMinutes % 1) * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  if (!hours && !minutes) return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
  if (!hours && !seconds) return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  if (!minutes && !seconds) return `${hours} ${hours === 1 ? "hour" : "hours"}`;

  if (!hours) return `${minutes}min ${seconds}s`;
  if (!seconds) return `${hours}h ${minutes}min`;

  return "-";
}

export function getBufferFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

const skippedWords = [
  "a",
  "an",
  "the",
  "no",
  "some",
  "any",
  "and",
  "or",
  "for",
  "of",
  "in",
  "on",
  "at",
  "by",
  "with",
  "to",
  //
  "all",
  "half",
];

function highlightIngredientsInStep(stepText, ingredients) {
  const processedStepText = stepText.replace("</p>", "</p> ");

  const highlightedText = processedStepText.split(" ").map(word => {
    const cleanWord = word.replace(/(<([^>]+)>)/gi, " ").replace(/[^a-zA-Z]/g, "");

    if (skippedWords.includes(cleanWord.toLowerCase())) return cleanWord;

    const matchedIngredient = ingredients
      .filter(el => !el.isCategory)
      .find(ingredient => {
        const regex = new RegExp(`\\b${cleanWord}\\b`, "i");
        const includesWord = regex.test(ingredient.label);
        return includesWord;
      });

    return cleanWord && matchedIngredient ? `<b data-ingredient-id=${matchedIngredient.id}>${word}</b>` : word;
  });

  return highlightedText.join(" ");
}

const timeUnits = [
  "seconds",
  "second",
  "s",
  "minutes",
  "minute",
  "mins",
  "min",
  "m",
  "hours",
  "hour",
  "hrs",
  "hr",
  "h",
];

const timeUnitMap = {
  s: ["seconds", "second", "secs", "sec", "s"],
  m: ["minutes", "minute", "mins", "min", "m"],
  h: ["hours", "hour", "hrs", "hr", "h"],
};

function convertTimeToMinutes(number, unit) {
  let value;
  if (timeUnitMap.s.includes(unit)) value = number / 60;
  if (timeUnitMap.m.includes(unit)) value = number;
  if (timeUnitMap.h.includes(unit)) value = number * 60;
  return value;
}

export const highlightTimersInStep = stepText => {
  const regex =
    /(([0-9]+)\s?(and|-|to|seconds|second|secs|sec|s|minutes|minute|mins|min|m|hours|hour|hrs|hr|h)\s?)?([0-9]+)\s?(seconds|second|secs|sec|s|minutes|minute|mins|min|m|hours|hour|hrs|hr|h)\b/gim;

  const replacedString = stepText.replace(regex, (match, p1, p2, p3, p4, p5) => {
    const firstNumber = Number(p2);
    const firstUnitOrConnector = p3;
    const secondNumber = Number(p4);
    const secondUnit = p5;

    if (firstUnitOrConnector) {
      const isFirstUnit = timeUnits.includes(firstUnitOrConnector);

      if (isFirstUnit) {
        const firstUnit = firstUnitOrConnector;
        const value1 = convertTimeToMinutes(firstNumber, firstUnit);
        const value2 = convertTimeToMinutes(secondNumber, secondUnit);
        const value = value1 + value2;
        return `<button class="timer" value="${value}">${minutesToHoursAndMinutesAndSeconds(value)}</button>`;
      } else {
        const connector = firstUnitOrConnector;
        const value1 = convertTimeToMinutes(firstNumber, secondUnit);
        const value2 = convertTimeToMinutes(secondNumber, secondUnit);
        return `<button class="timer" value="${value1}">${minutesToHoursAndMinutesAndSeconds(
          value1
        )}</button> ${connector} <button class="timer" value="${value2}">${minutesToHoursAndMinutesAndSeconds(
          value2
        )}</button>`;
      }
    } else {
      const value = convertTimeToMinutes(secondNumber, secondUnit);
      return `<button class="timer" value="${value}">${minutesToHoursAndMinutesAndSeconds(value)}</button>`;
    }
  });

  return replacedString;
};

export const formatStep = (stepText, ingredients) => {
  return highlightTimersInStep(highlightIngredientsInStep(stepText, ingredients));
};

function convertValueToPixels(value) {
  if (!value) return 0;
  if (typeof value === "number") {
    return `${value}px`;
  } else return value;
}

export function calculateSpacingValue(
  spacing = 0,
  spacingTop,
  spacingRight,
  spacingBottom,
  spacingLeft,
  spacingX,
  spacingY
) {
  if (spacing && typeof spacing === "string" && spacing.includes(" ")) {
    return spacing;
  }

  const spacingArray = new Array(4).fill(convertValueToPixels(spacing));

  if (spacingTop !== undefined) {
    spacingArray[0] = convertValueToPixels(spacingTop);
  }
  if (spacingRight !== undefined) {
    spacingArray[1] = convertValueToPixels(spacingRight);
  }
  if (spacingBottom !== undefined) {
    spacingArray[2] = convertValueToPixels(spacingBottom);
  }
  if (spacingLeft !== undefined) {
    spacingArray[3] = convertValueToPixels(spacingLeft);
  }
  if (spacingX !== undefined) {
    spacingArray[1] = convertValueToPixels(spacingX);
    spacingArray[3] = convertValueToPixels(spacingX);
  }
  if (spacingY !== undefined) {
    spacingArray[0] = convertValueToPixels(spacingY);
    spacingArray[2] = convertValueToPixels(spacingY);
  }

  if (!spacingArray.filter(Boolean).length) return null;

  return spacingArray.join(" ");
}

export function getOriginalImageDimensions(src, callback) {
  const remoteSrc = (window.location.hostname === "localhost" ? APP_URL_DEV : window.location.origin) + src;
  const img = new Image();

  img.onload = function () {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    callback(width, height);
  };

  img.src = remoteSrc;
}

export function getDatesInTimeFrame(timeFrame, shownDate) {
  const firstDayOfTheWeek = 1; // Monday - To do - user preference

  if (timeFrame === TIME_FRAMES.day) {
    return [shownDate];
  }

  if (timeFrame === TIME_FRAMES.week) {
    return eachDayOfInterval({
      start: startOfWeek(shownDate, { weekStartsOn: firstDayOfTheWeek }),
      end: endOfWeek(shownDate, { weekStartsOn: firstDayOfTheWeek }),
    });
  }

  if (timeFrame === TIME_FRAMES.month) {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(shownDate), {
        weekStartsOn: firstDayOfTheWeek,
      }),
      end: endOfWeek(endOfMonth(shownDate), {
        weekStartsOn: firstDayOfTheWeek,
      }),
    });
  }
}

export function sortGroceryAisles(obj) {
  // Extract keys and sort them, excluding 'Other'
  const keys = Object.keys(obj)
    .filter(key => key !== "Other")
    .sort();

  // Create a new object with sorted keys and sorted values
  const sortedObj = {};
  keys.forEach(key => {
    // Sort the array of objects by the 'label' property
    sortedObj[key] = obj[key].sort((a, b) => a.label.localeCompare(b.label));
  });

  // Add the 'Other' key at the end, if it exists
  if (obj["Other"]) {
    sortedObj["Other"] = obj["Other"].sort((a, b) => a.label.localeCompare(b.label));
  }

  return sortedObj;
}

export function getBulkInputFromSteps(steps) {
  return steps
    .map(el => el.text)
    .filter(el => el && el !== "<p></p>")
    .join("<p></p>");
}

export function getStepsFromBulkInput(text) {
  return text.split("<p></p>").map((el, i) => ({ id: i + 1, number: i + 1, text: `${el.replace(/<p>|<\/p>/g, "")}` }));
}
