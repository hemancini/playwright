export function printAvailable(product) {
  console.log(`${product?.available ? "✅" : "❌"} - ${product.requieredVariant} ${product.variantType} - ${product.url}`);
}
