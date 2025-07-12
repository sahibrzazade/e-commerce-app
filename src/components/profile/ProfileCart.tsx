import { ShoppingCartOutlined } from "@ant-design/icons"
import { OutlinedButton } from "../OutlinedButton"
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useCart } from "../../contexts/cartContext"
import { useNavigate } from "react-router-dom"
import { showErrorMessage, showSuccessMessage } from "../../utils/toastUtils"

export const ProfileCart = () => {
    const navigate = useNavigate();
    const { cartProducts, count: cartCount, removeFromCart, removeLoading, updateCartItem, updateLoading } = useCart();

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await updateCartItem(productId, newQuantity);
        showSuccessMessage('Cart updated');
    };

    const handleRemove = async (productId: string) => {
        await removeFromCart(productId);
        showErrorMessage('Product removed from cart');
    };

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <ShoppingCartOutlined className="text-2xl" />
                <h2 className="text-xl font-bold">Cart</h2>
            </div>
            {cartCount === 0 ? (
                <div className="flex flex-col items-center justify-center my-8">
                    <span className="text-lg my-4">Your cart is empty.</span>
                    <OutlinedButton content="Go to Shop" height={40} width={160} fontWeight="bold" onClick={() => navigate('/shop')} />
                </div>
            ) : (
                <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-6">
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
                                {cartProducts.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>
                                            {row.product && row.product.image ? (
                                                <img src={row.product.image} alt={row.product.name} style={{ width: 64, height: 64, objectFit: 'cover' }} />
                                            ) : null}
                                        </TableCell>
                                        <TableCell>
                                            <Typography fontWeight="bold" sx={{ color: 'white' }}>{row.product && row.product.name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: 'white' }}>
                                                {row.product ? `$${row.product.price}` : '-'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center', borderRadius: 6, width: 100, justifyContent: 'space-between' }}>
                                                <IconButton size="small" onClick={() => handleQuantityChange(row.id, row.quantity - 1)} disabled={row.quantity <= 1 || updateLoading} sx={{ color: 'white' }}>
                                                    <AiOutlineMinus />
                                                </IconButton>
                                                <Typography sx={{ color: 'white', minWidth: 24, textAlign: 'center' }}>{row.quantity}</Typography>
                                                <IconButton size="small" onClick={() => handleQuantityChange(row.id, row.quantity + 1)} disabled={updateLoading} sx={{ color: 'white' }}>
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
                                                disabled={removeLoading}
                                            >
                                                X
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    )
}
