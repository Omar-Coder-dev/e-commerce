'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingBag, ShoppingCart, Star, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { GetWishList, RemoveFromWishList } from 'images/WishListAction/WishListAction'
import { AddProductToCart } from 'images/CartAction/CartAction'
export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  const [addingToCart, setAddingToCart] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function DisplayWishList() {
      setLoading(true)
      const data = await GetWishList()
      setWishlistItems(data.data || [])
      setLoading(false)
    }
    DisplayWishList()
  }, [])

  const handleRemoveFromWishlist = async (productId: string) => {
    setRemovingItems(prev => new Set(prev).add(productId))
    await RemoveFromWishList(productId)
    setWishlistItems(prev => prev.filter(item => item._id !== productId))
    toast.success('Removed from wishlist', { position: 'top-center' })
    setRemovingItems(prev => {
      const newSet = new Set(prev)
      newSet.delete(productId)
      return newSet
    })
  }

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(prev => new Set(prev).add(productId))
    await AddProductToCart(productId)
    toast.success('Added to cart')
    setAddingToCart(prev => {
      const newSet = new Set(prev)
      newSet.delete(productId)
      return newSet
    })
  }

  if (loading) {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50'>
        <div className="loader"></div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-gradient-to-br from-red-100 to-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Discover amazing products and save your favorites for later</p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                My Wishlist
              </h1>
              <p className="text-gray-600 text-lg">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((product) => (
            <Card key={product._id} className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <CardContent className="p-0 relative">
                {/* Clickable Card Content */}
                <Link href={`/products/${product._id}`} className="block cursor-pointer">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Discount Badge */}
                    {product.priceAfterDiscount && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
                        -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors text-lg leading-tight">
                      {product.title}
                    </h3>

                    <Badge variant="secondary" className="mb-3 text-xs bg-gray-100 text-gray-700 border-0">
                      {product.category?.name}
                    </Badge>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i <= Math.floor(product.ratingsAverage || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {product.ratingsAverage || 0}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({product.ratingsQuantity || 0})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {product.priceAfterDiscount || product.price} EGP
                        </span>
                        {product.priceAfterDiscount && (
                          <span className="text-lg text-gray-500 line-through">
                            {product.price} EGP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Action Buttons (Outside the Link to prevent nesting and positioned absolutely) */}
                {/* Remove Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm border-0 rounded-full w-10 h-10 p-0 z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFromWishlist(product._id);
                  }}
                  disabled={removingItems.has(product._id)}
                >
                  {removingItems.has(product._id) ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                  ) : (
                    <Heart className="h-5 w-5 text-red-500 fill-current" />
                  )}
                </Button>

                {/* Add to Cart Button */}
                <div className="px-6 pb-6">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3 z-10 relative"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product._id);
                    }}
                    disabled={addingToCart.has(product._id)}
                  >
                    {addingToCart.has(product._id) ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Adding...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}