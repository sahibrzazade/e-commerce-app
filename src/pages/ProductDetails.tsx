import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout"
import { showErrorMessage, showSuccessMessage } from "../utils/toastUtils";
import Rating from "@mui/material/Rating";
import { OutlinedButton } from "../components/OutlinedButton";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useProductWithWishlistById } from "../hooks/useAllProductsWithWishlistStatus";
import { useAuthUser } from "../hooks/useAuthUser";
import { wishlistService } from "../services/wishlistService";
import { useState, useEffect } from "react";
import { useWishlist } from '../contexts/wishlistContext';
import { useCart } from "../contexts/cartContext";
import { getReviewsByProductId, addReview, deleteReview } from '../services/reviewService';
import { Review } from '../types';
import { useForm } from 'react-hook-form';
import { ReviewCard } from "../components/shop/ReviewCard";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { themedBackground, themedBorder } from "../styles/themeClassNames";
import { useTranslation } from "react-i18next";

export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart, addLoading } = useCart()
    const { product, fetchData: refreshProduct } = useProductWithWishlistById(id);
    const { refresh: refreshWishlist } = useWishlist();
    const user = useAuthUser();
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            }
        } catch (error) {
            showErrorMessage(t("shop.add-to-cart-failed"));
        } finally {
            setCartLoading(false);
        }
    };

    const handleReviewSubmit = async (data: { text: string }) => {
        if (!user) {
            showErrorMessage(t("shop.must-be-signed-in-to-review"));
            return;
        }
        if (!data.text.trim()) {
            showErrorMessage(t("shop.review-cannot-be-empty"));
            return;
        }
        if (reviewStars < 1 || reviewStars > 5) {
            showErrorMessage(t("shop.select-star-rating"));
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
            showSuccessMessage(t("shop.review-submitted"));
            const fetched = await getReviewsByProductId(id!);
            setReviews(fetched);
            await refreshProduct();
        } catch (e) {
            showErrorMessage(t("shop.failed-to-submit-review"));
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
                showErrorMessage(t("shop.removed-from-wishlist"));
            } else {
                await wishlistService.addToWishlist(user.uid, product.id);
                setIsWishlisted(true);
                showSuccessMessage(t("shop.added-to-wishlist"));
            }
            await refreshWishlist();
        } catch (error) {
            showErrorMessage(t("shop.update-wishlist-failed"));
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
                showErrorMessage(t("shop.failed-to-fetch-reviews"));
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
                                <span className={`font-bold ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>{product.isAvailable ? t("common:in-stock") : t("common:out-of-stock")}</span>
                                <span> | </span>
                                <div className="inline-block">
                                    <span>{product.stars}</span>
                                    <Rating
                                        className="ms-1"
                                        name="read-only"
                                        defaultValue={product.stars}
                                        precision={0.5}
                                        readOnly
                                        icon={<StarIcon sx={{ color: 'gold' }} />}
                                        emptyIcon={<StarBorderIcon sx={{ color: 'gray' }} />}
                                    />
                                    <span>({product.reviewsCount})</span>
                                </div>
                            </div>
                            <span className="text-2xl font-bold">${product.price}</span>
                            <div className="px-4 py-4">
                                <ul style={{ listStyleType: "square" }}>
                                    <li>
                                        <span className="font-bold">{t("common:how-to-care")}: </span>
                                        {product.careInstructions}
                                    </li>
                                    <li>
                                        <span className="font-bold">{t("common:material")}: </span>
                                        {product.material}
                                    </li>
                                </ul>
                            </div>
                            <div className="py-4">
                                <span className="font-bold">{t("common:category")}: </span>
                                <span>{product.category}</span>
                            </div>
                            {!product.isAvailable && (
                                <span className="text-red-600 font-bold uppercase">{t("shop.product-not-available")}</span>)
                            }
                            <div className="py-4 flex flex-row gap-2">

                                {product.isAvailable ?
                                    <OutlinedButton content={<span>{t("common:add-to-cart")} <ShoppingCartOutlined className="ps-1" /></span>} height={60} width={200} fontWeight="bold" onClick={handleAddToCart} isDisabled={cartLoading || addLoading} />
                                    :
                                    <OutlinedButton content={<span>{t("common:return-to-shop")}</span>} height={60} width={200} fontWeight="bold" onClick={() => navigate('/shop')} />
                                }
                                <OutlinedButton onClick={toggleWishlist} content={isWishlisted ? <HeartFilled className="text-2xl" /> : <HeartOutlined className="text-2xl" />} height={60} width={60} fontWeight="normal" isDisabled={buttonLoading} />
                            </div>
                        </div>
                    </div>
                    <div className="h-px bg-gray-700"></div>
                    <div className="flex flex-col mx-8 my-4">
                        <h1 className="self-start text-2xl inline-block bg-gray-300 text-black font-bold px-4 py-2 mb-2">{t("common:description")}</h1>
                        <div className="flex flex-row text-xl my-2">
                            <span className="font-bold mr-1">{t("common:material")}:</span>
                            <span>{product.material}</span>
                        </div>
                        <div className="flex flex-row text-lg my-2">
                            <span className="font-bold mr-1">{t("common:care-instructions")}:</span>
                            <span>{product.careInstructions}</span>
                        </div>
                        <div className="flex flex-row text-lg my-2">
                            <span>{product.description}</span>
                        </div>
                    </div>
                    <div className="h-px bg-gray-700"></div>
                    <div className="flex flex-col mx-8 my-4">
                        <h1 className="self-start text-2xl inline-block bg-gray-300 text-black font-bold px-4 py-2 mb-2">{t("common:reviews")}</h1>
                        {fetchingReviews ? (
                            <span className="text-lg">{t("shop.loading-reviews")}</span>
                        ) : reviews.length === 0 ? (
                            <span className="text-lg">{t("shop.no-reviews-yet")}</span>
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
                                                showErrorMessage(t("shop.review-deleted"));
                                                const fetched = await getReviewsByProductId(product.id);
                                                setReviews(fetched);
                                                await refreshProduct();
                                            } catch (e) {
                                                showErrorMessage(t("shop.failed-to-delete-review"));
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
                                    <label className="font-bold">{t("common:your-rating")}:</label>
                                    <Rating
                                        name="review-stars"
                                        value={reviewStars}
                                        precision={1}
                                        onChange={(_, newValue) => {
                                            setReviewStars(newValue || 5);
                                        }}
                                        size="large"
                                        icon={<StarIcon sx={{ color: 'gold' }} />}
                                        emptyIcon={<StarBorderIcon sx={{ color: 'gray' }} />}
                                    />
                                </div>
                                <textarea
                                    placeholder={t("shop.leave-review")}
                                    className={`${themedBackground} ${themedBorder} w-full h-32 p-4 outline-0 resize-none`}
                                    {...register('text', { required: t("shop.review-cannot-be-empty") })}
                                    disabled={reviewLoading || isSubmitting}
                                ></textarea>
                                {errors.text && <span className="text-red-400 text-sm">{errors.text.message}</span>}
                                <OutlinedButton
                                    content={user ? (reviewLoading || isSubmitting ? t("common:submitting") : t("common:submit-review")) : t("shop.sign-in-to-review")}
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
