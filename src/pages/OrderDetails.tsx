import AppLayout from "../layouts/AppLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import { Order } from "../types";
import { useAuthUser } from "../hooks/useAuthUser";
import { showErrorMessage } from "../utils/toastUtils";
import { OutlinedButton } from "../components/OutlinedButton";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
} from '@mui/material';

export const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const user = useAuthUser();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId || !user) {
                setLoading(false);
                return;
            }

            try {
                const orderData = await orderService.getOrder(orderId);
                if (!orderData) {
                    showErrorMessage('Order not found');
                    navigate('/cart');
                    return;
                }

                if (orderData.userId !== user.uid) {
                    showErrorMessage('You are not authorized to view this order');
                    navigate('/cart');
                    return;
                }

                setOrder(orderData);
            } catch (error) {
                showErrorMessage('Failed to load order');
                navigate('/cart');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, user, navigate]);

    if (loading) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <CircularProgress />
                </div>
            </AppLayout>
        );
    }

    if (!order) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <Typography variant="h5" color="white">
                        Order not found
                    </Typography>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto p-4">
                <div className="mb-6">
                    <Typography variant="h4" color="white" className="mb-2">
                        Order #{order.orderNumber || order.id}
                    </Typography>
                    <Typography variant="body1" color="gray" className="mb-4">
                        Status: <span className="text-amber-400 capitalize">{order.status}</span>
                    </Typography>
                    <Typography variant="body2" color="gray">
                        Created: {order.createdAt.toDate().toLocaleDateString()}
                    </Typography>
                </div>

                <TableContainer component={Paper} sx={{ backgroundColor: '#23272f' }} className="mb-6">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>Image</TableCell>
                                <TableCell sx={{ color: 'white' }}>Product</TableCell>
                                <TableCell sx={{ color: 'white' }}>Price</TableCell>
                                <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                                <TableCell sx={{ color: 'white' }}>Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography sx={{ color: 'white' }}>
                                            <img src={item.product?.image} style={{ width: 64, height: 64, objectFit: 'cover' }} />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: 'white' }}>
                                            {item.product?.name || `Product ${item.productId}`}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: 'white' }}>
                                            ${item.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: 'white' }}>
                                            {item.quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: 'white' }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="flex flex-col items-end gap-y-2 mb-6">
                    <span>Subtotal: ${order.total}</span>
                    <span className="text-amber-400">Discount: ${order.discount && order.discount > 0 ? order.discount : 0}</span>
                    <span className="font-bold">Total: ${order.discountedTotal || order.total}</span>
                </div>

                <div className="flex justify-center">
                    <OutlinedButton
                        content="RETURN TO SHOP"
                        height={60}
                        width={200}
                        fontWeight="bold"
                        onClick={() => navigate('/shop')}
                    />
                </div>
            </div>
        </AppLayout>
    );
};
