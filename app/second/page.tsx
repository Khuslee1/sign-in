"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    Email: z.string().email({
      message: "Please provide a valid email address.",
    }),
    phoneNumber: z
      .string()
      .regex(/^[0-9_]+$/, {
        message: "Please enter a valid phone number.",
      })
      .min(8, {
        message: "Phone number should atleast 8.",
      }),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number")
      .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ProfileForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/third");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-300 ">
      <div className="w-[480px] min-h-[655px] bg-white rounded-xl p-8 flex flex-col gap-7 ">
        <div className="flex flex-col gap-2">
          <img src="logo.png" width="60" height="60" />
          <h1 className="text-[26px] font-semibold">Join Us! 😎</h1>
          <p className="text-[18px] text-[#8E8E8E]">
            Please provide all current information accurately.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative h-full min-h-[416px] pb-20 "
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                      <span className="text-[14px] text-[#E14942]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone number
                      <span className="text-[14px] text-[#E14942]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                      <span className="text-[14px] text-[#E14942]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password
                      <span className="text-[14px] text-[#E14942]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Placeholder" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 w-full absolute bottom-2">
              <Button
                className="w-3/10 flex justify-center"
                variant={"outline"}
                onClick={() => {
                  router.push("/");
                }}
              >
                <ChevronLeft /> Back
              </Button>
              <Button type="submit" className="w-7/10 flex justify-center ">
                Conitnue 2/3 <ChevronRight />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
