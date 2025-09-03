import { translations } from "./translations.js";

export function setLanguage(lang) {
  // 1️⃣ Traduce textos internos (h1, p, button, etc.)
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.dataset.key;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // 2️⃣ Traduce placeholders de inputs y textarea
  document.querySelectorAll("[data-key-placeholder]").forEach((el) => {
    const key = el.dataset.keyPlaceholder;
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // 3️⃣ Traduce las opciones del select
  document.querySelectorAll("select option[data-key]").forEach((option) => {
    const key = option.dataset.key;
    if (translations[lang][key]) {
      option.textContent = translations[lang][key];
    }
  });
}
