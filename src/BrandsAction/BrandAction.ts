'use server'

export async function GetAllBrands() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`)
    const data = await res.json()
    return data
}

export async function GetSpecificBrand(brandsId :string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${brandsId}`)
    const data = await res.json()
    return data
}