import { useCart } from '../contexts/cartContext';
import AppLayout from '../layouts/AppLayout';
import {

  Button,
} from '@mui/material';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { OutlinedButton } from '../components/OutlinedButton';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';
import { useAuthUser } from '../hooks/useAuthUser';
import { useDiscount } from '../hooks/useDiscount';
import { useForm } from 'react-hook-form';
import { orderService } from '../services/orderService';
import { useState, useEffect } from 'react';
import { CartSkeleton } from '../skeletons/CartSkeleton';
import { useTheme } from '../contexts/themeContext';
import { themedBorder } from '../styles/themeClassNames';
import { getTextSx, getBackgroundSx } from '../utils/themeSx';
import { CartTable } from '../components/shop/CartTable';
import { useTranslation } from 'react-i18next';

export const Cart = () => {
  const { removeFromCart, removeLoading, clearCart, clearLoading, updateCartItem, updateLoading, count, total, cartProducts } = useCart();
  const { discount, discountedTotal, loading, applyCoupon, resetDiscount } = useDiscount();
  const { user, loading: userLoading } = useAuthUser();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const textSx = getTextSx(theme);
  const backgroundSx = getBackgroundSx(theme);

  const { register, handleSubmit } = useForm<{ coupon: string }>();

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleClear = async () => {
    await clearCart();
    showErrorMessage(t("common:cart-cleared"));
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
  };

  const handleRemoveCoupon = () => {
    resetDiscount(total);
  };

  const onSubmitCoupon = (data: { coupon: string }) => {
    applyCoupon(data.coupon);
  };

  const handleCheckout = async () => {
    if (!user || count === 0) return;

    setCheckoutLoading(true);
    try {
      const orderItems = cartProducts.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.product?.price || 0
      }));

      const orderId = await orderService.createOrder({
        userId: user.uid,
        items: orderItems,
        total: total,
        discount: discount,
        discountedTotal: discount ? discountedTotal : total
      });

      showSuccessMessage(t("shop.order-created-successfully"));

      await clearCart();

      navigate(`/orders/${orderId}`);
    } catch (error) {
      showErrorMessage(t("shop.order-creation-failed"));
    } finally {
      setCheckoutLoading(false);
    }
  };


  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    if (userLoading || loading || clearLoading || updateLoading) {
      setShowSkeleton(true);
    } else {
      const timeout = setTimeout(() => setShowSkeleton(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [userLoading, loading]);

  if (showSkeleton) {
    return (
      <AppLayout>
        <CartSkeleton />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {user ? (
        <div className="max-w-4xl mx-auto p-4">
          {count === 0 ? (
            <div className="w-full flex flex-col items-center justify-center my-20">
              <span className="text-4xl uppercase font-bold my-8 text-center">{t("shop.your-cart-is-currently-empty")}</span>
              <ShoppingCartOutlined style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
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
              <CartTable
                dataSource={cartProducts}
                textSx={textSx}
                backgroundSx={backgroundSx}
                updateLoading={updateLoading}
                removeLoading={removeLoading}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
              <div className="flex flex-col md:flex-row justify-between mt-4">
                <form onSubmit={handleSubmit(onSubmitCoupon)} className='flex flex-row gap-2 my-4 md:my-0'>
                  <input
                    type="text"
                    {...register('coupon', { required: 'Coupon code is required' })}
                    className={`${themedBorder} ${theme === "light" ? "bg-primary-light" : "bg-primary-dark"} outline-none w-[200px] md:w-[300px] h-[50px] px-2 py-1 me-4`}
                    disabled={discount ? true : false}
                  />
                  {!discount ?
                    <OutlinedButton content={loading ? t("common:applying") : t("common:apply-coupon")} height={50} width={180} fontWeight='bold' isDisabled={loading} type="submit" />
                    : <Button variant="outlined" color="error" className='h-[50px]' onClick={handleRemoveCoupon}>
                      {t("shop.remove-coupon")}
                    </Button>}
                </form>
                <div className='flex flex-col items-end gap-y-4'>
                  <Button variant="outlined" color="error" className='h-[50px]' onClick={handleClear} disabled={clearLoading}>
                    {t("common:clear-cart")}
                  </Button>
                  <span>{t("common:subtotal")}: ${total}</span>
                  <span className='text-amber-400'>{t("common:discount")}: ${discount}</span>
                  <span className='font-bold'>{t("common:total")}: ${discount ? discountedTotal : total}</span>
                  <OutlinedButton
                    content={checkoutLoading ? t("shop.creating-order") : t("shop.go-to-checkout")}
                    height={60}
                    width={200}
                    fontWeight="bold"
                    onClick={handleCheckout}
                    isDisabled={count === 0 || checkoutLoading}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center my-20">
          <span className="text-4xl font-bold my-8 text-center">{t("shop.please-sign-in-to-view-cart")}</span>
          <ShoppingCartOutlined style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
          <OutlinedButton
            content={t("common:sign-in")}
            height={60}
            width={200}
            fontWeight="bold"
            onClick={() => navigate('/sign-in')}
          />
        </div>
      )}
    </AppLayout>
  );
};
