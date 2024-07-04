"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { authFormSchema } from "@/libs/utils";
import CustomInput from "./custom-input";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if (type === "sign-up") {
        const res = await axios.post(`/api/user/${type}`, data);
        setUser(res.data);
        console.log(res.data);
        toast.success("Account created successfully");
        window.location.assign("/login");
      }

      if (type === "sign-in") {
        const res = await axios.post(`/api/user/${type}`, data);
        setUser(res.data);
        toast.success("Sign In successfully");
        window.location.assign("/dashboard/customer");
      }
    } catch (error) {
      if (type === "sign-up") {
        toast.error("Account creation failed");
      }

      if (type === "sign-in") {
        toast.error("Sign In failed email or password incorrect");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer items-center gap-1">
          <h1 className="bold-26 lg:bold-32 text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}

            <p className="regular-16 text-gray-600">
              {user
                ? "Link your account to continue"
                : "Enter your details to get started"}
            </p>
          </h1>
        </Link>
      </header>
      <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {type === "sign-up" && (
              <>
                <CustomInput
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder={"Enter your full name"}
                />

                <CustomInput
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  placeholder={"Enter your phone number"}
                />
              </>
            )}

            <CustomInput
              control={form.control}
              name="email"
              label="Email"
              placeholder={"Enter your email"}
            />

            <CustomInput
              control={form.control}
              name="password"
              label="Password"
              placeholder={"Enter your password"}
              autoComplete="off"
            />

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="form-btn bg-blue-40"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading ...
                  </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <footer className="flex justify-center gap-1">
          <p className="text-14 font-normal text-gray-600">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "sign-in" ? "/register" : "/login"}
            className="form-link text-blue-500"
          >
            {type === "sign-in" ? "Register Here" : "Login Here"}
          </Link>
        </footer>
      </>
    </section>
  );
};

export default AuthForm;
