'use server'

import GetUserToken from "images/GetUserToken"

export async function CheckOutPayment(cartId: string, shippingData: {phone: string, details: string, city: string}) {
    const token: any = await GetUserToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_URL}`, {
        method: 'POST',
        body: JSON.stringify({
            "shippingaddress": shippingData
        }),
        headers: {
            'Content-Type': 'application/json',
            token: token
        }
    })
    const data = await res.json()
    return data
}

export async function createCashOrder(cartId: string, shippingData: {phone: string, details: string, city: string}) {
    const token: any = await GetUserToken()
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`, {
            method: 'POST',
            body: JSON.stringify({
                "shippingaddress": shippingData
            }),
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error creating cash order:', error)
        return { status: 'error', message: 'Failed to create cash order' }
    }
}

export async function getMyOrders() {
    const token: any = await GetUserToken()
    if (!token) {
        throw new Error("User is not authenticated");
    }
    
    const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/getMe`, {
        headers: {
            'Content-Type': 'application/json',
            token: token
        }
    })
    const userData = await userRes.json()
    const userId = userData.data._id
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            token: token
        }
    })
    const data = await res.json()
    return data.data || data
}