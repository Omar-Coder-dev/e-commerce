"use client"

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center space-y-8">
        {/* Logo */}
        <h2 className="text-2xl font-bold text-gray-900">MyStore</h2>

        {/* Links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <li><a href="/products" className="hover:text-gray-900">Products</a></li>
            <li><a href="/categories" className="hover:text-gray-900">Categories</a></li>
            <li><a href="/about" className="hover:text-gray-900">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
            <li><a href="/faq" className="hover:text-gray-900">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-gray-900">Privacy Policy</a></li>
          </ul>
        </nav>

        {/* Socials */}
        <div className="flex space-x-4">
          <Button size="icon" variant="outline" className="rounded-full">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Instagram className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full">
            <Linkedin className="h-4 w-4" />
          </Button>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}