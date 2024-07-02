import { OUR_SERVICES } from "@/constant";
import Image from "next/image";
import React from "react";

const OurService = () => {
  return (
    <section className="w-full py-10" id="service">
      <div className="flex flex-col items-center justify-center font-bold">
        <h2 className="text-2xl xl:text-4xl">What we provide to</h2>
        <h3 className="text-xl xl:text-4xl text-yellow-90">our customer</h3>
      </div>

      <div className="flex-none md:flex items-center justify-center gap-5 xl:gap-36 xl:mt-20 px-20 xl:px-52">
        {OUR_SERVICES.map((service) => (
          <div key={service.key} className="flex flex-col items-center">
            <Image
              src={service.image}
              alt={service.key}
              width={100}
              height={100}
              className="mt-10 xl:mt-0 mx-auto"
            />
            <h2 className="mt-2 xl:mt-5 bold-18">{service.label}</h2>
            <p className="mt-2 text-center regular-16 text-blue-40">
              {service.description}
            </p>
            <p className="mt-2 xl:mt-5 text-center bold-32 text-yellow-90">
              {service.price}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurService;
