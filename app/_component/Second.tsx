"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { useContext, useEffect, useState } from "react";
import { StepContext } from "../page";

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

export const Second = () => {
  const { data, setData, setStep } = useContext(StepContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: data.Email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });
  const [see1, setSee1] = useState<boolean>(true);
  const [see2, setSee2] = useState<boolean>(true);
  useEffect(() => {
    const saved = localStorage.getItem("Second");

    if (saved) {
      form.reset(JSON.parse(saved));
    }
  }, []);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(3);
    localStorage.setItem("Second", JSON.stringify(values));
    setData((prev) => ({
      ...prev,
      Email: values.Email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }));
  }

  return (
    <div className="w-[480px] min-h-[655px] bg-white rounded-xl p-8 flex flex-col gap-7 ">
      <Header />
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
                    <div className="relative">
                      <Input
                        type={see1 ? "password" : "text"}
                        placeholder="Placeholder"
                        className={`${see1 ? "text-blue-600" : "text-red-600"}`}
                        {...field}
                      />
                      <Button
                        type="button"
                        className="absolute w-6 h-6 rounded-full p-0 right-1.5 top-1.5 flex justify-center items-center bg-white hover:bg-white"
                        onClick={() => {
                          setSee1(!see1);
                        }}
                      >
                        {see1 ? (
                          <Eye className="text-yellow-400" />
                        ) : (
                          <EyeOff className="text-yellow-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
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
                    <div className="relative">
                      <Input
                        type={see2 ? "password" : "text"}
                        className={`${see2 ? "text-blue-600" : "text-red-600"}`}
                        placeholder="Placeholder"
                        {...field}
                      />
                      <Button
                        type="button"
                        className="absolute w-6 h-6 rounded-full p-0 right-1.5 top-1.5 flex justify-center items-center  bg-white hover:bg-white"
                        onClick={() => {
                          setSee2(!see2);
                        }}
                      >
                        {see2 ? (
                          <Eye className="text-yellow-400" />
                        ) : (
                          <EyeOff className="text-yellow-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 w-full absolute bottom-2">
            <Button
              type="button"
              className="w-3/10 flex justify-center"
              variant={"outline"}
              onClick={() => {
                setStep(1);
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
  );
};
