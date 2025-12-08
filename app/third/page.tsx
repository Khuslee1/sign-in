"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  dateBirth: z.string(),
  profile: z.string().min(4, {
    message: "Image cannot be blank",
  }),
});

export default function ProfileForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateBirth: "",
      profile: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/last");
  }
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [prev, setPrev] = useState<string>("");
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
            className="relative h-full "
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="dateBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of birth
                      <span className="text-[14px] text-[#E14942]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen} {...field}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal"
                          >
                            {date ? date.toLocaleDateString() : "--/--/--"}
                            <CiCalendar />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setDate(date);
                              setOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Profile image
                      <span className="text-[14px] text-[#E14942]">*</span>
                    </FormLabel>
                    <FormControl>
                      <div
                        className="border border-dashed bg-[#7F7F800D] flex flex-col items-center justify-center w-full h-[180px] relative gap-2"
                        {...field}
                      >
                        {prev ? (
                          <img
                            src={prev}
                            className="absolute w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <div className="w-7 h-7 bg-white rounded-full flex justify-center items-center">
                              <MdOutlineImage className="max-w-3 max-h-3" />
                            </div>
                            <h1 className="text-[14px] font-semibold z-10">
                              Add image
                            </h1>
                          </>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            field.onChange(file);
                            setPrev(URL.createObjectURL(file));
                          }}
                          className="w-full h-full opacity-0 absolute"
                        />
                      </div>
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
                  router.push("/second");
                }}
              >
                <ChevronLeft /> Back
              </Button>
              <Button type="submit" className="w-7/10 flex justify-center ">
                Conitnue 3/3 <ChevronRight />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
