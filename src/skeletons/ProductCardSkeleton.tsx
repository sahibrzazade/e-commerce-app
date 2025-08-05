import { Skeleton } from '@mui/material';
import { useTheme } from '../contexts/themeContext';
import { getSkeletonSx } from '../utils/skeletonSx';

export const ProductCardSkeleton = () => {
    const { theme } = useTheme();
    return (
        <div>
            <div className='w-[290px] relative'>
                <Skeleton
                    variant="rectangular"
                    className="w-full"
                    height={340}
                    sx={getSkeletonSx(theme)}
                />

            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row items-center justify-between mt-2'>
                    <Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} />
                    <div className='flex flex-row gap-2'>
                        <Skeleton variant="rectangular" width={40} height={40} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="rectangular" width={40} height={40} sx={getSkeletonSx(theme)} />
                    </div>
                </div>
                <div className='flex flex-row my-1 items-center gap-2'>
                    <Skeleton variant="text" width={32} height={24} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={80} height={24} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={32} height={20} sx={getSkeletonSx(theme)} />
                </div>
            </div>
            <div className='flex flex-row justify-between items-center my-1'>
                <Skeleton variant="text" width={60} height={24} sx={getSkeletonSx(theme)} />
            </div>
        </div>
    );
};
