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
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function ResetPassword() {
  const router = useRouter()

  const SchemaResetCode = z.object({
    resetCode: z.string().nonempty("Reset code is required"),
  })

  const ResetCodeForm = useForm<z.infer<typeof SchemaResetCode>>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(SchemaResetCode),
  })

  async function resetCode(values: z.infer<typeof SchemaResetCode>) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    const data = await res.json()
    console.log(data)

    if (data.status == "Success") {
      toast.success("Code Reseted Successfully", { position: 'top-center' })
      router.push('/resetPassword')
    } else {
      toast.error(data.message || "Enter Valid Code Or Please try again Later.", { position: 'top-center' })
    }
  }

  return (
    <div className='py-6'>
      <Form {...ResetCodeForm}>
        <form
          onSubmit={ResetCodeForm.handleSubmit(resetCode)}
          className="space-y-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Enter your email to reset your password
          </h2>

          <FormField
            control={ResetCodeForm.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
    <InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            Verify Code
          </Button>
        </form>
      </Form>
    </div>
  )
}
