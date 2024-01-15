import { API_URL } from "./config.js";

const doAfter = (time, callback) =>
  new Promise((resolve) => setTimeout(() => resolve(callback()), time));

export const toKebabCase = (string) =>
  string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

export const getPupil = (tokenId) =>
  fetch(`${API_URL}/pupil/${tokenId}`).then((response) => response.json());

export const animateWithClass = (element, className, delay = 201) => {
  element.classList.add(className);
  return doAfter(delay, () => element.classList.remove(className));
};
