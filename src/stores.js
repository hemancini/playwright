import { printAvailable } from "./utils.js";
import { getSalomonProduct, getAndesgearProduct, getParisProduct, getRipleyProduct, getMercadolibreProduct } from "./actions.js";

export const getSalomonProducts = async (browser, products) => {
  const salomonProducts = await Promise.all(
    products.map(async (product) => {
      try {
        const salomonProduct = await getSalomonProduct(browser, product);
        printAvailable(salomonProduct);
        return salomonProduct;
      } catch (error) {
        console.error("Error salomon:", error);
      }
    })
  );
  return salomonProducts;
};

export const getAndesgearProducts = async (browser, products) => {
  const andesgearProducts = await Promise.all(
    products.map(async (product) => {
      try {
        const andesgearProduct = await getAndesgearProduct(browser, product);
        printAvailable(andesgearProduct);
        return andesgearProduct;
      } catch (error) {
        console.error("Error andesgear:", error);
      }
    })
  );
  return andesgearProducts;
};

export const getParisProducts = async (browser, products) => {
  const parisProducts = await Promise.all(
    products.map(async (product) => {
      try {
        const parisProducts = await getParisProduct(browser, product);
        printAvailable(parisProducts);
        return parisProducts;
      } catch (error) {
        console.error("Error paris:", error);
      }
    })
  );
  return parisProducts;
};

export const getRipleyProducts = async (browser, products) => {
  const ripleyProducts = await Promise.all(
    products.map(async (product) => {
      try {
        const ripleyProduct = await getRipleyProduct(browser, product);
        printAvailable(ripleyProduct);
        return ripleyProduct;
      } catch (error) {
        console.error("Error ripley:", error);
      }
    })
  );
  return ripleyProducts;
};

export const getMercadolibreProducts = async (browser, products) => {
  const mercadolibreProducts = await Promise.all(
    products.map(async (product) => {
      try {
        const mercadolibreProduct = await getMercadolibreProduct(browser, product);
        printAvailable(mercadolibreProduct);
        return mercadolibreProduct;
      } catch (error) {
        console.error("Error mercadolibre:", error);
      }
    })
  );
  return mercadolibreProducts;
};
