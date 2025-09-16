'use server'

import GetUserToken from "images/GetUserToken"

export interface ShippingData {
    phone: string
    details: string
    city: string
}

async function fetchWithToken(url: string, options: RequestInit) {
    const token = await GetUserToken()
    if (!token) throw new Error("User is not authenticated")
    
    return fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            token,
            ...(options.headers || {})
        }
    })
}

export async function CheckOutPayment(cartId: string, shippingData: ShippingData) {
    const res = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`,
        {
            method: 'POST',
            body: JSON.stringify({ shippingaddress: shippingData })
        }
    )
    return res.json()
}

export async function createCashOrder(cartId: string, shippingData: ShippingData) {
    try {
        const res = await fetchWithToken(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
            {
                method: 'POST',
                body: JSON.stringify({ shippingaddress: shippingData })
            }
        )
        return res.json()
    } catch (error) {
        console.error('Error creating cash order:', error)
        return { status: 'error', message: 'Failed to create cash order' }
    }
}

export async function getMyOrders() {
    const userRes = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/getMe`,
        { method: 'GET' }
    )
    const userData = await userRes.json()
    const userId = userData.data._id

    const res = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`,
        { method: 'GET' }
    )
    const data = await res.json()
    return data.data || data
}
