import { Skeleton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '../contexts/ThemeContext';
import { getSkeletonSx } from '../utils/skeletonSx';

export const CartSkeleton = () => {
    const { theme } = useTheme();
    return (
        <div className="max-w-4xl mx-auto p-4">
            <TableContainer className="mb-8">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width={60} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="text" width={120} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="text" width={80} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="text" width={100} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="text" width={80} sx={getSkeletonSx(theme)} /></TableCell>
                            <TableCell><Skeleton variant="text" width={80} sx={getSkeletonSx(theme)} /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(1)].map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell><Skeleton variant="rectangular" width={64} height={64} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell><Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell><Skeleton variant="text" width={60} height={28} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center', borderRadius: 6, width: 100, justifyContent: 'space-between' }}>
                                        <Skeleton variant="circular" width={32} height={32} sx={getSkeletonSx(theme)} />
                                        <Skeleton variant="text" width={24} height={28} sx={getSkeletonSx(theme)} />
                                        <Skeleton variant="circular" width={32} height={32} sx={getSkeletonSx(theme)} />
                                    </div>
                                </TableCell>
                                <TableCell><Skeleton variant="text" width={60} height={28} sx={getSkeletonSx(theme)} /></TableCell>
                                <TableCell><Skeleton variant="rectangular" width={40} height={40} sx={getSkeletonSx(theme)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
                <div className="flex flex-row gap-2 w-full md:w-1/2">
                    <Skeleton variant="rectangular" width={200} height={50} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="rectangular" width={180} height={50} sx={getSkeletonSx(theme)} />
                </div>
                <div className="flex flex-col items-end gap-y-4 w-full md:w-1/2">
                    <Skeleton variant="rectangular" width={180} height={50} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={120} height={32} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="rectangular" width={200} height={60} sx={getSkeletonSx(theme)} />
                </div>
            </div>
        </div>
    );
};
