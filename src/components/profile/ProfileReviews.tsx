import { StarFilled } from "@ant-design/icons"
import { ReviewCard } from "../shop/ReviewCard"
import { useAuthUser } from "../../hooks/useAuthUser";
import { getReviewsByUserId } from "../../services/reviewService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ProfileReviewsSkeleton } from "../../skeletons/ProfileReviewsSkeleton";

export const ProfileReviews = () => {
    const { user: authUser, loading: authLoading } = useAuthUser();
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
        enabled: !!authUser?.uid && !authLoading,
    });

    const [showSkeleton, setShowSkeleton] = useState(false);

    useEffect(() => {
        if (!reviewsLoading) {
            const timeout = setTimeout(() => setShowSkeleton(false), 1000);
            return () => clearTimeout(timeout);
        } else {
            setShowSkeleton(true);
        }
    }, [reviewsLoading]);

    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <StarFilled className="text-2xl text-yellow-400" />
                <h2 className="text-xl font-bold">{t("profile.your-reviews")}</h2>
            </div>
            {showSkeleton ? (
                <ProfileReviewsSkeleton />
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
