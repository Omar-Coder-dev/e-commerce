import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from 'images/types/product.types'
import Link from 'next/link'
import AddCartBtn from './AddCartBtn'
import WishlistHeartButton from './AddWishListBtn'

function shortenTitle(title: string, maxWords = 3) {
  return title.split(" ").slice(0, maxWords).join(" ");
}

export default function ProductCard({ product }: { product: product }) {
  const { title, imageCover, price, ratingsAverage, category: { name }, _id } = product

  return (
    <Card className="bg-white rounded-xl transform transition-transform duration-500 ease-in-out hover:scale-105 overflow-hidden hover:shadow-2xl relative">
      {/* Wishlist Heart - Separate Client Component */}
      <WishlistHeartButton productId={_id} />

      <Link href={`/products/${_id}`}>
        <CardHeader>
          <Image
            src={imageCover}
            alt={title}
            width={500}
            height={500}
            className="w-full h-65 object-cover transform transition-transform duration-500 ease-in-out hover:scale-110 overflow-hidden "
          />
        </CardHeader>

        <CardContent>
          <CardTitle className="text-lg font-semibold text-gray-800 truncate">
            {shortenTitle(title)}
          </CardTitle>
          <p className="text-sm text-gray-500">{name}</p>
          
          <div className="flex justify-between items-center mt-3">
            <span className="text-base font-bold text-green-600">{price} EGP</span>
            <span className="flex items-center text-yellow-500 text-sm">
              <i className="fa-solid fa-star mr-1"></i> {ratingsAverage}
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <AddCartBtn id={_id} />
        </CardFooter>
      </Link>
    </Card>
  )
}
