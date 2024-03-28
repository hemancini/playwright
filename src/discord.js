const { DEBUG, DISCORP_WEBOOK_URL = "https://discord.com/api/webhooks/1222779406725156894/f8OpzQLkd109GPYcSoIKw49rcXxn05O5LqX-KEpt84E5HP6s_eJMFSgo4UW8NQi156B9" } = process.env;

export const sendMessage = async (availableProducts = []) => {
  const discordMessage = availableProducts
    ?.map((product) => {
      return `
    **${product.title}**
    Talla: ${product.requieredVariant} ${product.variantType}
    ${product.prices.offer} - ~~${product.prices.list}~~
    ${product.url}
    `;
    })
    .join()
    .replace(/^\s+/gm, "")
    .replace(",", "");

  if (DEBUG) console.log(discordMessage);

  fetch(DISCORP_WEBOOK_URL, {
    body: JSON.stringify({
      title: "Productos Disponibles",
      content: discordMessage,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then(function (res) {
      // console.log(res);
    })
    .catch(function (res) {
      console.log(res);
    });
};
