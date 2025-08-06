import { Skeleton } from "@mui/material"
import { getSkeletonSx } from "../utils/skeletonSx"
import { useTheme } from "../contexts/ThemeContext";

export const BlogsSkeleton = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 my-8">
            {[...Array(2)].map((_, idx) => (
                <div key={idx} className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
                    <Skeleton variant="rectangular" width="100%" height={192} sx={getSkeletonSx(theme)} />
                    <div className="p-6 flex flex-col flex-1">
                        <Skeleton variant="text" width={180} height={32} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="text" width={120} height={20} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="text" width={320} height={24} sx={getSkeletonSx(theme)} />
                        <Skeleton variant="rectangular" width="100%" height={48} sx={getSkeletonSx(theme)} />
                    </div>
                </div>
            ))}
        </div>
    )
}