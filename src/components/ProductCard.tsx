import { HeartOutlined,HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import Rating from '@mui/material/Rating';
import { ProductCardProps } from '../types';
import { OutlinedButton } from './OutlinedButton';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../hooks/useAuthUser';
import { wishlistService } from '../services/wishlistService';
import { showSuccessMessage, showErrorMessage } from '../utils/toastUtils';
import { useState, useEffect } from 'react';
import { useWishlist } from '../contexts/wishlistContext';

export const ProductCard = ({
  product,
  onWishlistChange
}: ProductCardProps) => {

  const user = useAuthUser()
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { refresh: refreshWishlist } = useWishlist();

  useEffect(() => {
    setIsWishlisted(product.isWishlisted);
  }, [product.isWishlisted]);

  const toggleWishlist = async () => {
    if (!user) return;
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
      if (onWishlistChange) await onWishlistChange();
    } catch (error) {
      showErrorMessage('Failed to update wishlist.');
    } finally {
      setButtonLoading(false);
    }
  }

  return (
    <div>
      <div className='w-[290px] relative group'>
        <img className='w-full h-[340px] border border-white'
          src={product.image}
          alt="product image"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black/40 backdrop-blur-xs opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-center items-center h-full">
            <OutlinedButton content="DETAILS PAGE" onClick={() => navigate(`/product/${product.id}`)} height={40} width={180} fontWeight="normal" />
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-between mt-2'>
          <span className='inline-block my-1'>{product.name}</span>
          {user ?
            <div className='flex flex-row gap-2'>
              <OutlinedButton content={<ShoppingCartOutlined />} height={40} width={40} fontWeight='normal' />
              <OutlinedButton onClick={toggleWishlist} content={isWishlisted ? <HeartFilled /> : <HeartOutlined />} height={40} width={40} fontWeight="normal" disabled={buttonLoading} />
            </div>
            :
            <span className='text-red-500'>You are not logged in</span>
          }
        </div>
        <div className='flex flex-row my-1'>
          <span className='me-2'>{product.stars}</span>
          <Rating
            sx={{
              '& .MuiRating-icon': {
                color: 'white',
              },
              '& .MuiRating-iconEmpty': {
                color: 'white',
              },
            }}
            name="read-only"
            value={product.stars}
            precision={0.1}
            readOnly
          />
          <span>({product.reviewsCount})</span>
        </div>
      </div>
      <div className='flex flex-row justify-between items-center my-1'>
        <span className='font-bold pe-4'>{product.price}$</span>
      </div>
    </div>
  )
}
