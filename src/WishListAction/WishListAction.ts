'use server'

import GetUserToken from "images/GetUserToken";

export async function AddToWishList(id : string) {
    const token: any = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "POST",
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
export async function RemoveFromWishList(id : string) {
    const token: any = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`, {
        method: "DELETE",
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
export async function GetWishList() {
    const token: any = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "GET",
        headers: {
            token: token,
        }
    })
    const data = await res.json()
    return data
}