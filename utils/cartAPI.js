import { products } from './../dev-data/products.js';

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

// LOCAL STORAGE
export const updateLocalStorage = (item, data) => {
  console.log(data);
  localStorage.clear();
  localStorage.setItem(item, JSON.stringify(data));
};
