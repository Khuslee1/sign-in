"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
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

const formSchema = z.object({
  Firstname: z.string().min(4, {
    message: "Firstname must be at least 4 characters.",
  }),
  Lastname: z.string().min(4, {
    message: "Lastname must be at least 4 characters.",
  }),
  Username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Firstname: "",
      Lastname: "",
      Username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-300 ">
      <div className="w-[480px] h-[655px] bg-white rounded-xl p-8 flex flex-col gap-7">
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
            className="space-y-[150px] "
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
                    <FormDescription></FormDescription>
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
                    <FormDescription></FormDescription>
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
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full flex justify-center ">
              Conitnue 1/3 <ChevronRight />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
