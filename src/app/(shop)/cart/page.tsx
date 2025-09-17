'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ClearCart, getCartData, RemoveProductFromCart, UpdateProductQuantity } from 'images/CartAction/CartAction';
import { Minus, Plus, Trash2, ShoppingCart, Shield, ArrowLeft } from 'lucide-react';
import { Cart, CartData, ProductElement } from 'images/types/cart.type';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CartUI() {
  const [cart, setCart] = useState<Cart>();
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    async function getAllCartData() {
      setCartLoading(true);
      const data: CartData = await getCartData();
      setCart(data.data);
      setCartLoading(false);
    }
    getAllCartData();
  }, []);


async function deleteProduct(id: string) {
  const data = await RemoveProductFromCart(id);
  if (data.status === 'success') {
    toast.success('Product removed from cart', { position: 'top-center' });
    window.location.reload(); // <-- full page reload
  }
}

async function clearCartData() {
  const data = await ClearCart();
  if (data.message === 'success') {
    toast.success('Cart cleared', { position: 'top-center' });
    window.location.reload(); // <-- full page reload
  }
}


  async function updateProductCount(id: string, quantity: number) {
    setCartLoading(true)
    const data = await UpdateProductQuantity(id, quantity)
    if (data.status == 'success') {
      setCart(data.data)
    }
    setCartLoading(false)
  }

  const isEmpty = !cart?.products?.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {cartLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : isEmpty ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
            <Link href="/">
              <Button className="mt-4">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-gray-600">{cart.products.length} items</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.products.map((item: ProductElement) => (
                <Card key={item._id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">

                      {/* Image */}
                      <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <Image src={item.product.imageCover} alt={item.product.title} fill className="object-cover" />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-md">{item.product.title}</h3>
                        <p className="text-md text-gray-500">{item.product.category.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map(i => (
                              <i key={i} className={`fas fa-star text-xs ${i <= item.product.ratingsAverage ? '' : 'text-gray-300'}`}></i>
                            ))}
                          </div>
                          <span className="text-md text-gray-500">{item.product.ratingsAverage}</span>
                        </div>
                      </div>

                      {/* Price & Controls */}
                      <div className="text-right">
                        <div className="font-bold text-lg">{(item.price * item.count).toFixed(2)} EGP</div>
                        <div className="text-xs text-gray-400">{item.price.toFixed(2)} each</div>

                        {/* Quantity */}
                        <div className="flex items-center border rounded mt-2">
                          {item.count > 1 ? (
                            <Button
                              onClick={() => updateProductCount(item.product._id, item.count -= 1)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => deleteProduct(item.product._id)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}

                          <span className="px-2 text-sm">{item.count}</span>

                          <Button
                            onClick={() => updateProductCount(item.product._id, item.count += 1)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button onClick={() => deleteProduct(item.product._id)} size="sm" variant="ghost" className="text-red-500 mt-2 p-1">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Link href="/">
                  <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" />Continue</Button>
                </Link>
                <Button onClick={clearCartData} variant="outline" className="text-red-600">Clear Cart</Button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="font-bold text-lg mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart.products.length} items)</span>
                      <span>{cart.totalCartPrice.toFixed(2)} EGP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>50.00 EGP</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{(cart.totalCartPrice + 50).toFixed(2)} EGP</span>
                    </div>
                  </div>

                  <Link href={`/checkoutsession/${cart._id}`} className="w-full">
                    <Button className="w-full mb-4">
                      <Shield className="h-4 w-4 mr-2" />
                      Secure Checkout
                    </Button>
                  </Link>


                  {/* Promo */}
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" className="flex-1" />
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-6 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-truck"></i>
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fas fa-undo"></i>
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}