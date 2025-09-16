'use server'
import GetUserToken from "images/GetUserToken"
import { CartData } from "images/types/cart.type";

export async function getCartData() {
    const token: string | null = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        headers: {
            token: token
        }
    })
    const data: CartData = await res.json()
    return data
}

export async function AddProductToCart(id: string) {
    const token: string | null = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId: id }),
        headers:
        {
            token: token,
            'content-type': "application/json"
        }
    })
    const data = await res.json()
    return data
}

export async function RemoveProductFromCart(id: string) {
    const token: string | null = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
        method: 'DELETE',
        headers: {
            token: token
        }
    })
    const data = await res.json()
    return data
}

export async function ClearCart() {
    const token: string | null = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
        method: 'DELETE',
        headers:{
            token : token
        }
    })
    const data = await res.json()
    return data
}

export async function UpdateProductQuantity(id: string, quantity: number) {
        const token: string | null = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ count : quantity }),
        headers: {
            token : token
        }
    })
    const data = await res.json()
    return data
}