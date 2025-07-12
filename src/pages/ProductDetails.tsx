import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout"
import { showErrorMessage, showSuccessMessage } from "../utils/toastUtils";
import Rating from "@mui/material/Rating";
import { OutlinedButton } from "../components/OutlinedButton";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useProductWithWishlistById } from "../hooks/useProductsWithWishlist";
import { useAuthUser } from "../hooks/useAuthUser";
import { wishlistService } from "../services/wishlistService";
import { useState, useEffect } from "react";
import { useWishlist } from '../contexts/wishlistContext';
import { useCart } from "../contexts/cartContext";
import { getReviewsByProductId, addReview, deleteReview } from '../services/reviewService';
import { Review } from '../types';
import { useForm } from 'react-hook-form';
import { ReviewCard } from "../components/shop/ReviewCard";

export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart, addLoading } = useCart()
    const { product } = useProductWithWishlistById(id);
    const { refresh: refreshWishlist } = useWishlist();
    const user = useAuthUser();
    const navigate = useNavigate();

    const [cartLoading, setCartLoading] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [fetchingReviews, setFetchingReviews] = useState(true);
    const [reviewStars, setReviewStars] = useState<number>(5);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<{ text: string }>({
        defaultValues: { text: '' },
    });

    const handleAddToCart = async () => {
        if (!user) return;
        setCartLoading(true);
        try {
            if (product) {
                await addToCart(product.id, 1);
                showSuccessMessage('Added to cart!');
            }
        } catch (error) {
            showErrorMessage('Failed to add to cart.');
        } finally {
            setCartLoading(false);
        }
    };

    const handleReviewSubmit = async (data: { text: string }) => {
        if (!user) {
            showErrorMessage('You must be signed in to leave a review.');
            return;
        }
        if (!data.text.trim()) {
            showErrorMessage('Review cannot be empty.');
            return;
        }
        if (reviewStars < 1 || reviewStars > 5) {
            showErrorMessage('Please select a star rating between 1 and 5.');
            return;
        }
        setReviewLoading(true);
        try {
            await addReview({
                productId: id!,
                userId: user.uid,
                userName: user.displayName || user.email || 'Anonymous',
                text: data.text.trim(),
                stars: reviewStars,
            });
            reset();
            setReviewStars(5);
            showSuccessMessage('Review submitted!');
            const fetched = await getReviewsByProductId(id!);
            setReviews(fetched);
        } catch (e) {
            showErrorMessage('Failed to submit review.');
        } finally {
            setReviewLoading(false);
        }
    };

    const toggleWishlist = async () => {
        if (!user || !product) return;
        setButtonLoading(true);
        try {
            if (isWishlisted) {
                await wishlistService.removeFromWishlist(user.uid, product.id);
                setIsWishlisted(false);
                showErrorMessage('Removed from wishlist!');
            } else {
                await wishlistService.addToWishlist(user.uid, product.id);
                setIsWishlisted(true);
                showSuccessMessage('Added to wishlist!');
            }
            await refreshWishlist();
        } catch (error) {
            showErrorMessage('Failed to update wishlist.');
        } finally {
            setButtonLoading(false);
        }
    };

    useEffect(() => {
        setIsWishlisted(product?.isWishlisted);
    }, [product]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (!id) return;
            setFetchingReviews(true);
            try {
                const fetched = await getReviewsByProductId(id);
                setReviews(fetched);
            } catch (e) {
                showErrorMessage('Failed to fetch reviews.');
            } finally {
                setFetchingReviews(false);
            }
        };
        fetchReviews();
    }, [id]);

    return (
        <AppLayout>
            {product && (
                <div className="max-w-[1280px] py-12 mx-auto flex flex-col h-full">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-shrink-0 w-full md:w-1/2 p-8 h-full">
                            <img src={product.image} alt={product.name} className="w-full h-full" />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col p-8">
                            <span className="text-4xl font-bold">{product.name}</span>
                            <div className="text-2xl py-4">
                                <span>{product.brand}</span>
                                <span> | </span>
                                <span className={`font-bold ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>{product.isAvailable ? "In Stock" : "Out of Stock"}</span>
                                <span> | </span>
                                <div className="inline-block">
                                    <span>{product.stars}</span>
                                    <Rating
                                        sx={{
                                            '& .MuiRating-icon': {
                                                color: 'white',
                                            },
                                            '& .MuiRating-iconEmpty': {
                                                color: 'white',
                                            },
                                        }}
                                        className="ms-1"
                                        name="read-only"
                                        defaultValue={product.stars}
                                        precision={0.5}
                                        readOnly
                                    />
                                    <span>({product.reviewsCount})</span>
                                </div>
                            </div>
                            <span className="text-2xl font-bold">${product.price}</span>
                            <div className="px-4 py-4">
                                <ul style={{ listStyleType: "square" }}>
                                    <li>
                                        <span className="font-bold">How to Care: </span>
                                        {product.careInstructions}
                                    </li>
                                    <li>
                                        <span className="font-bold">Material: </span>
                                        {product.material}
                                    </li>
                                </ul>
                            </div>
                            <div className="py-4">
                                <span className="font-bold">Category: </span>
                                <span>{product.category}</span>
                            </div>
                            {!product.isAvailable && (
                                <span className="text-red-600 font-bold uppercase">This product is currently unavailable.</span>)
                            }
                            <div className="py-4 flex flex-row gap-2">

                                {product.isAvailable ?
                                    <OutlinedButton content={<span>ADD TO CART <ShoppingCartOutlined className="ps-1" /></span>} height={60} width={200} fontWeight="bold" onClick={handleAddToCart} isDisabled={cartLoading || addLoading} />
                                    :
                                    <OutlinedButton content={<span>RETURN TO THE SHOP</span>} height={60} width={200} fontWeight="bold" onClick={() => navigate('/shop')} />
                                }
                                <OutlinedButton onClick={toggleWishlist} content={isWishlisted ? <HeartFilled className="text-2xl" /> : <HeartOutlined className="text-2xl" />} height={60} width={60} fontWeight="normal" isDisabled={buttonLoading} />
                            </div>
                        </div>
                    </div>
                    <div className="h-px bg-gray-700"></div>
                    <div className="flex flex-col mx-8 my-4">
                        <h1 className="self-start text-2xl inline-block bg-gray-300 text-black font-bold px-4 py-2 mb-2">Description</h1>
                        <div className="flex flex-row text-xl my-2">
                            <span className="font-bold mr-1">Material:</span>
                            <span>{product.material}</span>
                        </div>
                        <div className="flex flex-row text-lg my-2">
                            <span className="font-bold mr-1">Care Instructions:</span>
                            <span>{product.careInstructions}</span>
                        </div>
                        <div className="flex flex-row text-lg my-2">
                            <span>{product.description}</span>
                        </div>
                    </div>
                    <div className="h-px bg-gray-700"></div>
                    <div className="flex flex-col mx-8 my-4">
                        <h1 className="self-start text-2xl inline-block bg-gray-300 text-black font-bold px-4 py-2 mb-2">Reviews</h1>
                        {fetchingReviews ? (
                            <span className="text-lg">Loading reviews...</span>
                        ) : reviews.length === 0 ? (
                            <span className="text-lg">No reviews yet.</span>
                        ) : (
                            <div className="flex flex-col gap-4 mb-6">
                                {reviews.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        currentUserId={user?.uid}
                                        removeLoading={deletingReviewId === review.id}
                                        onDelete={async () => {
                                            if (!product || !review.id) return;
                                            setDeletingReviewId(review.id);
                                            try {
                                                await deleteReview(product.id, review.id);
                                                showErrorMessage('Review deleted!');
                                                const fetched = await getReviewsByProductId(product.id);
                                                setReviews(fetched);
                                            } catch (e) {
                                                showErrorMessage('Failed to delete review.');
                                            } finally {
                                                setDeletingReviewId(null);
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        {user && (
                            <form className="flex flex-col space-y-4 mt-4" onSubmit={handleSubmit(handleReviewSubmit)}>
                                <div className="flex flex-col space-y-2">
                                    <label className="text-white font-bold">Your Rating:</label>
                                    <Rating
                                        sx={{
                                            '& .MuiRating-icon': {
                                                color: 'white',
                                            },
                                            '& .MuiRating-iconEmpty': {
                                                color: 'white',
                                            },
                                        }}
                                        name="review-stars"
                                        value={reviewStars}
                                        precision={1}
                                        onChange={(_, newValue) => {
                                            setReviewStars(newValue || 5);
                                        }}
                                        size="large"
                                    />
                                </div>
                                <textarea
                                    placeholder="Leave a review..."
                                    className="w-full h-32 p-4 bg-black text-white border border-white outline-0 resize-none"
                                    {...register('text', { required: 'Review cannot be empty.' })}
                                    disabled={reviewLoading || isSubmitting}
                                ></textarea>
                                {errors.text && <span className="text-red-400 text-sm">{errors.text.message}</span>}
                                <OutlinedButton
                                    content={user ? (reviewLoading || isSubmitting ? 'Submitting...' : 'Submit Review') : 'Sign in to review'}
                                    height={60}
                                    width={200}
                                    fontWeight="bold"
                                    isDisabled={reviewLoading || isSubmitting}
                                    type="submit"
                                />
                            </form>
                        )}
                    </div>
                </div>
            )}
        </AppLayout>
    )
}
