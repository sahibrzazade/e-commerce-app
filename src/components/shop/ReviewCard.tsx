import { Review } from "../../types"

export const ReviewCard = ({ review, onDelete, currentUserId }: { review: Review, onDelete?: () => void, currentUserId?: string }) => {
    return (
        <div className="text-white py-4">
            <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm font-bold">
                    {review.userName?.[0] || '?'}
                </div>
                <span className="font-bold">{review.userName}</span>
                <span className="text-xs text-gray-400">{review.createdAt && review.createdAt.toDate().toLocaleString()}</span>
                {currentUserId && review.userId === currentUserId && onDelete && (
                    <button className="ml-2 text-red-400 hover:text-red-600 text-xs border rounded px-2 py-1" onClick={onDelete}>
                        X
                    </button>
                )}
            </div>
            <div className="text-base">{review.text}</div>
        </div>
    )
}
