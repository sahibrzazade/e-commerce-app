import { Timestamp } from "firebase/firestore";
import { Product } from "./shop";

export interface CartItem {
    quantity: number;
    addedAt: Timestamp;
}

export interface CartProduct {
    id: string;
    quantity: number;
    product: Product | null;
}