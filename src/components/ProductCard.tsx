import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Rating from '@mui/material/Rating';
import { ProductCardProps } from '../types';
import { OutlinedButton } from './OutlinedButton';

export const ProductCard = ({
  product
}: ProductCardProps) => {
  return (
    <div>

      {/* Product Image */}
      <div className='w-[290px] relative group'>
        <img className='w-full h-[340px] p-4 bg-white border border-white'
          src={product.image}
          alt="product image"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black/40 backdrop-blur-xs opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-2 right-2">
            <OutlinedButton content={<HeartOutlined />} height={40} width={40} fontWeight="normal" />
          </div>
          <div className="flex justify-center items-center h-full">
            <OutlinedButton content="DETAILS PAGE" height={40} width={180} fontWeight="normal" />
          </div>
        </div>
      </div>

      {/* Product Text */}
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
          <span className='inline-block my-1'>{product.name}</span>
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
        <OutlinedButton content={<ShoppingCartOutlined />} height={40} width={40} fontWeight='normal' />
      </div>
      <div className='flex flex-row justify-between items-center my-1'>
        <span className='font-bold pe-4'>{product.price}$</span>
      </div>
    </div>
  )
}
