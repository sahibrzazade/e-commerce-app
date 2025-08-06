import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { getSkeletonSx } from "../utils/skeletonSx"
import { getBackgroundSx } from "../utils/themeSx";
import { useTheme } from "../contexts/ThemeContext";

export const OrderDetailsSkeleton = () => {
    const { theme } = useTheme();
    const backgroundSx = getBackgroundSx(theme);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-6">
                <Skeleton variant="text" width={220} height={40} sx={getSkeletonSx(theme)} />
                <Skeleton variant="text" width={180} height={28} sx={getSkeletonSx(theme)} />
                <Skeleton variant="text" width={220} height={28} sx={getSkeletonSx(theme)} />
            </div>
            <TableContainer sx={backgroundSx} className="mb-6">
                <Table>
                    <TableHead>
                        <TableRow>
                            {[...Array(5)].map((_, idx) => (
                                <TableCell key={idx}><Skeleton variant="text" width={80} sx={getSkeletonSx(theme)} /></TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(3)].map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell><Skeleton variant="rectangular" width={64} height={64} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell><Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell><Skeleton variant="text" width={60} height={24} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell><Skeleton variant="text" width={40} height={24} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell><Skeleton variant="text" width={80} height={24} sx={getSkeletonSx(theme)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="flex flex-col items-end gap-y-2 mb-6">
                <Skeleton variant="text" width={120} height={24} sx={getSkeletonSx(theme)} />
                <Skeleton variant="text" width={120} height={24} sx={getSkeletonSx(theme)} />
                <Skeleton variant="text" width={160} height={28} sx={getSkeletonSx(theme)} />
            </div>
            <div className="flex justify-center">
                <Skeleton variant="rounded" width={200} height={60} sx={getSkeletonSx(theme)} />
            </div>
        </div>
    )
}