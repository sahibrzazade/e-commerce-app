import { Timestamp } from "firebase/firestore";

export interface CartItem {
    quantity: number;
    addedAt: Timestamp;
}