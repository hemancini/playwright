export function printAvailable(product) {
  product?.available && product?.url ? console.log("✅", product.url) : console.log("❌", product.url);
}
