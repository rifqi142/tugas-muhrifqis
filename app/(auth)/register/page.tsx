import AuthForm from "@/components/auth-form";
import Navbar from "@/components/navbar";
import React from "react";

const SignIn = () => {
  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center size-full max-sm:px-6 mt-5 xl:mt-0">
        <AuthForm type="sign-up" />
      </section>
    </>
  );
};

export default SignIn;
