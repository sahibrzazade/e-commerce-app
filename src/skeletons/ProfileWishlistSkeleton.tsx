import { Skeleton } from "@mui/material"
import { getSkeletonSx } from "../utils/skeletonSx"
import { useTheme } from "../contexts/themeContext";

export const ProfileWishlistSkeleton = () => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-6">
            {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-4 rounded-lg">
                    <Skeleton variant="rectangular" width={290} height={340} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={160} height={32} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="text" width={120} height={24} sx={getSkeletonSx(theme)} />
                    <Skeleton variant="rounded" width={120} height={36} sx={getSkeletonSx(theme)} />
                </div>
            ))}
        </div>
    )
}
