import { webkit } from "@playwright/test";
import { sendMessage } from "./discord.js";
import { pages } from "./pages.js";
import { getParisProducts, getSalomonProducts, getAndesgearProducts, getRipleyProducts, getMercadolibreProducts } from "./stores.js";

const { DEBUG, HEADLESS } = process.env;
const allProducts = [];

(async () => {
  // launch browser
  const browser = await webkit.launch({ headless: HEADLESS, slowMo: 100 });

  try {
    const salomon = await getSalomonProducts(browser, pages.salomon);
    allProducts.push(...salomon);

    const andesgear = await getAndesgearProducts(browser, pages.andesgear);
    allProducts.push(...andesgear);

    const paris = await getParisProducts(browser, pages.paris);
    allProducts.push(...paris);

    const ripley = await getRipleyProducts(browser, pages.ripley);
    allProducts.push(...ripley);

    const mercadolibre = await getMercadolibreProducts(browser, pages.mercadolibre);
    allProducts.push(...mercadolibre);
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
