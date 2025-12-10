"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
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
import { ChildProps } from "../types";
import { Header } from "./Header";
import { useEffect } from "react";

const formSchema = z.object({
  Firstname: z.string().regex(/^[a-zA-Z_]+$/, {
    message: "First name cannot contain special characters or numbers.",
  }),
  Lastname: z.string().regex(/^[a-zA-Z_]+$/, {
    message: "Last name cannot contain special characters or numbers.",
  }),
  Username: z.string().min(4, {
    message: "This username is already taken. Please choose another one.",
  }),
});

export const First = ({ setStep }: ChildProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Username: "",
    },
  });
  useEffect(() => {
    const saved = localStorage.getItem("First");

    if (saved) {
      form.reset(JSON.parse(saved));
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(2);
    localStorage.setItem("First", JSON.stringify(values));
  }

  return (
    <div className="w-[480px] h-[655px] bg-white rounded-xl p-8 flex flex-col gap-7">
      <Header />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative h-full"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="Firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name
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
              name="Lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last name
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
              name="Username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username
                    <span className="text-[14px] text-[#E14942]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Placeholder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full flex justify-center absolute bottom-2"
          >
            Conitnue 1/3 <ChevronRight />
          </Button>
        </form>
      </Form>
    </div>
  );
};
