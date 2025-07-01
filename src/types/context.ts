export interface WishlistContextType {
  count: number;
  refresh: () => Promise<void>;
}