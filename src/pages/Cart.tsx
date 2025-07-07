import { useCart } from '../contexts/cartContext';
import AppLayout from '../layouts/AppLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { OutlinedButton } from '../components/OutlinedButton';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../utils/toastUtils';
import { useAuthUser } from '../hooks/useAuthUser';
import { useDiscount } from '../hooks/useDiscount';
import { useForm } from 'react-hook-form';

export const Cart = () => {
  const { removeFromCart, clearCart, updateCartItem, count, total, cartProducts } = useCart();

  const { discount, discountedTotal, loading, applyCoupon, resetDiscount } = useDiscount();

  const user = useAuthUser();

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<{ coupon: string }>();

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
    showErrorMessage('Product removed from cart');
  };

  const handleClear = async () => {
    await clearCart();
    showErrorMessage('Cart cleared');
  };

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
    showSuccessMessage('Cart updated');
  };

  const dataSource = cartProducts;

  const onSubmitCoupon = (data: { coupon: string }) => {
    applyCoupon(data.coupon);
  };

  const handleRemoveCoupon = () => {
    resetDiscount(total);
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
              <TableContainer component={Paper} sx={{ backgroundColor: '#23272f' }} className="mb-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white' }}>Image</TableCell>
                      <TableCell sx={{ color: 'white' }}>Product</TableCell>
                      <TableCell sx={{ color: 'white' }}>Price</TableCell>
                      <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                      <TableCell sx={{ color: 'white' }}>Subtotal</TableCell>
                      <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataSource.map(row => (
                      <TableRow key={row.id}>
                        <TableCell>
                          {row.product && row.product.image ? (
                            <img src={row.product.image} alt={row.product.name} style={{ width: 64, height: 64, objectFit: 'cover' }} />
                          ) : null}
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold" sx={{ color: 'white' }}>{row.product ? row.product.name : row.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ color: 'white' }}>
                            {row.product ? `$${row.product.price}` : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', alignItems: 'center', borderRadius: 6, width: 100, justifyContent: 'space-between' }}>
                            <IconButton size="small" onClick={() => handleQuantityChange(row.id, row.quantity - 1)} disabled={row.quantity <= 1} sx={{ color: 'white' }}>
                              <AiOutlineMinus />
                            </IconButton>
                            <Typography sx={{ color: 'white', minWidth: 24, textAlign: 'center' }}>{row.quantity}</Typography>
                            <IconButton size="small" onClick={() => handleQuantityChange(row.id, row.quantity + 1)} sx={{ color: 'white' }}>
                              <AiOutlinePlus />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ color: 'white' }}>
                            {row.product ? `$${(row.product.price * row.quantity).toFixed(2)}` : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ height: 40, width: 40, minWidth: 0, padding: 0 }}
                            size="small" onClick={() => handleRemove(row.id)}
                          >
                            X
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="flex justify-between mt-4">
                <form onSubmit={handleSubmit(onSubmitCoupon)} className='flex flex-row gap-2'>
                  <input
                    type="text"
                    {...register('coupon', { required: 'Coupon code is required' })}
                    className="outline-none bg-primary-dark w-[300px] h-[50px] px-2 py-1 me-4 border-white"
                    disabled={discount ? true : false}
                  />
                  {!discount ?
                    <OutlinedButton content={loading ? 'APPLYING...' : 'APPLY COUPON'} height={50} width={180} fontWeight='bold' isDisabled={loading} type="submit" />
                    : <Button variant="outlined" color="error" className='h-[50px]' onClick={handleRemoveCoupon}>
                      Remove Coupon
                    </Button>}
                </form>
                <div className='flex flex-col items-end gap-y-4'>
                  <Button variant="outlined" color="error" className='h-[50px]' onClick={handleClear}>
                    Clear Cart
                  </Button>
                  <span>Subtotal: ${total}</span>
                  <span className='text-amber-400'>Discount: ${discount}</span>
                  <span className='font-bold'>Total: ${discount ? discountedTotal : total}</span>
                  <OutlinedButton
                    content="GO TO CHECKOUT"
                    height={60}
                    width={200}
                    fontWeight="bold"
                    onClick={() => navigate('/checkout')}
                    isDisabled={count === 0}
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
