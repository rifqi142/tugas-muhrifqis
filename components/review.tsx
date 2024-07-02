"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Separator } from "./ui/separator";

import { Button } from "./ui/button";
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
import ListReview from "./list-review";

const formSchema = z.object({
  cname: z.string().min(3).max(50),
  crating: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().min(1).max(5)
  ),
  ccomment: z.string().min(10).max(1000),
});

interface Review {
  id: string;
  cname: string;
  crating: number;
  ccomment: string;
}

const Review = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cname: "",
      ccomment: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/review", data);
      toast.success("Review added successfully");
      form.reset();
      window.location.assign("/");
    } catch (error) {
      toast.error("Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset({
      cname: "",
      ccomment: "",
    });
    toast.error("Review cancelled");
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/review");
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section className="w-full py-10" id="review">
      <div className="flex flex-col items-center justify-center font-bold">
        <div>
          <h2 className="text-2xl xl:text-4xl">What our customer are saying</h2>
          <Separator className="bg-yellow-90 mt-2" />
        </div>
      </div>
      <div className="px-10 mt-10 flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Leave a review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leave a review</DialogTitle>
              <DialogDescription>
                Share your experience with us
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="cname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
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
                  name="crating"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Give a rating from 1 to 5"
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
                  name="ccomment"
                  render={({ field }) => (
                    <FormItem className="mt-3">
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Give a review here"
                          {...field}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter className="mt-5">
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
                    Add Review
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* LIST REVIEW */}
      <div className="flex flex-row gap-3 flex-wrap justify-center py-10">
        {reviews.length === 0 ? (
          <h2 className="text-3xl">
            No Reviews yet. Please leave a review to improve our services
          </h2>
        ) : (
          reviews.map((review) => (
            <ListReview
              key={review.id}
              cname={review.cname}
              crating={review.crating}
              ccomment={review.ccomment}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Review;
