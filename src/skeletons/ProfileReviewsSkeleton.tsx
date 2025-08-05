import { Skeleton } from "@mui/material"
import { getSkeletonSx } from "../utils/skeletonSx"
import { useTheme } from "../contexts/themeContext"

export const ProfileReviewsSkeleton = () => {
    const { theme } = useTheme();
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                    <Skeleton variant="circular" width={32} height={32} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={120} height={28} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={80} height={24} sx={getSkeletonSx(theme)} />
                </div>
                <Skeleton variant="text" width={300} height={24} sx={getSkeletonSx(theme)} />
                <Skeleton variant="rectangular" width="100%" height={32} sx={getSkeletonSx(theme)} />
            </div>
        </div>
    )
}