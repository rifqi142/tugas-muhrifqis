import AboutUs from "@/components/about-us";
import ContactLocation from "@/components/contact-location";
import Footer from "@/components/footer";
import Home from "@/components/home";
import Navbar from "@/components/navbar";
import OurService from "@/components/our-service";
import Review from "@/components/review";
import React from "react";

const Page = () => {
  return (
    <>
      <Navbar />
      <Home />
      <AboutUs />
      <OurService />
      <Review />
      <ContactLocation />
      <Footer />
    </>
  );
};

export default Page;
