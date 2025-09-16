'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from 'images/components/ui/button'
import { signIn } from "next-auth/react"
import { Input } from 'images/components/ui/input'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { fa } from 'zod/v4/locales'
export default function Login() {
  const router = useRouter()

  const SchemaLogin = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email format"),


    password: z
      .string().nonempty("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
  })

  const LoginForm = useForm<z.infer<typeof SchemaLogin>>(
    {
      defaultValues: {
        "email": "",
        "password": "",
      }
      , resolver: zodResolver(SchemaLogin)
    }
  )
  async function handleLogin(values: z.infer<typeof SchemaLogin>) {

   const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (data?.ok) {
      toast.success("Logged In Successfully", { position: 'top-center' })
      router.push('/')
    }
    else {
      toast.error(data?.error || "Login failed. Please try again.", { position: 'top-center' })
    }
    console.log(data)

  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8"
  //     }
  //   }
  // )

  //   const data = await res.json()
  //   if (data.message == "success") {
  //     toast.success("Logged In Successfully", { position: 'top-center' })
  //     router.push('/')
  //   }
  //   else {
  //     toast.error(data.message || "Login failed. Please try again.", { position: 'top-center' })
  //   }
  
  }


  return (
    <div className='py-6'>
      <Form {...LoginForm}>
        <form
          onSubmit={LoginForm.handleSubmit(handleLogin)}
          className="space-y-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Log In
          </h2>

          {/* Email */}
          <FormField
            control={LoginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={LoginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-4 text-right ">
            <Link
              href="/forgetPassword"
              className="text-sm text-indigo-700! hover:underline!"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            Log In
          </Button>
        </form>
      </Form>
    </div>

  )
}
