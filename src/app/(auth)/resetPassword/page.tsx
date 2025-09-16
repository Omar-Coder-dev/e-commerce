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
import { Input } from 'images/components/ui/input'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function ResetPassword() {
  const router = useRouter()

  const SchemaResetPassword = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email format"),


    newPassword: z
      .string().nonempty("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
  })

  const ResetPasswordForm = useForm<z.infer<typeof SchemaResetPassword>>(
    {
      defaultValues: {
        "email": "",
        "newPassword": "",
      }
      , resolver: zodResolver(SchemaResetPassword)
    }
  )
  async function handleResetPassword(values: z.infer<typeof SchemaResetPassword>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    const data = await res.json()
    console.log(data);
    if (data.token) {
      toast.success("Password Reseted Successfully", { position: 'top-center' })
      router.push('/login')
    }
    else {
      toast.error(data.message || "Login failed. Please try again.", { position: 'top-center' })
    }
  }


  return (
    <div className='py-6'>
      <Form {...ResetPasswordForm}>
        <form
          onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}
          className="space-y-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Reset Your Password
          </h2>

          {/* Email */}
          <FormField
            control={ResetPasswordForm.control}
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
            control={ResetPasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>

  )
}
