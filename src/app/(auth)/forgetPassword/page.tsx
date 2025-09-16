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
export default function ResetPassword() {
  const router = useRouter()

  const SchemaForgetPassword = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email format"),

  })

  const ForgetPasswordForm = useForm<z.infer<typeof SchemaForgetPassword>>(
    {
      defaultValues: {
        "email": "",
      }
      , resolver: zodResolver(SchemaForgetPassword)
    }
  )
  async function forgetPassword(values: z.infer<typeof SchemaForgetPassword>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    const data = await res.json()
    console.log(data);
    if (data.statusMsg == "success") {
      toast.success("Code Reseted Successfully", { position: 'top-center' })
      router.push('/resetCode')
    }
    else {
      toast.error(data.message || "Enter Valid Code Or Please try again Later.", { position: 'top-center' })
    }
  }


  return (
    <div className='py-6'>
      <Form {...ForgetPasswordForm}>
        <form
          onSubmit={ForgetPasswordForm.handleSubmit(forgetPassword)}
          className="space-y-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Enter your email to reset your password
          </h2>

          {/* Email */}
          <FormField
            control={ForgetPasswordForm.control}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            Send Reset Link
          </Button>
        </form>
      </Form>
    </div>

  )
}
