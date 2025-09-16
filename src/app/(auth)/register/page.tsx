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
export default function Register() {
  const router = useRouter()

const SchemaRegister = z.object({
  name: z
    .string().nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),

  email: z
    .email().nonempty("Email is required"),

phone: z
  .string()
  .nonempty("Phone number is required")
  .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Enter a valid Egyptian phone number"),

  password: z
    .string().nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters"),

  rePassword: z
    .string().nonempty("Please confirm your password")
    .min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
});

  const RegisterForm = useForm<z.infer<typeof SchemaRegister>>(
    {
      defaultValues: {
        "name": "",
        "email": "",
        "password": "",
        "rePassword": "",
        "phone": ""
      }
      ,resolver: zodResolver(SchemaRegister)
    }
  )
     async function handleRegister(values: z.infer<typeof SchemaRegister>) {
        const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
          method:"POST",
          body:JSON.stringify(values),
          headers : {
            "Content-Type" :"application/json; charset=utf-8"
          }
        })
        const data = await res.json()
        console.log(data);
        if (data.message == "success") {
          toast.success("Registered Successfully",{position:'top-center'})
          router.push('/login')
        }
        else {
          toast.error(data.message,{position:'top-center'})
        }
} 


  return (
    <div className='py-6'>
        <Form {...RegisterForm}>
    <form
      onSubmit={RegisterForm.handleSubmit(handleRegister)}
      className="space-y-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Create Your Account
      </h2>

      {/* Name */}
      <FormField
        control={RegisterForm.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Email */}
      <FormField
        control={RegisterForm.control}
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

      {/* Phone */}
      <FormField
        control={RegisterForm.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="tel"
                placeholder="Phone Number"
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
        control={RegisterForm.control}
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

      {/* Re-enter Password */}
      <FormField
        control={RegisterForm.control}
        name="rePassword"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="password"
                placeholder="Confirm Password"
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
        Register
      </Button>
    </form>
  </Form>
    </div>

  )
}
