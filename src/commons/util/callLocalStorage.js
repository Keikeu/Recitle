function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function callLocalStorage(url, method = "get", data = {}) {
  if (!url) return {};

  if (method === "get") {
    return JSON.parse(getItem(url));
  }

  if (method === "set") {
    return setItem(url, JSON.stringify(data));
  }

  return 200;
}

export default callLocalStorage;
