import { HeartFilled } from "@ant-design/icons"
import { useAllProductsWithWishlistStatus } from "../../hooks/useAllProductsWithWishlistStatus";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "../OutlinedButton";
import { ProductCard } from "../shop/ProductCard";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { ProfileWishlistSkeleton } from "../../skeletons/ProfileWishlistSkeleton";

export const ProfileWishlist = () => {
    const { products: allProducts, loading: productsLoading, refetch: refreshProducts } = useAllProductsWithWishlistStatus();
    const wishlistProducts = allProducts.filter(p => p.isWishlisted);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        if (!productsLoading) {
            const timeout = setTimeout(() => setShowSkeleton(false), 1000);
            return () => clearTimeout(timeout);
        } else {
            setShowSkeleton(true);
        }
    }, [productsLoading]);

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <HeartFilled className="text-2xl text-pink-400" />
                <h2 className="text-xl font-bold">
                    {t("common:wishlist")}
                </h2>
            </div>
            {showSkeleton ? (
                <ProfileWishlistSkeleton />
            ) : wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center my-8">
                    <span className="text-lg my-4">
                        {t("common:wishlist-empty")}
                    </span>
                    <OutlinedButton content={t("common:go-to-shop")} height={40} width={160} fontWeight="bold" onClick={() => navigate('/shop')} />
                </div>
            ) : (
                <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-6">
                    {wishlistProducts.map(product => (
                        <ProductCard key={product.id} product={product} onWishlistChange={() => refreshProducts()} />
                    ))}
                </div>
            )}
        </div>
    )
}

