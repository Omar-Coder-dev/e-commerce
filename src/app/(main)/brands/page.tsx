import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GetAllBrands } from 'images/BrandsAction/BrandAction'

export default async function BrandsPage() {
  const brandsData = await GetAllBrands()
  const brands = brandsData?.data || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Our Brands
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover products from your favorite brands. Quality you can trust, styles you'll love.
          </p>
          <Badge variant="secondary" className="mt-4 px-4 py-2 text-sm">
            {brands.length} Brands Available
          </Badge>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {brands.map((brand: any) => (
            <Link key={brand._id} href={`/products?brand=${brand._id}`}>
              <Card className="group bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer">
                <CardContent className="p-0">
                  {/* Brand Image */}
                  <div className="relative overflow-hidden bg-white">
                    <div className="relative w-full h-32 md:h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={120}
                        height={80}
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-300 max-w-full max-h-full"
                      />
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Brand Info */}
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-sm md:text-base">
                      {brand.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {brands.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gray-400 text-2xl">🏷️</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Brands Available</h3>
            <p className="text-gray-500">Check back later for new brand partnerships.</p>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-12">
          <Link href="/">
            <Card className="inline-block bg-white/90 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="px-6 py-3">
                <span className="text-gray-700 font-medium">← Back to Shopping</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}