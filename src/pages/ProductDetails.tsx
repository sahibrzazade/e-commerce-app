import { useParams } from "react-router-dom";
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

export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { product, loading } = useProductWithWishlistById(id);
    const user = useAuthUser();
    const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted);
    const [buttonLoading, setButtonLoading] = useState(false);
    const { refresh: refreshWishlist } = useWishlist();

    useEffect(() => {
        setIsWishlisted(product?.isWishlisted);
    }, [product]);

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

    return (
        <AppLayout>
            {loading ? (
                <div>Loading...</div>
            ) : product && (
                <div className="max-w-[1280px] py-12 mx-auto flex flex-col h-full">
                    <div className="flex flex-row">
                        <div className="flex-shrink-0 w-1/2 p-8 h-full">
                            <img src={product.image} alt={product.name} className="w-full h-full" />
                        </div>
                        <div className="w-1/2 flex flex-col p-8">
                            <span className="text-4xl font-bold">{product.name}</span>
                            <div className="text-2xl py-4">
                                <span>{product.brand}</span>
                                <span> | </span>
                                <span className={`font-bold ${product.isAvailable ? "text-green-600" : "text-red-600"}`}>{product.isAvailable ? "In Stock" : "Out of Stock"}</span>
                                <span> | </span>
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
                            <div className="py-4 flex flex-row gap-2">
                                <OutlinedButton content={<span>ADD TO CART <ShoppingCartOutlined className="ps-1" /></span>} height={60} width={200} fontWeight="bold" />
                                <OutlinedButton onClick={toggleWishlist} content={isWishlisted ? <HeartFilled className="text-2xl" /> : <HeartOutlined className="text-2xl" />} height={60} width={60} fontWeight="normal" disabled={buttonLoading} />
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
                </div>
            )}
        </AppLayout>
    )
}
