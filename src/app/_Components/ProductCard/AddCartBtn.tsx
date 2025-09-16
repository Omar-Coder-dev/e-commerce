'use client'
import { Button } from 'images/components/ui/button'
import { useSession } from "next-auth/react"
import React from 'react'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from 'images/app/store/hooks'
import { addToCart } from 'images/app/store/cartSlice'

export default function AddCartBtn({ id }: { id: string }) {
    const { data: session, status } = useSession()
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.cart)

    async function addProduct(id: string) {
        // Check if user is authenticated first
        if (status === "unauthenticated" || !session) {
            toast.error("Please log in to add items to your cart", {
                position: "top-center",
                action: {
                    label: "Login",
                    onClick: () => window.location.href = '/login',
                },
            })
            return
        }

        try {
            await dispatch(addToCart(id)).unwrap()
            toast.success("Product added to cart successfully", { position: "top-center" })
        } catch (error: any) {
            toast.error(error || "Failed to add item to cart", { position: "top-center" })
        }
    }

    return (
        <Button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addProduct(id);
            }}
            disabled={loading || status === "loading"}
            className="!flex-1 !py-6 !rounded-2xl !bg-blue-600 !text-white !font-semibold !shadow-md hover:!bg-blue-700 hover:!scale-105 !transition-all !duration-300 disabled:!opacity-50 disabled:!cursor-not-allowed disabled:hover:!scale-100"
        >
            {loading ? (
                <>
                    <i className="fa-solid fa-spinner fa-spin mr-5"></i>
                    Adding...
                </>
            ) : (
                <>
                    <i className="fa-solid fa-cart-plus mr-5"></i>
                    Add To Cart
                </>
            )}
        </Button>
    )
}