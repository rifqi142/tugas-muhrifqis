"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  bname: z
    .string()
    .min(1, { message: "Booking name is required" })
    .max(100, { message: "Booking name must be less than 100 characters" }),
  bphone: z.string().regex(/^[0-9]{10,15}$/, {
    message: "Phone number must be between 10 to 15 digits",
  }),
  bdate: z.date({
    required_error: "Booking date is required",
    invalid_type_error: "Invalid date format",
  }),
  btime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format",
  }),
});

const Home = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bname: "",
      bphone: "",
      bdate: undefined,
      btime: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const [hours, minutes] = data.btime.split(":").map(Number);
      const selectedDate = new Date(data.bdate);
      selectedDate.setHours(hours, minutes, 0, 0);

      const response = await axios.post("/api/booking", {
        ...data,
        bdate: selectedDate,
      });

      toast.success("Booking successful");
      console.log(response.data);
      form.reset();
      window.location.assign("/");
    } catch (error) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset({
      bname: "",
      bphone: "",
      bdate: undefined,
      btime: "",
    });
    toast.error("Booking cancelled");
  };

  return (
    <section
      className="w-full flex flex-col-reverse mx-auto px-6 lg:px-20 3xl:px-0 gap-5 py-10 pb-10 xl:pb-32 xl:gap-20 lg:py-20 xl:flex-row mt-16"
      id="home"
    >
      <div className="flex-1">
        <h2 className="text-3xl md:text-6xl leading-tight xl:leading-snug font-bold ">
          A Smooth <span className="text-blue-30">Salon</span>
          <br />
          Experience in
          <br />
          Your Town.
        </h2>
        <p className="text-base xl:text-lg text-muted-foreground mt-4">
          Beauty and Elegance Redefined: Where Every Cut Tells a Story, and
          Every Style is a Work of Art.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-sm xl:text-lg px-4 py-2 xl:px-8 xl:py-6 mt-5 xl:mt-8 bg-blue-30 font-bold">
              Appointment Now
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Appointment Now</DialogTitle>
              <DialogDescription>
                Book an appointment with us and get the best service in town.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                <FormField
                  control={form.control}
                  name="bname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your booking name"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bphone"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your phone number"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bdate"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                (document.activeElement as HTMLElement)?.blur();
                              }}
                              initialFocus
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
                  name="btime"
                  render={({ field }) => (
                    <FormItem className="mt-3 flex flex-col">
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <ClockIcon className="mr-2 h-4 w-4" />
                              {field.value ? field.value : "Pick a time"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="flex flex-col items-center">
                              <input
                                type="time"
                                className="w-full p-2"
                                onChange={(e) => {
                                  field.onChange(e.target.value);
                                  (
                                    document.activeElement as HTMLElement
                                  )?.blur();
                                }}
                                value={field.value || ""}
                                required
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-10">
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Booking..." : "Book Now"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 ml-40">
        <Image
          src="/assets/barber-person.png"
          alt="barber"
          width={350}
          height={300}
          className="w-max mx-auto bg-blue-20"
        />
      </div>
    </section>
  );
};

export default Home;
