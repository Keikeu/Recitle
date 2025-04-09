export const trackEvent = (eventName, params = null) => {
  if (typeof window !== "undefined" && window.gtag && window.location.hostname !== "localhost") {
    params ? window.gtag("event", eventName, params) : window.gtag("event", eventName);
  }
};
