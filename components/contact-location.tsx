import React from "react";
import { MapPin, PhoneCall } from "lucide-react";
import { Separator } from "./ui/separator";

const ContactLocation = () => {
  return (
    <section className="w-full bg-blue-90 py-10" id="location">
      <div className="flex flex-col items-center justify-center font-bold">
        <h2 className="text-white text-2xl xl:text-4xl">Our Location</h2>
        <h3 className="text-xl xl:text-4xl text-yellow-90">Find us here</h3>
      </div>

      <div className="flex flex-col lg:flex-row mt-14 px-10 xl:px-20 gap-3">
        <div className="text-white flex-1">
          <h2 className="text-2xl xl:text-4xl font-bold uppercase">
            Service Beyond
            <br />
            Expectation
          </h2>
          <p className="regular-14 mt-2 xl:mt-10 text-justify">
            Our salon is the territory created purely for people who appreciate
            premium quality, time and flawless look. We&apos;ll help you to look
            stylish and confident in the most discreet way.
          </p>
        </div>
        <div className="flex-none lg:flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5576.191192569518!2d115.2023840664744!3d-8.789583484446254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2430043a84133%3A0xf8daff8bcd227192!2sSEA%20Salon%20Spa%20%26%20Studio!5e0!3m2!1sid!2sid!4v1719848489431!5m2!1sid!2sid"
            width="300"
            height="300"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mx-auto mt-5 xl:mt-0 mb-3 xl:mb-0"
          ></iframe>
        </div>
        <div className="flex-1 text-white">
          <div className="flex flex-row gap-10">
            <MapPin size={54} className="text-white mt-3" />
            <div>
              <h2 className="bold-16">Location</h2>
              <p className="regular-14 mt-2">
                Jl. Taman Kebo Iwa, Benoa, Kecamatan Kuta Selatan, Kabupaten
                Badung, Bali 80361
              </p>
            </div>
          </div>
          <Separator className="bg-yellow-90 mt-5 xl:mt-12" />
          <div className="flex flex-row gap-10 mt-5 xl:mt-10">
            <PhoneCall size={32} className="text-white mt-5" />
            <div>
              <h2 className="bold-16">Contact us</h2>
              <p className="regular-14 mt-2">Thomas - 08123456789</p>
              <p className="regular-14 mt-2">Sekar - 08164829372</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactLocation;
