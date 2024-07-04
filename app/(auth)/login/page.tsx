import AuthForm from "@/components/auth-form";
import Navbar from "@/components/navbar";
import React from "react";

const SignUp = () => {
  return (
    <>
      <Navbar />
      <section className="flex items-center justify-center size-full max-sm:px-6">
        <AuthForm type="sign-in" />
      </section>
    </>
  );
};

export default SignUp;
