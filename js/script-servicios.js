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

function cartMain() {
  const productsContainer = document.querySelector(".products");
  const numProductsElement = document.querySelector(".car-num");

  if (!productsContainer && !numProductsElement) return;

  const products = [
    {
      id: 1,
      name: "Producción Musical",
      imgUrl: "/img/Cartoon_music.jpg",
      description:
        "Te ayudamos a proyectar tus ideas al siguiente nivel, realza la calidad musical de tus canciones y hazlas sonar profesionales.",
      specifications: [
        "Puedes contar con la idea principal de tu canción o iniciar una desde cero.",
        "Contar con una maqueta (Opcional)",
        "Tener conocimientos básicos de teoría musical para poder abordar tus canciones.",
        "El servicio cubre grabación, arreglos, composición y sound design.",
      ],
      price: 399,
      quantity: 1,
    },
    {
      id: 2,
      name: "Mezcla",
      imgUrl: "/img/Cartoon_music_production.jpg",
      description:
        "Envíanos tus tracks grabados y deja que nosotros le demos el sonido adecuado a tu canción bajo tus especificaciones.",
      specifications: [
        "Límite máximo de 40 pistas de stems.",
        "La canción no debe exceder de 5 minutos (de lo contrario se aumenta el monto de servicio).",
        "Es preferente que las pistas de stems estén previamente editadas (Opcional).",
        "Las pistas deben estar grabadas en muestreo de 44.1 Khz y tasa de 24 bits.",
      ],
      price: 499,
      quantity: 1,
    },
    {
      id: 3,
      name: "Mastering",
      imgUrl: "/img/Cartoon_masterin.jpg",
      description:
        " Envianos el bounce final de tu mezcla y nosotros nos encargamos de darle el volumen y calidad final para realzar las intenciones de la mezcla.",
      specifications: [
        "Puedes enviar stems de instrumentos o un único track de mezcla.",
        "La mezcla deberá tener un headroom máximo de -3.0db.",
        "La mezcla debe cumplir con criterios mínimos para una correcta masterización.",
        "Las pistas deben estar grabadas en muestreo de 44.1 Khz y tasa de 24 bits.",
      ],
      price: 199,
      quantity: 1,
    },
    {
      id: 4,
      name: "Distribución a Plataformas de Streaming",
      imgUrl: "/img/Cartoon_music_streaming.jpg",
      description:
        "Distribuye tu material musical en las plataformas de streaming más populares.",
      specifications: [
        "Deberás enviarnos tu track en un formato .wav o .mp3 de alta calidad (320kbps).",
        "Deberás enviarnos: Nombre de Artista, Album (Single, EP o LP), Fecha de Publicación (Bajo disponibilidad), Caratula (3000px x 3000px), Personas Involucradas en la Obra (Productores, Compositores etc).",
        "Deberás contar con alguna red social que identifique tu proyecto musical para registrarte en Spotify como Artista Verificado (En caso de no tener un perfil).",
      ],
      price: 99,
      quantity: 1,
    },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updateLocalStorage = (item, data) => {
    console.log(data);
    localStorage.clear();
    localStorage.setItem(item, JSON.stringify(data));
  };

  const addItemCart = (id) => {
    // Verify if exist item in the cart
    const productCart = cart.find((product) => product?.id === id);

    // Sum 1 to quantity if exist
    if (productCart) {
      productCart.quantity++;
      updateLocalStorage("cart", cart);
      return;
    }

    const product = products.find((product) => product.id === id);
    cart.push({ ...product });
    updateLocalStorage("cart", cart);
  };

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

  rederProducts();

  // Actions
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
  numProductsElement.innerHTML = getNumProducts();
}

export const getNumProducts = () => {
  const cartRemote = localStorage.getItem("cart");

  if (!cartRemote) return 0;

  return JSON.parse(cartRemote).reduce(
    (acc, product) => acc + product.quantity,
    0
  );
};
cartMain();

// const productsContainer = document.querySelector('.products');
// const numProductsElement = document.querySelector('.car-num');

// const products = [
//   {
//     id: 1,
//     name: 'Production musical',
//     imgUrl: '/img/Cartoon_music.jpg',
//     description:
//       'Te ayudamos a proyectar tus ideas al siguiente nivel, realza la calidad musical de tus canciones y hazlas sonar profesionales.',
//     specifications: [
//       'Puedes contar con la idea principal de tu canción o iniciar una desde cero.',
//       'Contar con una maqueta (Opcional)',
//       'Tener conocimientos básicos de teoría musical para poder abordar tus canciones.',
//       'El servicio cubre grabación, arreglos, composición y sound design.',
//     ],
//     price: 399,
//     quantity: 1,
//   },
//   {
//     id: 2,
//     name: 'Mezcla',
//     imgUrl: '/img/Cartoon_music_production.jpg',
//     description:
//       'Envíanos tus tracks grabados y deja que nosotros le demos el sonido adecuado a tu canción bajo tus especificaciones.',
//     specifications: [
//       'Límite máximo de 40 pistas de stems.',
//       'La canción no debe exceder de 5 minutos (de lo contrario se aumenta el monto de servicio).',
//       'Es preferente que las pistas de stems estén previamente editadas (Opcional).',
//       'Las pistas deben estar grabadas en muestreo de 44.1 Khz y tasa de 24 bits.',
//     ],
//     price: 499,
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: 'Mastering',
//     imgUrl: '/img/Cartoon_masterin.jpg',
//     description:
//       ' Envianos el bounce final de tu mezcla y nosotros nos encargamos de darle el volumen y calidad final para realzar las intenciones de la mezcla.',
//     specifications: [
//       'Puedes enviar stems de instrumentos o un único track de mezcla.',
//       'La mezcla deberá tener un headroom máximo de -3.0db.',
//       'La mezcla debe cumplir con criterios mínimos para una correcta masterización.',
//       'Las pistas deben estar grabadas en muestreo de 44.1 Khz y tasa de 24 bits.',
//     ],
//     price: 199,
//     quantity: 1,
//   },
//   {
//     id: 4,
//     name: 'Distribución a Plataformas de Streaming',
//     imgUrl: '/img/Cartoon_music_streaming.jpg',
//     description:
//       'Distribuye tu material musical en las plataformas de streaming más populares.',
//     specifications: [
//       'Deberás enviarnos tu track en un formato .wav o .mp3 de alta calidad (320kbps).',
//       'Deberás enviarnos: Nombre de Artista, Album (Single, EP o LP), Fecha de Publicación (Bajo disponibilidad), Caratula (3000px x 3000px), Personas Involucradas en la Obra (Productores, Compositores etc).',
//       'Deberás contar con alguna red social que identifique tu proyecto musical para registrarte en Spotify como Artista Verificado (En caso de no tener un perfil).',
//     ],
//     price: 99,
//     quantity: 1,
//   },
// ];

// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// const updateLocalStorage = (item, data) => {
//   console.log(data);
//   localStorage.clear();
//   localStorage.setItem(item, JSON.stringify(data));
// };

// const addItemCart = (id) => {
//   // Verify if exist item in the cart
//   const productCart = cart.find((product) => product?.id === id);

//   // Sum 1 to quantity if exist
//   if (productCart) {
//     productCart.quantity++;
//     updateLocalStorage('cart', cart);
//     return;
//   }

//   const product = products.find((product) => product.id === id);
//   cart.push({ ...product });
//   updateLocalStorage('cart', cart);
// };

// export const getNumProducts = () => {
//   const cartRemote = localStorage.getItem('cart');

//   if (!cartRemote) return 0;

//   return JSON.parse(cartRemote).reduce(
//     (acc, product) => acc + product.quantity,
//     0
//   );
// };

// // Render products
// const rederProducts = () => {
//   products.forEach((product) => {
//     const markupProduct = `
//       <div class="square grid grid--3-cols square-production" data-product-id=${
//         product.id
//       }>
//         <div class="text-area">
//           <h2 class="secondary-heading">${product.name}</h2>
//           <p class="general-description">
//             ${product.description}
//           </p>
//           <h2 class="secondary-heading subtitle">Especificaciones</h2>
//           <ul class="service-features">
//             ${product.specifications
//               .map((item) => {
//                 return `<li>${item}</li>`;
//               })
//               .join(' ')}
//           </ul>
//         </div>
//         <img
//           class="service-img"
//           src=${product.imgUrl}
//           alt="Drko Studios logo plus typography"
//         />
//         <div class="text-area price">
//           <h2 class="secondary-heading subtitle">Precio</h2>
//           <p class="pricing"><span>$</span>${product.price} MXN por canción.</p>
//         </div>
//         <button class="button-car" href="#">Añadir al Carrito</button>
//       </div>
//     `;

//     productsContainer?.insertAdjacentHTML('beforeend', markupProduct);
//   });
// };

// rederProducts();

// // Actions
// function handleAddProduct(e) {
//   const btnProduct = e.target;

//   if (!btnProduct.classList.contains('button-car')) return;

//   const productElement = e.target.closest('.square-production');
//   const productId = +productElement.dataset.productId;

//   addItemCart(productId);
//   numProductsElement.innerHTML = getNumProducts();
// }

// // LISTEN EVENTS
// productsContainer.addEventListener('click', handleAddProduct);

// // INIT
// numProductsElement.innerHTML = getNumProducts();
