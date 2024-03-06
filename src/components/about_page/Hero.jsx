import hero_icon from "../../asset/img/about_us.png";
import "../../style/landing_style.css";
import new1 from "../../asset/img/about2.svg"
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, react } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  const navigate = useNavigate();
  const toGoProject = () => {
    navigate("/project");
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="hero-bg pt-16">
        <div className="flex flex-row justify-center items-center gap-10  px-32 laptop:px-32 ipad-pro:px-24 12pro:px-8">
          {/* left */}
          <div className=" font-poppins w-1/2">
            {/*  */}
            <div className="">
              <h1 className="tracking-[8px] text-dark-head laptop:text-xl ipad-pro:text-xs 12pro:text-xs  font-bold font-poppins ">
                ABOUT US
              </h1>
            </div>
            {/*  */}
            <div>
              <h1 className="text-dark-head text-4xl laptop:text-3xl mt-8 ipad-pro::text-xl ipad-pro:mb-3 font-bold 12pro:text-base leading-normal font-poppins">
                Helping all developers succeed through the new have been build
                up by JsonHub team.
              </h1>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="12pro:justify-center"
            >
              <p
                className="text-dark-head text-sm font-montserrat 
               laptop:line-clamp-none overflow-y-auto will-change-scroll laptop:font-montserrat mt-8"
              >
                Our purpose of this project is to allow developers to iterate
                more quickly. They no longer need to rely on development
                resources to be up and running, as they can just spin up their
                own mocks. This is a great aid in making developers more
                independent in their work, as they don’t have to rely on anyone
                else managing a development or staging environment.
              </p>
            </div>
            <Link
              to={"/manage-project"}
              type="button"
              className="font-montserrat btn bg-newYellow text-black border-none hover:bg-dark-head hover:text-white px-8 mt-8 capitalize 12pro:px-8 12pro:text-xs 12pro:mb-3 "
            >
              Go to projects
            </Link>
          </div>
          {/* right */}
          <div
            className="w-1/2 "
            data-aos=" fade-down"
            data-aos-duration="2000"
          >
            <div className=" w-full h-full">
              <img
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000"
                src={new1}
                className="w-full h-full laptop:w-full 12pro:hidden ipad-pro:block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
