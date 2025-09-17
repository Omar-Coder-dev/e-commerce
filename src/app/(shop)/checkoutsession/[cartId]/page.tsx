"use client"

import { useParams } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, CreditCard, Banknote } from "lucide-react"
import { toast } from "sonner"
import { CheckOutPayment, createCashOrder } from "images/OrderAction/OrderAction"

// Validation schema
const checkoutSchema = z.object({
  phone: z
    .string()
    .regex(/^01[0-9]{9}$/, "Enter a valid Egyptian phone number"),
  details: z
    .string()
    .min(5, "Address details must be at least 5 characters"),
  city: z
    .string()
    .min(2, "City name must be at least 2 characters"),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckOutSession() {
  const { cartId }: { cartId: string } = useParams()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [checkOutLoading, setcheckOutLoading] = useState(false)

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      phone: "",
      details: "",
      city: "",
    },
  })

  async function handleSubmit(values: CheckoutFormValues) {
    setcheckOutLoading(true)

    try {
      if (paymentMethod === "card") {
        const data = await CheckOutPayment(cartId, values)
        if (data.session?.url) {
          toast.success("Redirecting to payment page...")
          window.open(data.session.url, "_blank")
          
          // Add refresh after a short delay for card payments
          setTimeout(() => {
            toast.success("Payment initiated! Refreshing page...")
            window.location.reload()
          }, 2000)
        } else {
          toast.error("Failed to create payment session")
        }
      } else {
        const data = await createCashOrder(cartId, values)
        if (data.status === "success") {
          toast.success("Order placed successfully!")
          setOrderSuccess(true)
          
          // Refresh after showing success message for cash orders
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        } else {
          toast.error("Failed to create order: " + (data.message || "Unknown error"))
        }
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.")
    }

    setcheckOutLoading(false)
  }

  const handleViewOrders = () => {
    // Refresh before navigating to orders
    window.location.href = "/allorders"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      {checkOutLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <Card className="w-full max-w-xl shadow-lg rounded-2xl">
          <CardHeader className="text-center border-b pb-6">
            <CardTitle className="text-2xl font-bold">Payment Details</CardTitle>
          </CardHeader>

          <CardContent className="p-8">
            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "card"
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="font-medium">Card Payment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    paymentMethod === "cash"
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Banknote className="h-6 w-6" />
                  <span className="font-medium">Cash on Delivery</span>
                </button>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          className="h-12 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Address Details"
                          className="h-12 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="City"
                          className="h-12 rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center pt-4">
                  <Link href="/cart">
                    <Button
                      variant="outline"
                      className="rounded-xl px-5 py-2 flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Cart
                    </Button>
                  </Link>

                  {orderSuccess ? (
                    <Button
                      onClick={handleViewOrders}
                      className="rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-md px-6 py-2"
                    >
                      View Orders
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md px-6 py-2 flex items-center gap-2"
                    >
                      {paymentMethod === "card" ? (
                        <>
                          <Shield className="h-4 w-4" />
                          Proceed to Payment
                        </>
                      ) : (
                        <>
                          <Banknote className="h-4 w-4" />
                          Place Order
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}