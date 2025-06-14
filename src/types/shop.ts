export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  reviewsCount: number;
  stars: number;
  isAvailable: boolean;
}

export interface ProductCardProps {
  product: Product
}
