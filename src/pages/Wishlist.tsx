import AppLayout from "../layouts/AppLayout"
import { useAllProductsWithWishlistStatus } from "../hooks/useAllProductsWithWishlistStatus"
import { ProductCard } from "../components/shop/ProductCard"
import { HeartFilled } from "@ant-design/icons";
import { OutlinedButton } from "../components/OutlinedButton";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";
import { themedBorder } from "../styles/themeClassNames";
import { useTranslation } from "react-i18next";

export const Wishlist = () => {
    const { products, loading, refetch } = useAllProductsWithWishlistStatus();
    const user = useAuthUser()
    const navigate = useNavigate();
    const { t } = useTranslation();

    const wishlistProducts = products.filter(p => p.isWishlisted);

    return (
        <AppLayout>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className={`${themedBorder} animate-spin rounded-full h-16 w-16 border-b-2`}></div>
                </div>
            ) : (
                <>
                    {user ?
                        <div className="flex flex-wrap justify-center items-center gap-12 my-8">
                            {wishlistProducts.length === 0 ? (
                                <div className="w-full flex flex-col items-center justify-center my-20">
                                    <span className="text-4xl uppercase font-bold my-8 text-center">{t("shop.your-wishlist-currently-empty")}</span>
                                    <HeartFilled style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
                                    <OutlinedButton
                                        content={t("common:return-to-shop")}
                                        height={60}
                                        width={200}
                                        fontWeight="bold"
                                        onClick={() => navigate('/shop')}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="w-full flex justify-center items-center py-8">
                                        <h1 className="text-5xl font-bold tracking-wide uppercase">{t("common:wishlist")}</h1>
                                    </div>
                                    {
                                        wishlistProducts.map(product => (
                                            <ProductCard key={product.id} product={product} onWishlistChange={() => refetch()} />
                                        ))
                                    }
                                </>
                            )}
                        </div>
                        : (
                            <div className="w-full flex flex-col items-center justify-center my-20">
                                <span className="text-4xl font-bold my-8 text-center">{t("auth.sign-in-to-view-wishlist")}</span>
                                <HeartFilled style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
                                <OutlinedButton
                                    content={t("common:sign-in")}
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

