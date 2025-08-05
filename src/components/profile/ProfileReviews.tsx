import { StarFilled } from "@ant-design/icons"
import { ReviewCard } from "../shop/ReviewCard"
import { useAuthUser } from "../../hooks/useAuthUser";
import { getReviewsByUserId } from "../../services/reviewService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from '@tanstack/react-query';

export const ProfileReviews = () => {
    const authUser = useAuthUser();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        data: reviews = [],
        isLoading: reviewsLoading,
    } = useQuery({
        queryKey: ["user-reviews", authUser?.uid],
        queryFn: async () => {
            if (!authUser?.uid) return [];
            return getReviewsByUserId(authUser.uid);
        },
        enabled: !!authUser?.uid,
    });

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <StarFilled className="text-2xl text-yellow-400" />
                <h2 className="text-xl font-bold">{t("profile.your-reviews")}</h2>
            </div>
            {reviewsLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) : reviews.length === 0 ? (
                <span className="block text-center md:text-start">{t("profile.no-reviews-yet")}</span>
            ) : (
                <div className="flex flex-col gap-4">
                    {reviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            currentUserId={authUser?.uid}
                            onClick={() => navigate(`/shop/${review.productId}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
