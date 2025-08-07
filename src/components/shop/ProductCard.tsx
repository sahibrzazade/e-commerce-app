import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import Rating from '@mui/material/Rating';
import { ProductCardProps } from '../../types';
import { OutlinedButton } from '../OutlinedButton';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../hooks/useAuthUser';
import { wishlistService } from '../../services/wishlistService';
import { showSuccessMessage, showErrorMessage } from '../../utils/toastUtils';
import { useState, useEffect } from 'react';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { themedBorder } from '../../styles/themeClassNames';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const ProductCard = ({
  product
}: ProductCardProps) => {
  const { user } = useAuthUser()
  const navigate = useNavigate();
  const { addToCart, addLoading } = useCart();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { refresh } = useWishlist();

  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const addMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!user) throw new Error(t('auth.user-not-found'));
      return wishlistService.addToWishlist(user.uid, productId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['products-with-wishlist', user?.uid] });
      setIsWishlisted(true);
      await refresh();
      showSuccessMessage(t("shop.added-to-wishlist"));
    },
    onError: (error) => {
      showErrorMessage(error instanceof Error ? error.message : t("shop.update-wishlist-failed"));
    },
    onSettled: () => setButtonLoading(false),
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!user) throw new Error(t('auth.user-not-found'));
      return wishlistService.removeFromWishlist(user.uid, productId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['products-with-wishlist', user?.uid] });
      setIsWishlisted(false);
      await refresh();
      showErrorMessage(t("shop.removed-from-wishlist"));
    },
    onError: (error) => {
      showErrorMessage(error instanceof Error ? error.message : t("shop.update-wishlist-failed"));
    },
    onSettled: () => setButtonLoading(false),
  });

  const handleAddToCart = async () => {
    if (!user) return;
    setCartLoading(true);
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      showErrorMessage(t("shop.add-to-cart-failed"));
    } finally {
      setCartLoading(false);
    }
  };

  const toggleWishlist = () => {
    if (!user) return;
    setButtonLoading(true);
    if (isWishlisted) {
      removeMutation.mutate(product.id);
    } else {
      addMutation.mutate(product.id);
    }
  };

  useEffect(() => {
    setIsWishlisted(product.isWishlisted);
  }, [product.isWishlisted]);

  return (
    <div>
      <div className='w-[300px] relative group'>
        <img className={`${themedBorder} w-full h-[340px] border`}
          src={product.image}
          alt="product image"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black/40 backdrop-blur-xs opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col justify-center items-center h-full">
            <OutlinedButton content={t("shop.details-page")}
              onClick={() => navigate(`/shop/${product.id}`)} height={40} width={180} fontWeight="normal" />
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-between mt-2'>
          <span className='inline-block my-1'>{product.name}</span>
          {user &&
            <div className='flex flex-row gap-2'>
              {product.isAvailable &&
                <OutlinedButton content={<ShoppingCartOutlined />} height={40} width={40} fontWeight='normal' onClick={handleAddToCart} isDisabled={cartLoading || !product.isAvailable || addLoading} />
              }
              <OutlinedButton onClick={toggleWishlist} content={isWishlisted ? <HeartFilled /> : <HeartOutlined />} height={40} width={40} fontWeight="normal" isDisabled={buttonLoading} />
            </div>
          }
        </div>
        <div className='flex flex-row my-1'>
          <span className='me-2'>{product.stars}</span>
          <Rating
            name="read-only"
            value={product.stars}
            precision={0.1}
            readOnly
            icon={<StarIcon sx={{ color: 'gold' }} />}
            emptyIcon={<StarBorderIcon sx={{ color: 'gray' }} />}
          />
          <span>({product.reviewsCount})</span>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center my-1'>
        <span className='font-bold pe-4'>{product.price}$</span>
        {!product.isAvailable && (
          <span className='text-red-600'>{t("shop.product-not-available")}</span>
        )}
      </div>
    </div>
  )
}
