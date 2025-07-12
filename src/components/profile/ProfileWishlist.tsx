import { HeartFilled } from "@ant-design/icons"
import { useProductsWithWishlist } from "../../hooks/useProductsWithWishlist";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "../OutlinedButton";
import { ProductCard } from "../shop/ProductCard";

export const ProfileWishlist = () => {
    const { products: allProducts, loading: productsLoading, fetchData: refreshProducts } = useProductsWithWishlist();
    const wishlistProducts = allProducts.filter(p => p.isWishlisted);
    const navigate = useNavigate();

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <HeartFilled className="text-2xl text-pink-400" />
                <h2 className="text-xl font-bold">Wishlist</h2>
            </div>
            {productsLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) : wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center my-8">
                    <span className="text-lg my-4">Your Wishlist is empty.</span>
                    <OutlinedButton content="Go to Shop" height={40} width={160} fontWeight="bold" onClick={() => navigate('/shop')} />
                </div>
            ) : (
                <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-6">
                    {wishlistProducts.map(product => (
                        <ProductCard key={product.id} product={product} onWishlistChange={() => refreshProducts(false)} />
                    ))}
                </div>
            )}
        </div>
    )
}
