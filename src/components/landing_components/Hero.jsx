import hero_icon from "../../asset/img/hero_icon.png";
import React, { useEffect } from "react";
import bro1 from "../../asset/img/bro.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, NavLink } from "react-router-dom";

export default function Hero() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="">
      <div className="hero-bg ">
        {/* <div className="overlay-bg px-32"></div> */}
        <div className="flex justify-between laptop:px-32 ipad-pro:px-24 12pro:px-8">
          <div className="lg:w-[40%] mt-32 font-poppins">
            <span
              data-aos="fade-up"
              data-aos-duration="3000"
              className="text-dark-head font-bold leading-normal 12pro:text-2xl ipad-pro:text-3xl text-4xl"
            >
              Testing your application with free mocking API
            </span>
            <p
              data-aos="fade-up"
              data-aos-duration="3000"
              className="text-dark-head mt-8 font-montserrat"
            >
              Don't wait for the backend to be ready, generate custom API
              responses with Mocky and start working on your application
              straightaway
            </p>
            <NavLink to={"/manage-Project"}>
              <button
                type="button"
                className="btn border-none	 bg-newYellow text-black px-8 mt-8 capitalize hover:bg-dark-head hover:text-white"
              >
                Go to projects
              </button>
            </NavLink>
          </div>
          <div>
            <img
              className="z-10 w-[680px] h-[530px] 12pro:hidden ipad-pro:block"
              src={bro1}
              data-aos="fade-down"
              data-aos-duration="1500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
