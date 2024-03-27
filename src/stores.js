const getSalomonProduct = async (browser, product) => {
  try {
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
    };
  } catch (error) {
    console.error("Error salomon:", error);
  }
};

const getAndesgearProduct = async (browser, product) => {
  try {
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
    };
  } catch (error) {
    console.error("Error andesgear:", error);
  }
};

const getParisProduct = async (browser, product) => {
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
    offer: await page.locator("div.price-box.offer-price.js-internet-price-container > p.js-internet-price-price").textContent(),
  };
  if (prices.offer === "") prices.offer = await page.locator("div.price-box p.js-list-price-price").textContent();
  if (prices.list === "") prices.list = prices.offer;
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
  };
};

const getRipleyProduct = async (browser, product) => {
  try {
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
    };
  } catch (error) {
    console.error("Error ripley:", error);
  }
};

const getMercadolibreProduct = async (browser, product) => {
  try {
    const { url, requieredVariant, variantType } = product;
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector(".ui-pdp-title");
    await page.screenshot({ path: `images/${new URL(url).hostname}/${new Date().toISOString()}.png` });

    const title = await page.locator(".ui-pdp-title").textContent();

    const prices = await page.evaluate(async () => ({
      list: document.querySelector('[data-testid="price-part"]')?.lastChild?.textContent ?? "",
      offer: document.querySelector('[data-testid="price-part"] > span')?.lastChild?.textContent ?? "",
    }));

    let variants = await page.evaluate(async () => {
      const containers = document.querySelector(".ui-pdp-variations__picker-default-container")?.children;
      return containers ? Array.from(containers).map((container) => ({ size: container?.textContent?.trim(), stock: true } ?? "")) : undefined;
    });

    if (!variants) {
      await page.click('button[aria-label="Selecciona una opción"]');
      await page.waitForSelector('[data-testid="popper"]');
      variants = await page.evaluate(async () => {
        const containers = document.querySelectorAll('[data-testid="popper"] ul li span .ui-pdp-dropdown-selector__item--label-small');
        return containers ? Array.from(containers).map((container) => ({ size: container?.textContent?.trim(), stock: true } ?? "")) : undefined;
      });
    }

    const available = variants?.find((variant) => variant.size === requieredVariant)?.stock ?? false;

    return {
      date: new Date().toISOString(),
      title,
      url,
      prices,
      available,
      requieredVariant,
      variantType,
      variants,
    };
  } catch (error) {
    console.error("Error mercadolibre:", error);
  }
};

export const getSalomonProducts = async (browser, products) => {
  const salomonProducts = await Promise.all(
    products.map((product) => {
      return getSalomonProduct(browser, product);
    })
  );
  return salomonProducts;
};

export const getAndesgearProducts = async (browser, products) => {
  const andesgearProducts = await Promise.all(
    products.map((product) => {
      return getAndesgearProduct(browser, product);
    })
  );
  return andesgearProducts;
};

export const getParisProducts = async (browser, products) => {
  const parisProducts = await Promise.all(
    products.map((product) => {
      return getParisProduct(browser, product);
    })
  );
  return parisProducts;
};

export const getRipleyProducts = async (browser, products) => {
  const ripleyProducts = await Promise.all(
    products.map((product) => {
      return getRipleyProduct(browser, product);
    })
  );
  return ripleyProducts;
};

export const getMercadolibreProducts = async (browser, products) => {
  const mercadolibreProducts = await Promise.all(
    products.map((product) => {
      return getMercadolibreProduct(browser, product);
    })
  );
  return mercadolibreProducts;
};
