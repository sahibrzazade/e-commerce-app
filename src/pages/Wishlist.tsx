import AppLayout from "../layouts/AppLayout"
import { useAllProductsWithWishlistStatus } from "../hooks/useAllProductsWithWishlistStatus"
import { ProductCard } from "../components/shop/ProductCard"
import { HeartFilled } from "@ant-design/icons";
import { OutlinedButton } from "../components/OutlinedButton";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

export const Wishlist = () => {
    const { products, initialLoading, fetchData } = useAllProductsWithWishlistStatus();
    const user = useAuthUser()
    const navigate = useNavigate();

    const wishlistProducts = products.filter(p => p.isWishlisted);

    return (
        <AppLayout>
            {initialLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) : (
                <>
                    {user ?
                        <div className="flex flex-wrap justify-center items-center gap-12 my-8">
                            {wishlistProducts.length === 0 ? (
                                <div className="w-full flex flex-col items-center justify-center my-20">
                                    <span className="text-4xl font-bold my-8 text-center">YOUR WISHLIST IS CURRENTLY EMPTY</span>
                                    <HeartFilled style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
                                    <OutlinedButton
                                        content="RETURN TO SHOP"
                                        height={60}
                                        width={200}
                                        fontWeight="bold"
                                        onClick={() => navigate('/shop')}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="w-full flex justify-center items-center py-8">
                                        <h1 className="text-5xl font-bold tracking-wide uppercase">Wishlist</h1>
                                    </div>
                                    {
                                        wishlistProducts.map(product => (
                                            <ProductCard key={product.id} product={product} onWishlistChange={() => fetchData(false)} />
                                        ))
                                    }
                                </>
                            )}
                        </div>
                        : (
                            <div className="w-full flex flex-col items-center justify-center my-20">
                                <span className="text-4xl font-bold my-8 text-center">PLEASE SIGN IN TO VIEW YOUR WISHLIST</span>
                                <HeartFilled style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
                                <OutlinedButton
                                    content="SIGN IN"
                                    height={60}
                                    width={200}
                                    fontWeight="bold"
                                    onClick={() => navigate('/sign-in')}
                                />
                            </div>
                        )}
                </>

            )}
        </AppLayout>
    )
}

