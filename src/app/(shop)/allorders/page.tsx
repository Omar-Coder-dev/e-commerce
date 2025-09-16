'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingBag, Calendar, ArrowLeft, CheckCircle, Clock, Truck, User, CreditCard, Banknote } from 'lucide-react'
import { getMyOrders } from 'images/OrderAction/OrderAction'
import { useSession } from 'next-auth/react'
import { Order } from 'images/types/orders.type'

export default function MyOrders() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    async function getAllOrdersData() {
      setOrdersLoading(true)
      const data = await getMyOrders()

      const sortedOrders = (data || []).sort(
        (a: Order, b: Order) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

      setOrders(sortedOrders)
      setOrdersLoading(false)
    }
    getAllOrdersData()
  }, [])

  const formatDateTime = (date: string) => {
    const dateObj = new Date(date)
    const dateStr = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    const timeStr = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    return { date: dateStr, time: timeStr }
  }

  const getStatus = (order: Order) => {
    if (order.isDelivered) {
      return { text: 'Delivered', icon: CheckCircle, color: 'bg-green-100 text-green-800' }
    }
    if (order.isPaid) {
      return { text: 'Shipping', icon: Truck, color: 'bg-blue-100 text-blue-800' }
    }
    return { text: 'Processing', icon: Clock, color: 'bg-yellow-100 text-yellow-800' }
  }

  const getPaymentMethod = (order: Order) => {
    if (order.paymentMethodType === 'card') {
      return { text: 'Credit Card', icon: CreditCard }
    }
    return { text: 'Cash on Delivery', icon: Banknote }
  }

  const isEmpty = !orders.length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {ordersLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : isEmpty ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">No orders yet</h2>
            <Link href="/">
              <Button className="mt-4">Start Shopping</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">My Orders</h1>
              {session?.user?.name && (
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-800 font-medium">{session.user.name}</span>
                </div>
              )}
            </div>
            <p className="text-gray-600">{orders.length} orders</p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => {
              const status = getStatus(order)
              const StatusIcon = status.icon
              const paymentMethod = getPaymentMethod(order)
              const PaymentIcon = paymentMethod.icon
              const { date, time } = formatDateTime(order.createdAt)

              return (
                <Card key={order._id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4 pb-4 border-b">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold">Order #{order.id}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${status.color}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.text}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">{date}</span>
                            <span className="text-gray-400">at</span>
                            <span className="font-medium">{time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PaymentIcon className="h-4 w-4" />
                            <span className="font-medium">{paymentMethod.text}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{order.totalOrderPrice} EGP</div>
                        <div className="text-sm text-gray-500">{order.cartItems.length} items</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.cartItems.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-medium text-md">{item.product.title}</h3>
                            <p className="text-md text-gray-500">{item.product.category.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <i
                                    key={i}
                                    className={`fas fa-star text-xs ${
                                      i <= item.product.ratingsAverage ? '' : 'text-gray-300'
                                    }`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-md text-gray-500">{item.product.ratingsAverage}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-lg">{(item.price * item.count).toFixed(2)} EGP</div>
                            <div className="text-xs text-gray-400">{item.price.toFixed(2)} each</div>
                            <div className="text-sm text-gray-500 mt-1">Qty: {item.count}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            <div className="flex justify-between pt-4">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
