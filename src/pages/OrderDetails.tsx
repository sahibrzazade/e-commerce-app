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
    Typography,
    CircularProgress,
} from '@mui/material';
import { useTheme } from "../contexts/themeContext";
import { getBackgroundSx, getTextSx } from "../utils/themeSx";

export const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const user = useAuthUser();
    const { theme } = useTheme();

    const textSx = getTextSx(theme);
    const backgroundSx = getBackgroundSx(theme);

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
                    <h1 className="text-2xl">
                        Order not found
                    </h1>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto p-4">
                <div className="mb-6">
                    <h2 className="text-3xl mb-2">
                        Order #{order.orderNumber || order.id}
                    </h2>
                    <h3 className="text-lg mb-2">
                        Status: <span className="text-amber-400 capitalize">{order.status}</span>
                    </h3>
                    <h3 className="text-lg mb-2">
                        Created: {order.createdAt.toDate().toLocaleDateString()}
                    </h3>
                </div>

                <TableContainer sx={backgroundSx} className="mb-6">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={textSx}>Image</TableCell>
                                <TableCell sx={textSx}>Product</TableCell>
                                <TableCell sx={textSx}>Price</TableCell>
                                <TableCell sx={textSx}>Quantity</TableCell>
                                <TableCell sx={textSx}>Subtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography sx={textSx}>
                                            <img src={item.product?.image} style={{ width: 64, height: 64, objectFit: 'cover' }} />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={textSx}>
                                            {item.product?.name || `Product ${item.productId}`}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={textSx}>
                                            ${item.price}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={textSx}>
                                            {item.quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={textSx}>
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
