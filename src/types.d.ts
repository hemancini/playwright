export type Sneaker = {
  title: string;
  date: string;
  url: string;
  prices: {
    list: number | string;
    offer: number | string;
  };
  available: boolean;
  variantType: string;
  requieredVariant: string;
  variants: {
    size: string;
    stock: boolean;
  }[];
};
