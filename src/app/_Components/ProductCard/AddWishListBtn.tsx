'use client'
import { useState, useEffect } from 'react'
import { AddToWishList, RemoveFromWishList, GetWishList } from 'images/WishListAction/WishListAction'
import { toast } from 'sonner'

interface WishlistHeartButtonProps {
  productId: string
}

export default function WishlistHeartButton({ productId }: WishlistHeartButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check if product is in wishlist on component mount
  useEffect(() => {
    checkWishlistStatus()
  }, [productId])

  const checkWishlistStatus = async () => {
    try {
      const wishlistData = await GetWishList()
      if (wishlistData?.data) {
        // Check if current product is in the wishlist
        const isProductInWishlist = wishlistData.data.some(
          (item: any) => item._id === productId || item.id === productId
        )
        setIsInWishlist(isProductInWishlist)
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error)
    }
  }

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLoading(true)

    try {
      if (isInWishlist) {
        // Remove from wishlist
        await RemoveFromWishList(productId)
        setIsInWishlist(false)
        toast.success('Removed from wishlist', { position: 'top-center' })
      } else {
        // Add to wishlist
        await AddToWishList(productId)
        setIsInWishlist(true)
        toast.success('Added to wishlist', { position: 'top-center' })
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', { position: 'top-center' })
      console.error('Wishlist toggle error:', error)
    }

    setIsLoading(false)
  }

  return (
    <div className={`absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ${
      isLoading ? 'opacity-50 cursor-not-allowed' : ''
    }`}>
      <i 
        onClick={handleWishlistToggle}
        className={`fas fa-heart transition-colors duration-300 cursor-pointer ${
          isInWishlist 
            ? 'text-red-500' 
            : 'text-gray-400 hover:text-red-500'
        } ${isLoading ? 'pointer-events-none' : ''}`}
      />
    </div>
  )
}