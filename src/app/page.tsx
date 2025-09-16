import { product } from 'images/types/product.types';
import React from 'react'
import ProductCard from './_Components/ProductCard/ProductCard';
import MainSlider from './_Components/MainSlider/MainSlider';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data = await res.json()
  const productList: product[] = data.data

  return (
    <div className="container mx-auto p-6">
      <MainSlider/>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-15">
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
