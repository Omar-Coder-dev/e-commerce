export interface OrderData {
  results: number
  metadata: Metadata
  data: Order[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface Order {
  shippingAddress?: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: PaymentMethodType
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartItem[]
  createdAt: string
  updatedAt: string
  id: number
  paidAt?: string
}

export interface ShippingAddress {
  details?: string
  phone: string
  city: string
}

export interface CartItem {
  count: number
  _id: string
  product: Product
  price: number
}

export interface Product {
  subcategory: Brand[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: Brand
  brand: Brand
  ratingsAverage: number
  id: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  image?: string
  category?: string
}

export enum PaymentMethodType {
  Card = "card",
  Cash = "cash",
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}
