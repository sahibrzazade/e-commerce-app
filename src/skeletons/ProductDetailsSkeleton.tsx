import { Skeleton } from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";
import { getSkeletonSx } from "../utils/skeletonSx";

export const ProductDetailsSkeleton = () => {
    const { theme } = useTheme();

    return (
        <div className="max-w-[1280px] py-12 mx-auto flex flex-col h-full">
            <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 w-full md:w-1/2 p-4 md:p-8 h-full flex items-center justify-center">
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={700}
                        sx={getSkeletonSx(theme)}
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8 gap-4">
                    <Skeleton variant="text" width="70%" height={44} sx={getSkeletonSx(theme)} />
                    <div className="flex flex-wrap items-center gap-2 py-2">
                        <Skeleton variant="text" width={80} height={28} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="text" width={24} height={28} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="text" width={100} height={28} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="text" width={80} height={28} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="text" width={40} height={28} sx={getSkeletonSx(theme)} />
                    </div>
                    <Skeleton variant="text" width="40%" height={36} sx={getSkeletonSx(theme)} />

                    <div className="py-2">
                        <Skeleton variant="text" width="60%" height={20} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="text" width="50%" height={20} sx={getSkeletonSx(theme)} />
                    </div>

                    <Skeleton variant="text" width="30%" height={20} sx={getSkeletonSx(theme)} />

                    <Skeleton variant="rectangular" width="60%" height={24} sx={getSkeletonSx(theme)} />

                    <div className="py-2 flex flex-row gap-2">
                        <Skeleton variant="rectangular" width={200} height={60} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="rectangular" width={60} height={60} sx={getSkeletonSx(theme)} />
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-700 my-4"></div>
            <div className="flex flex-col mx-4 md:mx-8 my-4">
                <Skeleton variant="rectangular" width={220} height={40} sx={getSkeletonSx(theme)} className="mb-2" />
                <div className="flex flex-row gap-4 my-2">
                    <Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} />
                </div>
                <Skeleton variant="text" width="90%" height={32} sx={getSkeletonSx(theme)} />
                <Skeleton variant="text" width="80%" height={28} sx={getSkeletonSx(theme)} />
                <Skeleton variant="text" width="60%" height={24} sx={getSkeletonSx(theme)} />
            </div>

            <div className="h-px bg-gray-700 my-4"></div>
            <div className="flex flex-col mx-4 md:mx-8 my-4">
                <Skeleton variant="rectangular" width={220} height={40} sx={getSkeletonSx(theme)} className="mb-2" />
                {[...Array(2)].map((_, idx) => (
                    <Skeleton key={idx} variant="rectangular" width="100%" height={60} sx={getSkeletonSx(theme)} className="my-2" />
                ))}

                <div className="flex flex-col gap-2 mt-4">
                    <Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="rectangular" width="40%" height={48} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="rectangular" width="100%" height={80} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="rectangular" width={200} height={60} sx={getSkeletonSx(theme)} />
                </div>
            </div>
        </div>
    );
};