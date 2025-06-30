export interface Product {
  id: string;
  brand: string;
  category: string;
  careInstructions: string;
  description: string;
  image: string;
  material: string;
  name: string;
  price: number;
  reviewsCount: number;
  stars: number;
  isAvailable: boolean;
}

export interface ProductCardProps {
  product: Product
}
