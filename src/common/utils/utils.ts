
export const isClient = () => typeof window !== "undefined";
export const isServer = () => typeof window === "undefined";
export const getWindow = () => isClient() && window;


export const groupDataImageURL = (image?: string): string => {
  return `${process.env.NEXT_PUBLIC_GROUP_DATA_IMAGE_URL_API}/${image}`;
};

export const categoryImageURL = (image?: string): string => {
  return `${process.env.NEXT_PUBLIC_CATEGORY_IMAGE_URL_API}/${image}`;
};

export const productImageURL = (image?: string): string => {
  return `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL_API}/${image}`;
};
