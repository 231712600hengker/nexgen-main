// change or modify the types as your requirement

export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  aboutItem: string[];
  price: number;
  rating: number;
  brand?: string;
  stockItems: number;
  images: string[];
};

export type SearchParams = {
  page: string;
  category: string;
  brand: string;
  search: string;
  min: string;
  max: string;
};
