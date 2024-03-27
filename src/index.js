// https://knasta.cl/results?q=Pioneer%20Gtx

import { webkit } from "@playwright/test";
import { pages } from "./pages.js";
import { getParisProducts, getSalomonProducts, getAndesgearProducts, getRipleyProducts, getMercadolibreProducts } from "./stores.js";

const isDebugging = process.env.DEBUG === "true" || true;

(async () => {
  // launch browser
  const browser = await webkit.launch({ headless: true });

  const salomon = await getSalomonProducts(browser, pages.salomon);
  console.log(salomon);

  const andesgear = await getAndesgearProducts(browser, pages.andesgear);
  console.log(andesgear);

  const paris = await getParisProducts(browser, pages.paris);
  console.log(paris);

  const ripley = await getRipleyProducts(browser, pages.ripley);
  console.log(ripley);

  const mercadolibre = await getMercadolibreProducts(browser, pages.mercadolibre);
  console.log(mercadolibre);

  // close browser
  browser.close();
})();
