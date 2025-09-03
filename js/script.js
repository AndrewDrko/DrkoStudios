/* import { getNumProducts } from "./../utils/cartAPI.js"; */

import { setLanguage } from "./setLanguage.js";

/* const numProductsElement = document.querySelector(".car-num");
numProductsElement.innerHTML = getNumProducts(); */

/* SET CURRENT YEAR */
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
const moreLink = document.querySelector(".more-link");
yearEl.textContent = currentYear;

/* MAKE MOBILE NAVIGATION WORK */

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector("header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth Scrolling animation

/* const allLinks = document.querySelectorAll("a:link");
console.log(allLinks);

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    console.log(href);

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
}); */

const allLinks = document.querySelectorAll("a");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    headerEl.classList.toggle("nav-open");

    if (moreLink) {
      headerEl.classList.remove("nav-open");
    }

    if (href && (href.startsWith("#") || href === "#")) {
      // Check if the link is an internal anchor link
      e.preventDefault();

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Scroll to other anchor links
        const sectionEl = document.querySelector(href);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/

///////////////////////////////////////////////////////////
// Sticky Navigation

window.addEventListener("scroll", function () {
  var header = document.querySelector(".main-header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

///////////////////////////////////////////////////////////
// Gallery Modal

const gallery = document.querySelector(".grid-galery");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

const closeModal = function () {
  modal.innerHTML = "";
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

overlay.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

gallery.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName === "IMG") {
    modal.insertAdjacentHTML(
      "afterbegin",
      `<img src="${e.target.dataset.src}" class="img-modal" />
        <button class="btn-close-modal">
        <ion-icon name="close-outline"></ion-icon>
      </button>
      `
    );
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");

    const btnCloseModal = modal.querySelector(".btn-close-modal");

    // Agregar evento de cierre al botón
    btnCloseModal.addEventListener("click", closeModal);
  }
});

// LANGUAGE FUNCTIONALITY

const langButton = document.querySelector(".language-selector");
const langContainer = document.querySelector(".selector-container");
const langOptions = document.querySelectorAll(".language");

langButton.addEventListener("click", function () {
  this.classList.toggle("selected");
  langContainer.classList.toggle("hidden");
});

langOptions.forEach((btn) => {
  btn.addEventListener("click", function () {
    const langSelected = this.dataset.lang;

    // Cambiar el HTML principal según el idioma
    setLanguage(langSelected);

    // Cambiar el texto y la bandera del botón principal
    const mainFlag = this.querySelector("img").src;
    const mainText = this.querySelector("span").textContent;

    langButton.querySelector("img").src = mainFlag;
    langButton.querySelector("span").textContent = mainText;

    // Ocultar el selector después de seleccionar
    langContainer.classList.add("hidden");
    langButton.classList.remove("selected");
  });
});

document.addEventListener("click", (e) => {
  if (!langButton.contains(e.target) && !langContainer.contains(e.target)) {
    langContainer.classList.add("hidden");
    langButton.classList.remove("selected");
  }
});
