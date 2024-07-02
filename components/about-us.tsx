import Image from "next/image";
import React from "react";
import { Separator } from "./ui/separator";

const AboutUs = () => {
  return (
    <section
      className="w-full bg-blue-90 text-white px-10 xl:px-60 py-10"
      id="about"
    >
      <div className="mt-0 xl:mt-5 flex flex-col xl:flex-row">
        <div className="basis-1/2">
          <h3 className="text-3xl xl:text-5xl font-bold leading-normal">
            We are <span className="text-yellow-90">15 years</span> of <br />
            Experience
          </h3>
          <p className="regular-16 text-justify mt-5 leading-normal">
            Barbers have many duties like cutting hair, facials, shampooing
            hair, disinfecting tools and fitting hairpieces. Barbershops play a
            significant role in many communities within their walls.
          </p>
          <p className="regular-16 text-justify mt-5 leading-normal">
            People from all walks of life are able to join together and enjoy
            open dialogue. Barbershops are a place where people can come and
            feel comfortable and free to be themselves.
          </p>
          <Separator className="my-4 bg-yellow-90" />
        </div>
        <div className="basis-1/2 ml-0 xl:ml-20 flex items-center justify-center">
          <Image
            src="/assets/barber-about.png"
            alt="barber shop"
            width={300}
            height={300}
            className="object-cover rounded-full mx-48 xl:mx-0"
          />
        </div>
      </div>
      <p className="mt-5 xl:mt-3 text-justify leading-normal">
        Founded with a passion for precision and a love for the art of
        barbering, SEA Salon has become a haven for those who appreciate the
        finer things in life. We believe that a great haircut is more than just
        a trim; it&apos;s an experience that combines skill, creativity, and a
        personal touch.
      </p>
    </section>
  );
};

export default AboutUs;
