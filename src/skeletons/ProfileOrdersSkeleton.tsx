import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { getSkeletonSx } from "../utils/skeletonSx"
import { useTheme } from "../contexts/ThemeContext";
import { getBackgroundSx } from "../utils/themeSx";

export const ProfileOrdersSkeleton = () => {
    const { theme } = useTheme();
    const backgroundSx = getBackgroundSx(theme);
    return (
        <TableContainer sx={backgroundSx} className="mb-6">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><Skeleton variant="text" width={60} sx={getSkeletonSx(theme)} /></TableCell>
                        <TableCell><Skeleton variant="text" width={120} sx={getSkeletonSx(theme)} /></TableCell>
                        <TableCell><Skeleton variant="text" width={80} sx={getSkeletonSx(theme)} /></TableCell>
                        <TableCell><Skeleton variant="text" width={80} sx={getSkeletonSx(theme)} /></TableCell>
                        <TableCell><Skeleton variant="text" width={100} sx={getSkeletonSx(theme)} /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...Array(3)].map((_, idx) => (
                        <TableRow key={idx}>
                            <TableCell><Skeleton variant="text" width={60} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="text" width={120} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="rectangular" width={80} height={24} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="text" width={80} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="rounded" width={100} height={36} sx={getSkeletonSx(theme)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
