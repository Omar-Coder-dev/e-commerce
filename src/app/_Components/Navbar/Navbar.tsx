"use client"

import * as React from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchCart } from "../../store/cartSlice"

export function Navbar() {
    const { data, status } = useSession()
    const dispatch = useAppDispatch()
    const { cart, loading } = useAppSelector((state) => state.cart)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    // Fetch cart when user is authenticated
    React.useEffect(() => {
        if (status === "authenticated" && data) {
            dispatch(fetchCart())
        }
    }, [dispatch, data, status])

    // Close mobile menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const navbar = document.getElementById('mobile-navbar')
            if (navbar && !navbar.contains(event.target as Node)) {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMobileMenuOpen])

    const MenuAuthItems: { path: string, name: string }[] = [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
    ]

    const MenuItems: { path: string, name: string, icon: string, protected: boolean }[] = [
        { name: "Category", path: "/category", icon: "fas fa-list", protected: false },
        { name: "Brands", path: "/brands", icon: "fas fa-tags", protected: false },
        { name: "Cart", path: "/cart", icon: "fas fa-shopping-cart", protected: true },
        { name: "WishList", path: "/wishlist", icon: "fas fa-heart", protected: false },
        { name: "Order", path: "/allorders", icon: "fas fa-receipt", protected: true },
    ]

    // Get cart count
    const cartCount = cart?.products?.length || 0

    // Filter menu items based on authentication
    const visibleMenuItems = MenuItems.filter(item => 
        !item.protected || (item.protected && status === "authenticated")
    )

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <div className="bg-white border-b shadow-sm sticky top-0 z-50" id="mobile-navbar">
            {/* Desktop Navigation */}
            <NavigationMenu viewport={false} className="hidden lg:flex max-w-full justify-between px-6 py-3">
                <NavigationMenuList className="space-x-1">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className="hover:bg-transparent p-0">
                            <Link href={"/"} className="hover:opacity-80 transition-opacity">
                                <Image
                                    src="/images/freshcart-logo.svg"
                                    alt="Logo"
                                    width={100}
                                    height={35}
                                    className="h-9 w-auto"
                                />
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {visibleMenuItems.map((item) => (
                        <NavigationMenuItem key={item.path}>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={item.path}
                                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors relative"
                                >
                                    <div className="relative">
                                        <i className={`${item.icon} text-sm`}></i>
                                        {/* Cart Badge */}
                                        {item.name === "Cart" && cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-semibold text-[10px] min-w-[16px]">
                                                {cartCount > 99 ? '99+' : cartCount}
                                            </span>
                                        )}
                                    </div>
                                    <span>{item.name}</span>
                                    {/* Loading indicator for cart */}
                                    {item.name === "Cart" && loading && (
                                        <i className="fa-solid fa-spinner fa-spin text-xs text-gray-400"></i>
                                    )}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>

                <NavigationMenuList className="space-x-2">
                    {status === "authenticated" ? (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className="hover:bg-transparent p-0">
                                    <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-md">
                                        <i className="fas fa-user text-sm"></i>
                                        <span>Hello, {data?.user?.name || 'User'}</span>
                                    </div>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className="p-0">
                                    <button
                                        onClick={() => signOut()}
                                        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-700 border border-red-700 rounded-md transition-colors hover:bg-red-700 hover:text-white"
                                    >
                                        <i className="fas fa-sign-out-alt text-sm"></i>
                                        <span>Log Out</span>
                                    </button>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    ) : (
                        <>
                            {MenuAuthItems.map((item) => (
                                <NavigationMenuItem key={item.path}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.path}
                                            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${item.name === 'Login'
                                                ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200'
                                                : 'text-white bg-green-600 hover:bg-green-700'
                                                }`}
                                        >
                                            <i className={`fas ${item.name === 'Login' ? 'fa-sign-in-alt' : 'fa-user-plus'} text-sm`}></i>
                                            <span>{item.name}</span>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </>
                    )}
                </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href={"/"} className="hover:opacity-80 transition-opacity">
                    <Image
                        src="/images/freshcart-logo.svg"
                        alt="Logo"
                        width={100}
                        height={35}
                        className="h-9 w-auto"
                    />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? (
                        <i className="fas fa-times text-lg"></i>
                    ) : (
                        <i className="fas fa-bars text-lg"></i>
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t shadow-lg">
                    <div className="px-4 py-3 space-y-1">
                        {/* Navigation Items */}
                        {visibleMenuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={closeMobileMenu}
                                className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors relative"
                            >
                                <div className="relative">
                                    <i className={`${item.icon} text-base`}></i>
                                    {/* Cart Badge for Mobile */}
                                    {item.name === "Cart" && cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold text-[10px] min-w-[20px]">
                                            {cartCount > 99 ? '99+' : cartCount}
                                        </span>
                                    )}
                                </div>
                                <span>{item.name}</span>
                                {/* Loading indicator for cart */}
                                {item.name === "Cart" && loading && (
                                    <i className="fa-solid fa-spinner fa-spin text-sm text-gray-400 ml-auto"></i>
                                )}
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="border-t my-3"></div>

                        {/* Authentication Section */}
                        {status === "authenticated" ? (
                            <>
                                {/* User Info */}
                                <div className="flex items-center space-x-3 px-3 py-3 text-base text-gray-700 bg-gray-50 rounded-md">
                                    <i className="fas fa-user text-base"></i>
                                    <span>Hello, {data?.user?.name || 'User'}</span>
                                </div>
                                
                                {/* Logout Button */}
                                <button
                                    onClick={() => {
                                        signOut()
                                        closeMobileMenu()
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-3 text-base font-medium text-red-700 border border-red-700 rounded-md transition-colors hover:bg-red-700 hover:text-white"
                                >
                                    <i className="fas fa-sign-out-alt text-base"></i>
                                    <span>Log Out</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {MenuAuthItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={closeMobileMenu}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-md transition-colors ${item.name === 'Login'
                                            ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200'
                                            : 'text-white bg-green-600 hover:bg-green-700'
                                            }`}
                                    >
                                        <i className={`fas ${item.name === 'Login' ? 'fa-sign-in-alt' : 'fa-user-plus'} text-base`}></i>
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}