import { StarFilled } from "@ant-design/icons"
import { ReviewCard } from "../shop/ReviewCard"
import { Review } from "../../types";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { getReviewsByUserId } from "../../services/reviewService";
import { useNavigate } from "react-router-dom";

export const ProfileReviews = () => {
    const authUser = useAuthUser();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            if (authUser?.uid) {
                setReviewsLoading(true);
                const r = await getReviewsByUserId(authUser.uid);
                setReviews(r);
                setReviewsLoading(false);
            } else {
                setReviews([]);
                setReviewsLoading(false);
            }
        };
        fetchReviews();
    }, [authUser]);


    return (
        <div className="rounded-lg p-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <StarFilled className="text-2xl text-yellow-400" />
                <h2 className="text-xl font-bold">Your Reviews</h2>
            </div>
            {reviewsLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) : reviews.length === 0 ? (
                <span className="block text-center md:text-start">You have not written any reviews yet.</span>
            ) : (
                <div className="flex flex-col gap-4">
                    {reviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            currentUserId={authUser?.uid}
                            onClick={() => navigate(`/product/${review.productId}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
