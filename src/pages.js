const storesAvailable = [
  //
  { salomon: false },
  { andesgear: false },
  { paris: false },
  { ripley: false },
  { mercadolibre: true },
  { thenorthface: true },
];

export const pages = {
  salomon: {
    enable: isAvailable("salomon"),
    products: [
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
  },
  andesgear: {
    enable: isAvailable("andesgear"),
    products: [
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
        url: "https://andesgear.cl/zapatilla-salomon-xa-pro-3d-v8-mg",
        requieredVariant: "10",
        variantType: "UK",
      },
    ],
  },
  paris: {
    enable: isAvailable("paris"),
    products: [
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
  },
  ripley: {
    enable: isAvailable("ripley"),
    products: [
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
  },
  mercadolibre: {
    enable: isAvailable("mercadolibre"),
    products: [
      {
        url: "https://articulo.mercadolibre.cl/MLC-1363928241-zapatilla-hombre-x-ultra-pioneer-gtx-gris-salomon-_JM",
        requieredVariant: "43",
        variantType: "CL",
      },
      {
        url: "https://articulo.mercadolibre.cl/MLC-990535361-zapatilla-xa-pro-3d-v8-gtx-m-_JM",
        requieredVariant: "43",
        variantType: "CL",
      },
      {
        url: "https://articulo.mercadolibre.cl/MLC-2326955650-zapatilla-hombre-xa-pro-3d-v9-gtx-negro-salomon-_JM",
        requieredVariant: "43",
        variantType: "CL",
      },
    ],
  },
  thenorthface: {
    enable: isAvailable("thenorthface"),
    products: [
      {
        url: "https://www.thenorthface.cl/zapatilla-cragstone-dryvent-hombre-nf0a5lxd-nfwmb",
        requieredVariant: "11",
        variantType: "UK",
      },
    ],
  },
};

function isAvailable(store) {
  return storesAvailable.some((storeAvailable) => storeAvailable[store]);
}
