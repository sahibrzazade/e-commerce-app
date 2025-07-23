import { ShoppingCartOutlined } from "@ant-design/icons"
import { OutlinedButton } from "../OutlinedButton"
import { useCart } from "../../contexts/cartContext"
import { useNavigate } from "react-router-dom"
import { getBackgroundSx, getTextSx } from "../../utils/themeSx"
import { useTheme } from "../../contexts/themeContext"
import { CartTable } from "../shop/CartTable"
import { useTranslation } from "react-i18next"

export const ProfileCart = () => {
    const navigate = useNavigate();
    const { cartProducts, count: cartCount, removeFromCart, removeLoading, updateCartItem, updateLoading } = useCart();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const textSx = getTextSx(theme);
    const backgroundSx = getBackgroundSx(theme);

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await updateCartItem(productId, newQuantity);
    };

    const handleRemove = async (productId: string) => {
        await removeFromCart(productId);
    };

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <ShoppingCartOutlined className="text-2xl" />
                <h2 className="text-xl font-bold">{t("common:cart")}</h2>
            </div>
            {cartCount === 0 ? (
                <div className="flex flex-col items-center justify-center my-8">
                    <span className="text-lg my-4">{t("common:your-cart-is-empty")}</span>
                    <OutlinedButton content={t("common:go-to-shop")} height={40} width={160} fontWeight="bold" onClick={() => navigate('/shop')} />
                </div>
            ) : (
                <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-6">
                    <CartTable
                        dataSource={cartProducts}
                        textSx={textSx}
                        backgroundSx={backgroundSx}
                        updateLoading={updateLoading}
                        removeLoading={removeLoading}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                    />
                </div>
            )}
        </div>
    )
}
