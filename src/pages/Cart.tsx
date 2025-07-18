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
import { useState } from 'react';
import { useTheme } from '../contexts/themeContext';
import { themedBorder } from '../styles/themeClassNames';
import { getTextSx, getBackgroundSx } from '../utils/themeSx';
import { CartTable } from '../components/shop/CartTable';

export const Cart = () => {
  const { removeFromCart, removeLoading, clearCart, clearLoading, updateCartItem, updateLoading, count, total, cartProducts } = useCart();
  const { discount, discountedTotal, loading, applyCoupon, resetDiscount } = useDiscount();
  const user = useAuthUser();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const textSx = getTextSx(theme);
  const backgroundSx = getBackgroundSx(theme);

  const { register, handleSubmit } = useForm<{ coupon: string }>();

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleClear = async () => {
    await clearCart();
    showErrorMessage('Cart cleared');
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

      showSuccessMessage('Order created successfully!');

      await clearCart();

      navigate(`/orders/${orderId}`);
    } catch (error) {
      showErrorMessage('Failed to create order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <AppLayout>
      {user ? (
        <div className="max-w-4xl mx-auto p-4">
          {count === 0 ? (
            <div className="w-full flex flex-col items-center justify-center my-20">
              <span className="text-4xl font-bold my-8 text-center">YOUR CART IS CURRENTLY EMPTY</span>
              <ShoppingCartOutlined style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
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
              <CartTable
                dataSource={cartProducts}
                textSx={textSx}
                backgroundSx={backgroundSx}
                updateLoading={updateLoading}
                removeLoading={removeLoading}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
              <div className="flex justify-between mt-4">
                <form onSubmit={handleSubmit(onSubmitCoupon)} className='flex flex-row gap-2'>
                  <input
                    type="text"
                    {...register('coupon', { required: 'Coupon code is required' })}
                    className={`${themedBorder} ${theme === "light" ? "bg-primary-light" : "bg-primary-dark"} outline-none w-[300px] h-[50px] px-2 py-1 me-4`}
                    disabled={discount ? true : false}
                  />
                  {!discount ?
                    <OutlinedButton content={loading ? 'APPLYING...' : 'APPLY COUPON'} height={50} width={180} fontWeight='bold' isDisabled={loading} type="submit" />
                    : <Button variant="outlined" color="error" className='h-[50px]' onClick={handleRemoveCoupon}>
                      Remove Coupon
                    </Button>}
                </form>
                <div className='flex flex-col items-end gap-y-4'>
                  <Button variant="outlined" color="error" className='h-[50px]' onClick={handleClear} disabled={clearLoading}>
                    Clear Cart
                  </Button>
                  <span>Subtotal: ${total}</span>
                  <span className='text-amber-400'>Discount: ${discount}</span>
                  <span className='font-bold'>Total: ${discount ? discountedTotal : total}</span>
                  <OutlinedButton
                    content={checkoutLoading ? "CREATING ORDER..." : "GO TO CHECKOUT"}
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
          <span className="text-4xl font-bold my-8 text-center">PLEASE SIGN IN TO VIEW YOUR CART</span>
          <ShoppingCartOutlined style={{ fontSize: 160, marginTop: 32, marginBottom: 32 }} />
          <OutlinedButton
            content="SIGN IN"
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
