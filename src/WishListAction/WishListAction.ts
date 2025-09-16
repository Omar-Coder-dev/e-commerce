'use server'

import GetUserToken from "images/GetUserToken";

async function fetchWithToken(url: string, options: RequestInit = {}) {
    const token: string | null = await GetUserToken();
    if (!token) throw new Error("User is not authenticated");

    options.headers = {
        ...options.headers,
        token,
        'Content-Type': 'application/json'
    };

    const res = await fetch(url, options);
    if (!res.ok) {
        // This ensures Vercel or Next.js won't fail silently
        throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function AddToWishList(id: string) {
    return fetchWithToken(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "POST",
        body: JSON.stringify({ productId: id }),
    });
}

export async function RemoveFromWishList(id: string) {
    return fetchWithToken(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`, {
        method: "DELETE",
    });
}

export async function GetWishList() {
    return fetchWithToken(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "GET",
    });
}
