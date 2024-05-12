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
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    }
  });
});

/******************************************************************** */
// Functionality cart
/******************************************************************** */
import { products } from "./../dev-data/products.js";
import {
  addItemCart,
  getNumProducts,
  getTotalPrice,
  clearCart,
  updateLocalStorage,
  incrementQuantity,
  deleteItemCart,
  decreseQuantity,
} from "../utils/cartAPI.js";

function cartMain() {
  const productsContainer = document.querySelector(".products");
  const numProductsElement = document.querySelector(".car-num");
  const totalPriceEl = document.querySelector(".total-pricing");

  if (!productsContainer && !numProductsElement && !totalPriceEl) return;

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

  //
  const rederProductsCart = () => {
    const containerProductCart = document.querySelector(".table-products");
    const btnEmptyCart = document.querySelector(".btn-empty-car");
    const btnArrowUp = document.querySelector(".arrow-up");
    const btnArrowDown = document.querySelector(".arrow-down");

    if (!containerProductCart) return;

    cart.forEach((product) => {
      const markupProduct = `
        <div id="production-product" class="product grid grid--4-cols" data-product-id=${
          product.id
        }>
          <img
            class="check-img"
            src=${product.imgUrl}
            alt="Drko Studios logo plus typography"
          />
          <div class="text-area">
            <h2 class="secondary-heading subtitle">${product.name}</h2>
            <p class="available">Disponible</p>
            <p class="message">
              ¡Nos pondremos en contacto contigo para comenzar!
            </p>
            <button class="btns-check btn-remove">Remover</button>
          </div>
          <div class="quantity-product">
            <span class="order-number">${product.quantity}</span>
            <div class="btn-cont">
              <button class="btn-arrow arrow-up">
                <ion-icon
                  class="chev"
                  name="chevron-up-outline"
                ></ion-icon>
              </button>
              <button class="btn-arrow arrow-down">
                <ion-icon
                  class="chev"
                  name="chevron-down-outline"
                ></ion-icon>
              </button>
            </div>
          </div>
          <p class="pricing"><span>$</span>${
            product.price * product.quantity
          } MXN.</p>
        </div>
      `;

      containerProductCart?.insertAdjacentHTML("beforeend", markupProduct);
    });

    containerProductCart.addEventListener("click", (e) => {
      const arrowUp = e.target.closest(".arrow-up");
      const arrowDown = e.target.closest(".arrow-down");
      const btnRemove = e.target.closest(".btn-remove");

      // if (arrowDown || arrowDown) return;
      const productElement = e.target.closest(".product");
      const productId = +productElement.dataset.productId;

      if (btnRemove) {
        console.log(btnRemove);
        deleteItemCart(productId);
      }

      if (arrowUp) {
        incrementQuantity(productId);
      }

      if (arrowDown) {
        decreseQuantity(productId);
      }
      location.reload();
    });

    btnEmptyCart.addEventListener("click", () => {
      clearCart();

      location.reload();
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
  rederProductsCart();
  numProductsElement.innerHTML = getNumProducts();
  totalPriceEl.innerHTML = `$ ${getTotalPrice()} MXN.`;
}

cartMain();

paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: String(getTotalPrice()),
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert("Pago completado por " + details.payer.name.given_name);
        // Aquí puedes agregar código para enviar el correo según el formulario
      });
    },
  })
  .render("#paypal-button-container");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe
  // Verifica si el formulario está lleno correctamente
  if (validarFormulario()) {
    var paypalButton = document.querySelector(".paypal-button-container");
    var formularioEl = document.querySelector(".form");
    paypalButton.style.visibility = "visible";
    paypalButton.style.position = "relative";
    formularioEl.style.visibility = "hidden";
    alert("Hola Mundo");
  } else {
    alert("Por favor, completa todos los campos del formulario.");
  }
});

function validarFormulario() {
  var campo1 = document.getElementById("nombre").value;
  var campo2 = document.getElementById("email").value;
  // Agrega más validaciones según sea necesario
  if (campo1 !== "" && campo2 !== "") {
    return true; // El formulario está lleno correctamente
  } else {
    return false; // Faltan campos por llenar
  }
}

const btn = document.getElementById("button");

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Enviando...";

  const serviceID = "default_service";
  const templateID = "template_2c15ktb";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.style.visibility = "hidden";
      alert("Datos Enviados. Complete los datos de pago en PayPal");
    },
    (err) => {
      btn.style.visibility = "Proceder con la Compra";
      alert(JSON.stringify(err));
    }
  );
});
