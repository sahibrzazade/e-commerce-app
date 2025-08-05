import { Skeleton } from "@mui/material"
import { getSkeletonSx } from "../utils/skeletonSx"
import { useTheme } from "../contexts/themeContext";

export const BlogDetailsSkeleton = () => {
    const { theme } = useTheme();
    return (
        <div className="max-w-2xl mx-auto my-8">
            <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 flex justify-center items-center mb-4 rounded-lg">
                <Skeleton variant="rectangular" width="80%" height={60} sx={getSkeletonSx(theme)} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col mb-8">
                <div className="p-6 flex flex-col flex-1">
                    <Skeleton variant="text" width={180} height={28} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={120} height={20} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={320} height={24} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="rectangular" width="100%" height={120} sx={getSkeletonSx(theme)} />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {[...Array(2)].map((_, idx) => (
                    <div key={idx} className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                        <div className="flex items-center gap-4">
                            <Skeleton variant="rectangular" width={80} height={80} sx={getSkeletonSx(theme)} />
                            <div className="flex-1">
                                <Skeleton variant="text" width={160} height={24} sx={getSkeletonSx(theme)} />
                                <Skeleton variant="text" width={100} height={16} sx={getSkeletonSx(theme)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
