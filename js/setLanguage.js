import { translations } from "./translations.js";

export function setLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.dataset.key;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
}
