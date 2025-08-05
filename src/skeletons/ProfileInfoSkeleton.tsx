import { Skeleton } from "@mui/material"
import { getSkeletonSx } from "../utils/skeletonSx"
import { useTheme } from "../contexts/themeContext"

export const ProfileInfoSkeleton = () => {
    const { theme } = useTheme();
    return (
        <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-row items-center gap-2">
                <Skeleton
                    variant="text"
                    width={100}
                    height={32}
                    sx={getSkeletonSx(theme)}
                />
                <Skeleton
                    variant="rounded"
                    width={120}
                    height={36}
                    sx={getSkeletonSx(theme)}
                />
            </div>
            <div className="flex flex-row items-center gap-2">
                <Skeleton
                    variant="text"
                    width={100}
                    height={32}
                    sx={getSkeletonSx(theme)}
                />
                <Skeleton
                    variant="text"
                    width={300}
                    height={28}
                    sx={getSkeletonSx(theme)}
                />
            </div>
        </div>
    )
}
