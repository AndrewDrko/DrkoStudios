import { products } from './../dev-data/products.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// LOCAL STORAGE
export const updateLocalStorage = (item, data) => {
  console.log(data);
  localStorage.clear();
  localStorage.setItem(item, JSON.stringify(data));
};

export const clearCart = () => {
  localStorage.clear();
};

// CART FUNCIONALITY
export const addItemCart = (id) => {
  // Verify if exist item in the cart
  const productCart = cart.find((product) => product?.id === id);

  // Sum 1 to quantity if exist
  if (productCart) {
    productCart.quantity++;
    updateLocalStorage('cart', cart);
    return;
  }

  const product = products.find((product) => product.id === id);
  cart.push({ ...product });
  updateLocalStorage('cart', cart);
};

export const getNumProducts = () => {
  const cartRemote = localStorage.getItem('cart');

  if (!cartRemote) return 0;

  return JSON.parse(cartRemote).reduce(
    (acc, product) => acc + product.quantity,
    0
  );
};

export const getTotalPrice = () => {
  const totalPrice = cart.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );
  return totalPrice;
};

export const getProducts = () => {
  const products = localStorage.getItem('cart');

  if (!products) return [];

  return JSON.parse(products);
};

export const deleteItemCart = (id) => {
  const productsCart = getProducts();
  const indexProduct = productsCart.findIndex((product) => product.id === id);

  productsCart.splice(indexProduct, 1);

  updateLocalStorage('cart', productsCart);
};

export const incrementQuantity = (id) => {
  const products = getProducts();
  const product = products.find((product) => product.id === id);

  product.quantity++;
  updateLocalStorage('cart', products);
};

export const decreseQuantity = (id) => {
  const products = getProducts();
  const product = products.find((product) => product.id === id);
  console.log(product.quantity);

  if (product.quantity - 1 === 0) {
    deleteItemCart(product.id);
    return;
  }

  product.quantity--;
  updateLocalStorage('cart', products);
};
