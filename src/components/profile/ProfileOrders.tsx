import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { orderService } from "../../services/orderService";
import { Order } from "../../types";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "../OutlinedButton";
import { TfiPackage } from "react-icons/tfi";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { getBackgroundSx, getTextSx } from "../../utils/themeSx";
import { useTheme } from "../../contexts/themeContext";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const ProfileOrders = () => {
    const authUser = useAuthUser();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const { t } = useTranslation();

    const textSx = getTextSx(theme);
    const backgroundSx = getBackgroundSx(theme);

    useEffect(() => {
        const fetchOrders = async () => {
            if (authUser?.uid) {
                setLoading(true);
                const o = await orderService.getUserOrders(authUser.uid);
                setOrders(o);
                setLoading(false);
            } else {
                setOrders([]);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [authUser]);

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <TfiPackage className="text-2xl" />
                <Typography variant="h5" className="font-bold">{t("profile.your-orders")}</Typography>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) : orders.length === 0 ? (
                <span className="block text-center md:text-start">{t("profile.no-orders-yet")}</span>
            ) : (
                <TableContainer sx={backgroundSx} className="mb-6">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={textSx}>{t("common:order")} #</TableCell>
                                <TableCell sx={textSx}>{t("common:date")}</TableCell>
                                <TableCell sx={textSx}>{t("common:status")}</TableCell>
                                <TableCell sx={textSx}>{t("common:total")}</TableCell>
                                <TableCell sx={textSx}>{t("common:actions")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} hover>
                                    <TableCell sx={textSx}>{order.orderNumber || order.id}</TableCell>
                                    <TableCell sx={textSx}>{dayjs(order.createdAt.toDate()).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                                    <TableCell sx={textSx}><span className="capitalize text-amber-400">{order.status}</span></TableCell>
                                    <TableCell sx={textSx}>${order.discountedTotal || order.total}</TableCell>
                                    <TableCell>
                                        <OutlinedButton
                                            content={t("common:view-details")}
                                            height={36}
                                            width={120}
                                            fontWeight="bold"
                                            onClick={() => navigate(`/orders/${order.id}`)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
