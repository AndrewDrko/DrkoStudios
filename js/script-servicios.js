const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".main-header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Check if the link is an internal anchor link
    if (href && (href.startsWith("#") || href === "#")) {
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

      // Close mobile navigation
      const headerEl = document.querySelector("header");
      if (link.classList.contains("nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    }
  });
});

/******************************************************************** */
// Functionality cart
/******************************************************************** */
import { products } from "./../dev-data/products.js";
import { addItemCart, getNumProducts } from "../utils/cartAPI.js";

function cartMain() {
  const productsContainer = document.querySelector(".products");
  const numProductsElement = document.querySelector(".car-num");

  if (!productsContainer && !numProductsElement) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render products
  const rederProducts = () => {
    products.forEach((product) => {
      const markupProduct = `
        <div class="square grid grid--3-cols square-production" data-product-id=${
          product.id
        }>
          <div class="text-area">
            <h2 class="secondary-heading">${product.name}</h2>
            <p class="general-description">
              ${product.description}
            </p>
            <h2 class="secondary-heading subtitle">Especificaciones</h2>
            <ul class="service-features">
              ${product.specifications
                .map((item) => {
                  return `<li>${item}</li>`;
                })
                .join(" ")}
            </ul>
          </div>
          <img
            class="service-img"
            src=${product.imgUrl}
            alt="Drko Studios logo plus typography"
          />
          <div class="text-area price">
            <h2 class="secondary-heading subtitle">Precio</h2>
            <p class="pricing"><span>$</span>${
              product.price
            } MXN por canción.</p>
          </div>
          <button class="button-car" href="#">Añadir al Carrito</button>
        </div>
      `;

      productsContainer?.insertAdjacentHTML("beforeend", markupProduct);
    });
  };

  const rederProductsCart = () => {
    cart.forEach((product) => {
      const markupProduct = `
        <div class="square grid grid--3-cols square-production" data-product-id=${
          product.id
        }>
          <div class="text-area">
            <h2 class="secondary-heading">${product.name}</h2>
            <p class="general-description">
              ${product.description}
            </p>
            <h2 class="secondary-heading subtitle">Especificaciones</h2>
            <ul class="service-features">
              ${product.specifications
                .map((item) => {
                  return `<li>${item}</li>`;
                })
                .join(" ")}
            </ul>
          </div>
          <img
            class="service-img"
            src=${product.imgUrl}
            alt="Drko Studios logo plus typography"
          />
          <div class="text-area price">
            <h2 class="secondary-heading subtitle">Precio</h2>
            <p class="pricing"><span>$</span>${
              product.price
            } MXN por canción.</p>
          </div>
          <button class="button-car" href="#">Añadir al Carrito</button>
        </div>
      `;

      productsContainer?.insertAdjacentHTML("beforeend", markupProduct);
    });
  };

  // Handler events
  function handleAddProduct(e) {
    const btnProduct = e.target;

    if (!btnProduct.classList.contains("button-car")) return;

    const productElement = e.target.closest(".square-production");
    const productId = +productElement.dataset.productId;

    addItemCart(productId);
    numProductsElement.innerHTML = getNumProducts();
  }

  // LISTEN EVENTS
  productsContainer?.addEventListener("click", handleAddProduct);

  // INIT
  rederProducts();
  numProductsElement.innerHTML = getNumProducts();
}

cartMain();
