export interface DiscountResult {
    discount: number;
    discountedTotal: number;
    loading: boolean;
    applyCoupon: (code: string) => Promise<void>;
    resetDiscount: (cartTotal: number) => void;
}