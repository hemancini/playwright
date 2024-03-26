import type { Browser } from "@playwright/test";
import type { Sneaker } from "./types";

type Product = {
  url: string;
  requieredVariant: string;
  variantType: string;
};

export const pages = {
  salomon: [
    {
      url: "https://salomon.cl/products/zapatilla-x-ultra-pioneer-gtx-bl-1",
      requieredVariant: "10",
      variantType: "UK",
    },
    {
      url: "https://salomon.cl/products/zapatilla-xa-pro-3d-v8-gtx%C2%AE-bl",
      requieredVariant: "10",
      variantType: "UK",
    },
    {
      url: "https://salomon.cl/products/xa-pro-3d-v8-gra",
      requieredVariant: "10",
      variantType: "UK",
    },
    {
      url: "https://salomon.cl/products/zapatilla-xa-pro-3d-v8-bl-2",
      requieredVariant: "10",
      variantType: "UK",
    },
  ],
  andesgear: [
    {
      url: "https://andesgear.cl/zapatilla-hombre-x-ultra-pioneer-gtx-gris-salomon",
      requieredVariant: "10",
      variantType: "UK",
    },
    {
      url: "https://andesgear.cl/zapatilla-salomon-xa-pro-3d-v8-gtx-phantom",
      requieredVariant: "10",
      variantType: "UK",
    },
    {
      url: "https://www.andesgear.cl/zapatilla-salomon-xa-pro-3d-v8-mg",
      requieredVariant: "10",
      variantType: "UK",
    },
  ],
  paris: [
    {
      url: "https://paris.cl/zapatilla-hombre-x-ultra-pioneer-gtx-gris-salomon-MKMI26KSPX.html",
      requieredVariant: "43",
      variantType: "CL",
    },
    {
      url: "https://paris.cl/zapatilla-hombre-xa-pro-3d-v8-negro-salomon-MKMTFQK91F.html",
      requieredVariant: "43",
      variantType: "CL",
    },
    {
      url: "https://paris.cl/zapatilla-hombre-xa-pro-3d-v9-negro-salomon-MKDO9BOJT7.html",
      requieredVariant: "43",
      variantType: "CL",
    },
  ],
  ripley: [
    {
      url: "https://ripley.cl/zapatilla-hombre-x-ultra-pioneer-gtx-gris-salomon-mpm00089896942",
      requieredVariant: "43",
      variantType: "CL",
    },
    {
      url: "https://ripley.cl/zapatilla-hombre-xa-pro-3d-v8-cafe-salomon-mpm00055099010",
      requieredVariant: "43",
      variantType: "CL",
    },
    {
      url: "https://ripley.cl/zapatilla-hombre-xa-pro-3d-v8-negro-salomon-mpm00070229682",
      requieredVariant: "43",
      variantType: "CL",
    },
  ],
};

export const getSalomonProduct = async (browser: Browser, product: Product) => {
  const { url, requieredVariant, variantType } = product;
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: `images/${new URL(url).hostname}/${new Date().toISOString()}.png` });

  const title = (await page.locator("h1.product-title").textContent()) ?? "";
  const variantsList = await page.locator(".variant-field").all();
  const variants = await Promise.all(
    variantsList.map(async (variant) => {
      const size = await variant.textContent().then((text) => text?.trim());
      const stock = await variant.getAttribute("class").then((text) => !text?.includes("strikethrough"));
      return { size, stock };
    })
  );
  const prices = {
    list: await page.locator(".product__price-and-badge .product__price__sale").textContent(),
    offer: await page.locator(".product__price-and-badge .money").textContent(),
  };
  const available = variants.find((variant) => variant.size === requieredVariant)?.stock ?? false;
  return {
    date: new Date().toISOString(),
    title,
    url,
    prices,
    available,
    requieredVariant,
    variantType,
    variants,
  } as Sneaker;
};

export const getAndesgearProduct = async (browser: Browser, product: Product) => {
  const { url, requieredVariant, variantType } = product;
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('[id^="option-label-size-"]');
  await page.screenshot({ path: `images/${new URL(url).hostname}/${new Date().toISOString()}.png` });

  const title = await page.locator('[data-ui-id="page-title-wrapper"]').textContent();
  const variantsList = await page.locator('div[id^="option-label-size-"]').all();
  const variants = await Promise.all(
    variantsList.map(async (variant) => {
      const size = await variant.textContent().then((text) => text?.replace("UK", "").trim());
      return { size, stock: true };
    })
  );

  const firstPriceText = await page.locator(".product-info-price span .price").first().textContent();
  const firstPriceNumber = Number(firstPriceText?.replace(/[$.]/g, ""));
  const lastPriceText = await page.locator(".product-info-price span .price").last().textContent();
  const lastPriceNumber = Number(lastPriceText?.replace(/[$.]/g, ""));

  const prices = {
    list: firstPriceNumber >= lastPriceNumber ? firstPriceText : lastPriceText,
    offer: firstPriceNumber <= lastPriceNumber ? firstPriceText : lastPriceText,
  };

  const available = variants.find((variant) => variant.size === requieredVariant)?.stock ?? false;
  return {
    date: new Date().toISOString(),
    title,
    url,
    prices,
    available,
    requieredVariant,
    variantType,
    variants,
  } as Sneaker;
};

export const getParisProduct = async (browser: Browser, product: Product) => {
  const { url, requieredVariant, variantType } = product;
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("#pdp-size-variation-attribute-section > div.tw-flex.tw-gap-8px.tw-flex-wrap");
  await page.screenshot({ path: `images/${new URL(url).hostname}/${new Date().toISOString()}.png` });

  const title = await page.locator("div.pdp-top__product-name > h1").textContent();
  const variantsList = await page.locator("#pdp-size-variation-attribute-section > div.tw-flex.tw-gap-8px.tw-flex-wrap").locator("> *").all();
  const variants = await Promise.all(
    variantsList.map(async (variant) => {
      const size = await variant.textContent().then((text) => text?.replace(" ", ".").trim());
      const stock = await variant
        .locator("> *")
        .getAttribute("class")
        .then((text) => text?.includes("tw-bg-transparent"));
      return { size, stock };
    })
  );
  const prices = {
    list: await page.locator("div.price-box.offer-price.js-internet-price-container > div > p").textContent(),
    offer: await page.locator("div.price-box.offer-price.js-internet-price-container > p.price-box__price--l.offer-price__price.js-internet-price-price").textContent(),
  };
  const available = variants.find((variant) => variant.size === requieredVariant)?.stock ?? false;
  return {
    date: new Date().toISOString(),
    title,
    url,
    prices,
    available,
    requieredVariant,
    variantType,
    variants,
  } as Sneaker;
};

export const getRipleyProduct = async (browser: Browser, product: Product) => {
  const { url, requieredVariant, variantType } = product;
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: `images/${new URL(url).hostname}/${new Date().toISOString()}.png` });

  const title = await page.locator(".react-product-page > section > section.product-header.visible-xs > h1").textContent();
  const variantsList = await page.locator(".product-options-container ol > li").all();
  const variants = await Promise.all(
    variantsList.map(async (variant) => {
      const size = await variant.locator("label").textContent();
      return { size, stock: true };
    })
  );
  const prices = {
    list: await page.locator(".product-info > dl.prices-list dt").first().textContent(),
    offer: await page.locator(".product-info > dl.prices-list dt").nth(1).textContent(),
  };
  const available = variants.find((variant) => variant.size === requieredVariant)?.stock ?? false;
  return {
    date: new Date().toISOString(),
    title,
    url,
    prices,
    available,
    requieredVariant,
    variantType,
    variants,
  } as Sneaker;
};

export const getSalomonProducts = async (browser: Browser, products: Product[]) => {
  const salomonProducts = await Promise.all(products.map((product) => getSalomonProduct(browser, product)));
  return salomonProducts;
};

export const getAndesgearProducts = async (browser: Browser, products: Product[]) => {
  const andesgearProducts = await Promise.all(products.map((product) => getAndesgearProduct(browser, product)));
  return andesgearProducts;
};

export const getParisProducts = async (browser: Browser, products: Product[]) => {
  const parisProducts = await Promise.all(products.map((product) => getParisProduct(browser, product)));
  return parisProducts;
};

export const getRipleyProducts = async (browser: Browser, products: Product[]) => {
  const ripleyProducts = await Promise.all(products.map((product) => getRipleyProduct(browser, product)));
  return ripleyProducts;
};
