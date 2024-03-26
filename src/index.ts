// https://knasta.cl/results?q=Pioneer%20Gtx

import { webkit } from "@playwright/test";
import { pages, getParisProducts, getSalomonProducts, getAndesgearProducts, getRipleyProducts } from "./stores";

const isDebugging = process.env.DEBUG === "true" || false;

(async () => {
  // launch browser
  const browser = await webkit.launch({ headless: true });

  try {
    const salomon = await getSalomonProducts(browser, pages.salomon);
    console.log(salomon);
  } catch (error) {
    console.error("Error salomon:", error);
  }

  try {
    const andesgear = await getAndesgearProducts(browser, pages.andesgear);
    console.log(andesgear);
  } catch (error) {
    console.error("Error andesgear:", error);
  }

  try {
    const paris = await getParisProducts(browser, pages.paris);
    console.log(paris);
  } catch (error) {
    console.error("Error paris:", error);
  }

  try {
    const ripley = await getRipleyProducts(browser, pages.ripley);
    console.log(ripley);
  } catch (error) {
    console.error("Error ripley:", error);
  }

  // close browser
  browser.close();
})();
