// src/types/wishlist.ts

export interface WishlistCategory {
  _id: string
  name: string
  slug: string
  image?: string
}

export interface WishlistBrand {
  _id: string
  name: string
  slug: string
  image?: string
}

export interface WishlistSubCategory {
  _id: string
  name: string
  slug: string
  category: string
}

export interface WishlistProduct {
  sold: number
  images: string[]
  subcategory: WishlistSubCategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: WishlistCategory
  brand: WishlistBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
  priceAfterDiscount?: number // sometimes available
}

// When adding or removing a product from wishlist
export interface WishlistActionResponse {
  status: string
  message: string
  data: string[] // product IDs
}

// When fetching logged-in user wishlist
export interface WishlistGetResponse {
  status: string
  count: number
  data: WishlistProduct[]
}
