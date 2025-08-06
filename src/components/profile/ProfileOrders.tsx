import { useAuthUser } from "../../hooks/useAuthUser";
import { orderService } from "../../services/orderService";
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
import { useTheme } from "../../contexts/ThemeContext";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ProfileOrdersSkeleton } from "../../skeletons/ProfileOrdersSkeleton";

export function ProfileOrders() {
    const { user: authUser, loading: authLoading } = useAuthUser();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { t } = useTranslation();

    const textSx = getTextSx(theme);
    const backgroundSx = getBackgroundSx(theme);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['userOrders', authUser?.uid],
        queryFn: () => authUser ? orderService.getUserOrders(authUser.uid) : Promise.resolve([]),
        enabled: !!authUser && !authLoading,
    });

    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timeout = setTimeout(() => setShowSkeleton(false), 1000);
            return () => clearTimeout(timeout);
        } else {
            setShowSkeleton(true);
        }
    }, [isLoading]);

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <TfiPackage className="text-2xl" />
                <Typography variant="h5" className="font-bold">{t("profile.your-orders")}</Typography>
            </div>
            {showSkeleton ? (
                <ProfileOrdersSkeleton />
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
