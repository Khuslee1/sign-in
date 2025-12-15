"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useContext, useEffect, useState } from "react";
import { MdOutlineImage } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { StepContext } from "../page";
import { profile } from "console";

const formSchema = z.object({
  dateBirth: z.date().refine(
    (dateOfBirth) => {
      const diff =
        Date.now() - new Date(dateOfBirth.toLocaleDateString()).getTime();
      console.log(diff);
      let daysDifference = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      return daysDifference >= 18;
    },
    {
      message: `You must be at least 18 years old by calendar year.`,
    }
  ),

  profile: z.string().refine(
    (value) => {
      return value != "";
    },
    { message: "Image cannot be blank!!" }
  ),
});
export const Third = () => {
  const { data, setData, setStep } = useContext(StepContext);
  useEffect(() => {
    const saved = localStorage.getItem("Third");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed.dateBirth) {
        parsed.dateBirth = new Date(parsed.dateBirth);
      }

      form.reset(parsed);
      setPrevs(parsed.profile);
    }
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateBirth: data.dateBirth,
      profile: data.profile,
    },
  });
  const current = form.watch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setStep(4);
    localStorage.removeItem("First");
    localStorage.removeItem("Second");
    localStorage.removeItem("Third");
    setData((prev) => ({
      ...prev,
      dateBirth: values.dateBirth,
      profile: values.profile,
    }));
  }
  const [open, setOpen] = useState<boolean>(false);
  const [prevs, setPrevs] = useState<string>(data.profile);
  return (
    <div className="w-[480px] h-[655px] bg-white rounded-xl p-8 flex flex-col gap-7">
      <Header />
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
                          {!isNaN(field.value?.getTime())
                            ? field.value.toLocaleDateString()
                            : "--/--/--"}
                          <CiCalendar />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
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
                      {prevs ? (
                        <>
                          <img
                            src={prevs}
                            className="absolute w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            className="absolute top-2.5 right-2.5 rounded-full w-6 h-6 bg-black p-0 flex justify-center items-center"
                            onClick={() => {
                              setPrevs("");
                            }}
                          >
                            <X className="text-white" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="w-7 h-7 bg-white rounded-full flex justify-center items-center">
                            <MdOutlineImage className="max-w-3 max-h-3" />
                          </div>
                          <h1 className="text-[14px] font-semibold z-10">
                            Add image
                          </h1>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              field.onChange(() => {
                                URL.createObjectURL(file);
                              });
                              setPrevs(URL.createObjectURL(file));
                              console.log(URL.createObjectURL(file));
                            }}
                            className="w-full h-full opacity-0 absolute"
                          />
                        </>
                      )}
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
                setStep(2);
                console.log(current);
                localStorage.setItem(
                  "Third",
                  JSON.stringify({ ...current, profile: prevs })
                );
                setData((prev) => ({
                  ...prev,
                  dateBirth: current.dateBirth,
                  profile: prevs,
                }));
                console.log(data);
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
  );
};
