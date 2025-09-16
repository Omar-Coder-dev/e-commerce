'use server'

export async function GetAllCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
    const data = await res.json()
    return data
}

export async function GetSpecificCategories(categoriesId :string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${categoriesId}`)
    const data = await res.json()
    return data
}