import AppLayout from "../layouts/AppLayout";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
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
} from '@mui/material';

import { useTheme } from "../contexts/ThemeContext";
import { getBackgroundSx, getTextSx } from "../utils/themeSx";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from '@tanstack/react-query';
import { OrderDetailsSkeleton } from "../skeletons/OrderDetailsSkeleton";

export const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const { user } = useAuthUser();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const textSx = getTextSx(theme);
    const backgroundSx = getBackgroundSx(theme);

    const {
        data: order,
        isLoading: loading,
    } = useQuery<Order | null>({
        queryKey: ['order', orderId, user?.uid],
        queryFn: async () => {
            if (!orderId || !user) return null;
            try {
                const orderData = await orderService.getOrder(orderId);
                if (!orderData) {
                    showErrorMessage(t("shop.order-not-found"));
                    navigate('/cart');
                    return null;
                }
                if (orderData.userId !== user.uid) {
                    showErrorMessage(t("shop.not-authorized-to-view-order"));
                    navigate('/cart');
                    return null;
                }
                return orderData;
            } catch (error) {
                showErrorMessage(t("shop.order-load-failed"));
                navigate('/cart');
                return null;
            }
        },
        enabled: !!orderId && !!user,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        if (loading) {
            setShowSkeleton(true);
        } else {
            const timeout = setTimeout(() => setShowSkeleton(false), 1000);
            return () => clearTimeout(timeout);
        }
    }, [loading]);

    if (showSkeleton) {
        return (
            <AppLayout>
                <OrderDetailsSkeleton />
            </AppLayout>
        );
    }

    if (!order) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <h1 className="text-2xl">
                        {t("shop.order-not-found")}
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
                        {t("common:order")} #{order.orderNumber || order.id}
                    </h2>
                    <h3 className="text-lg mb-2">
                        {t("common:status")}: <span className="text-amber-400 capitalize">{order.status ?? ""}</span>
                    </h3>
                    <h3 className="text-lg mb-2">
                        {t("common:created")}: {order.createdAt ? dayjs(order.createdAt.toDate()).format('DD/MM/YYYY HH:mm:ss') : ""}
                    </h3>
                </div>

                <TableContainer sx={backgroundSx} className="mb-6">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={textSx}>{t("common:image")}</TableCell>
                                <TableCell sx={textSx}>{t("common:product")}</TableCell>
                                <TableCell sx={textSx}>{t("common:price")}</TableCell>
                                <TableCell sx={textSx}>{t("common:quantity")}</TableCell>
                                <TableCell sx={textSx}>{t("common:subtotal")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.items?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography sx={textSx}>
                                            <img src={item.product?.image} style={{ width: 64, height: 64, objectFit: 'cover' }} />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={textSx}>
                                            {item.product?.name || `${t("common:product")} ${item.productId}`}
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
                    <span>{t("common:subtotal")}: ${order.total ?? 0}</span>
                    <span className="text-amber-400">{t("common:discount")}: ${order.discount && order.discount > 0 ? order.discount : 0}</span>
                    <span className="font-bold">{t("common:total")}: ${order.discountedTotal ?? order.total ?? 0}</span>
                </div>

                <div className="flex justify-center">
                    <OutlinedButton
                        content={t("common:return-to-shop")}
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
