import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { product } from 'images/types/product.types'
import { Brand } from 'images/types/cart.type'
import { GetSpecificBrand } from 'images/BrandsAction/BrandAction'
import ProductCard from 'images/app/_Components/ProductCard/ProductCard'
import { GetSpecificCategories } from 'images/CateogryAction/CategoryAction'

interface ProductsPageProps {
  searchParams: {
    brand?: string
    category?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const brandId = searchParams.brand
  const categoryId = searchParams.category

  // Fetch all products
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data = await res.json()
  const allProducts: product[] = data.data

  // Filter products by brand or category
  let products = allProducts
  if (brandId) {
    products = products.filter((p: product) => p.brand._id === brandId)
  }
  if (categoryId) {
    products = products.filter((p: product) => p.category._id === categoryId)
  }

  // Fetch brand details if filtering by brand
  let brandDetails: Brand | null = null
  if (brandId) {
    try {
      const brandData = await GetSpecificBrand(brandId)
      brandDetails = brandData?.data
    } catch (error) {
      console.error('Error fetching brand details:', error)
    }
  }

  // Fetch category details if filtering by category
  let categoryDetails: any = null
  if (categoryId) {
    try {
      const categoryData = await GetSpecificCategories(categoryId)
      categoryDetails = categoryData?.data
    } catch (error) {
      console.error('Error fetching category details:', error)
    }
  }

  const isFiltered = !!brandDetails || !!categoryDetails
  const filterName = brandDetails?.name || categoryDetails?.name

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          {isFiltered ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                {filterName} Products
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover all products from {filterName}. Quality you can trust.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                All Products
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover our complete collection of products.
              </p>
            </>
          )}
          <Badge variant="secondary" className="mt-4 px-4 py-2 text-sm">
            {products.length} Products Found
          </Badge>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>→</span>
          {brandDetails ? (
            <>
              <Link href="/brands" className="hover:text-gray-900 transition-colors">
                Brands
              </Link>
              <span>→</span>
              <span className="text-gray-900 font-medium">{brandDetails.name}</span>
            </>
          ) : categoryDetails ? (
            <>
              <Link href="/categories" className="hover:text-gray-900 transition-colors">
                Categories
              </Link>
              <span>→</span>
              <span className="text-gray-900 font-medium">{categoryDetails.name}</span>
            </>
          ) : (
            <span className="text-gray-900 font-medium">Products</span>
          )}
        </div>

        {/* Filter Info */}
        {isFiltered && (
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Filtered by:</span>
              <Badge variant="outline" className="px-3 py-1">
                {filterName}
              </Badge>
            </div>
            <Link 
              href="/products" 
              className="text-blue-600 hover:text-blue-800 text-sm underline transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p: product) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gray-400 text-2xl">📦</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              {filterName ? `No ${filterName} Products Found` : 'No Products Available'}
            </h3>
            <p className="text-gray-500 mb-6">
              {filterName 
                ? `We don't have any products from ${filterName} at the moment.` 
                : 'Check back later for new products.'}
            </p>
            {isFiltered && (
              <Link href="/products">
                <Card className="inline-block bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="px-6 py-3">
                    <span className="text-gray-700 font-medium">View All Products</span>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        )}

        {/* Back Navigation */}
        <div className="flex justify-center mt-12">
          <Link href={brandDetails ? "/brands" : categoryDetails ? "/categories" : "/"}>
            <Card className="inline-block bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="px-6 py-3">
                <span className="text-gray-700 font-medium">
                  ← Back to {brandDetails ? "Brands" : categoryDetails ? "Categories" : "Home"}
                </span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
