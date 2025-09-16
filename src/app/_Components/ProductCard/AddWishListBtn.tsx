'use client'
import { AddToWishList } from 'images/WishListAction/WishListAction'
import { toast } from 'sonner'

interface WishlistHeartButtonProps {
  productId: string
}

export default function WishlistHeartButton({ productId }: WishlistHeartButtonProps) {
  return (
    <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
      <i 
        onClick={async (e) => {
          e.preventDefault(); 
          e.stopPropagation(); 
          await AddToWishList(productId)
          toast.success('Added to wishlist',{position:'top-center'})
        }} 
        className="fas fa-heart text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer"
      ></i>
    </div>
  )
}