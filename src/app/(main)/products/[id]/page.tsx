import ProductDetailsCard from 'images/app/_Components/ProductDetailsCard/ProductDetailsCard';
import { ProductDetails, productDetailsData } from 'images/types/productDetails.types';
import React from 'react'

export default async function productDetails({params}:{params:{id:string}}) {
    const {id}=await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
    const data:ProductDetails = await res.json();

    const product:productDetailsData = data.data;
    return (
        <div>
            <ProductDetailsCard product = {product}/>
        </div>
  )
}
