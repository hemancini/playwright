import { webkit } from "@playwright/test";
import { sendMessage } from "./discord.js";
import { pages } from "./pages.js";
import { getParisProducts, getSalomonProducts, getAndesgearProducts, getRipleyProducts, getMercadolibreProducts, getTheNorthFaceProducts } from "./stores.js";

const { DEBUG = false, HEADLESS = true } = process.env;
const allProducts = [];

(async () => {
  // launch browser
  const browser = await webkit.launch({ headless: HEADLESS, slowMo: 100 });

  try {
    if (pages.salomon.enable) {
      const salomon = await getSalomonProducts(browser, pages.salomon.products);
      allProducts.push(...salomon);
    }

    if (pages.andesgear.enable) {
      const andesgear = await getAndesgearProducts(browser, pages.andesgear.products);
      allProducts.push(...andesgear);
    }

    if (pages.paris.enable) {
      const paris = await getParisProducts(browser, pages.paris.products);
      allProducts.push(...paris);
    }

    if (pages.ripley.enable) {
      const ripley = await getRipleyProducts(browser, pages.ripley.products);
      allProducts.push(...ripley);
    }

    if (pages.mercadolibre.enable) {
      const mercadolibre = await getMercadolibreProducts(browser, pages.mercadolibre.products);
      allProducts.push(...mercadolibre);
    }

    if (pages.thenorthface.enable) {
      const theNorthFace = await getTheNorthFaceProducts(browser, pages.thenorthface.products);
      allProducts.push(...theNorthFace);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // close browser
  browser.close();

  if (DEBUG) console.log("allProducts:", allProducts);
  const availableProducts = allProducts?.filter((product) => product?.available);
  if (DEBUG) console.log("availableProducts:", availableProducts);

  if (availableProducts.length === 0) return;
  // send message to discord
  sendMessage(availableProducts);
})();
