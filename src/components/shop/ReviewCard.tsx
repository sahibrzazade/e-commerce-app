import { Review } from "../../types"
import Rating from "@mui/material/Rating";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { themedText } from "../../styles/themeClassNames";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const ReviewCard = ({ review, removeLoading, onDelete, currentUserId, onClick }: { review: Review, removeLoading?: boolean, onDelete?: () => void, currentUserId?: string, onClick?: () => void }) => {
    const { t } = useTranslation();
    return (
        <div
            className={`${themedText} p-4 rounded transition ${onClick ? "cursor-pointer hover:bg-black/10 hover:dark:bg-white/10" : "cursor-default"}`}
            onClick={onClick}
        >
            <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm font-bold">
                    {review.userName?.[0] || '?'}
                </div>
                <span className="font-bold">{review.userName}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{review.createdAt && dayjs(review.createdAt.toDate()).format('DD/MM/YYYY HH:mm:ss')}</span>
                {currentUserId && review.userId === currentUserId && onDelete && (
                    <button
                        className={`ml-2 text-xs border transition-all cursor-pointer rounded px-2 py-1 ${removeLoading
                            ? 'text-gray-500 cursor-not-allowed'
                            : 'text-red-400 hover:text-red-600'
                            }`}
                        onClick={e => { e.stopPropagation(); onDelete(); }}
                        disabled={removeLoading}
                    >
                        {removeLoading ? '...' : 'X'}
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2 mb-2">
                <Rating
                    name="read-only"
                    value={review.stars}
                    precision={0.5}
                    readOnly
                    size="small"
                    icon={<StarIcon sx={{ color: 'gold' }} />}
                    emptyIcon={<StarBorderIcon sx={{ color: 'gray' }} />}
                />
                <span className="text-sm text-gray-500 dark:text-gray-300">({review.stars} {t("filter.stars")})</span>
            </div>
            <div className="text-base">{review.text}</div>
        </div >
    )
}
