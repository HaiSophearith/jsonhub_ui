import can_do from "../../asset/img/can_do.png";
import beta from "../../asset/img/beta.png";
import roadmap from "../../asset/img/roadmap.png";
import React, { useEffect } from "react";
import new1 from "../../asset/img/hi5.svg";
import new2 from "../../asset/img/hi6.svg";
import new3 from "../../asset/img/hi7.svg";
import new4 from "../../asset/img/ab1.svg";
import new5 from "../../asset/img/ab2.svg";
import new6 from "../../asset/img/ab3.svg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Body() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className=" flex justify-center bg-white">
      <div className=" rounded-lg  laptop:w-10/12 ipad-pro:w-full 12pro:w-10/12 mt-10 justify-center">
        <div
          id="main"
          class=" grid  laptop:grid-cols-3 ipad-pro:grid-cols-3  laptop:gap-1 ipad-pro:gap-1 12pro:grid-cols-1  justify-evenly"
        >
          {/* img */}
          <div
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            class="   laptop:h-full laptop:ml-auto 12pro:ml-auto 12pro:mr-auto  laptop:order-1 ipad-pro:order-1 12pro:order-1"
          >
            <img
              src={new4}
              className="laptop:w-[380px] ipad-pro:w-[280px] 12pro:w-[200px] "
            />
          </div>
          {/* text */}
          <div
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            class="  laptop:col-span-2  laptop:h-full laptop:flex laptop:mt-16 ipad-pro:col-span-2 ipad-pro:flex ipad-pro:mt-14  laptop:order-2 ipad-pro:order-2 12pro:order-2"
          >
            <div>
              <h1
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                className="  laptop:text-xl text-dark-head ipad-pro:text-lg font-bold font-poppins 12pro:text-center 12pro:mt-4"
              >
                What can Jsonhub do ?
              </h1>
            </div>
            <div
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              className="  bg-newYellow  laptop:w-1 laptop:h-32 laptop:ml-5 laptop:mt-4 ipad-pro:w-1 ipad-pro:h-24 ipad-pro:ml-5 ipad-pro:mt-2"
            ></div>
            <div
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              className="  font-poppins text-dark-head laptop:ml-4 laptop:text-lg ipad-pro:ml-4 ipad-pro:text-sm 12pro:text-xs 12pro:mt-2"
            >
              <ul className=" list-outside text-dark-head 12pro:ml-4">
                <li>
                  User can create and invite other users to join the project
                </li>
                <li>
                  User can set their project to be either public or private
                </li>
                <li>Endpoints can be protected with API Keys or JWT</li>
                <li>We use C2C business model</li>
              </ul>

              <b>No registration. &nbsp;</b>
              <p className=" inline-block">Nothing to install</p>
            </div>
          </div>
          {/* blog data */}
          <div
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            class=" text-dark-head laptop:col-span-2 ipad-pro:col-span-2  laptop:flex  laptop:h-full laptop:justify-end laptop:ml-96 laptop:mt-16 ipad-pro:h-full ipad-pro:flex ipad-pro:justify-end ipad-pro:ml-60 ipad-pro:mt-14  laptop:order-3 ipad-pro:order-3 12pro:order-4"
          >
            <div className="text-dark-head">
              <h1
                data-aos="fade-left"
                data-aos-easing="ease-in-sine"
                className=" text-dark-head  laptop:text-xl ipad-pro:text-lg font-bold font-poppins 12pro:mt-4 text-center"
              >
                Beta
              </h1>
            </div>
            <div
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              className="  bg-newYellow  laptop:w-1 laptop:h-44 laptop:ml-5 laptop:mt-4 laptop:p-0.5 ipad-pro:w-1 ipad-pro:h-28 ipad-pro:ml-5 ipad-pro:mt-3 ipad-pro:p-0.5"
            ></div>
            <div
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              className=" font-poppins laptop:ml-4 laptop:text-lg ipad-pro:ml-4  ipad-pro:text-sm 12pro:mt-2 12pro:text-xs"
            >
              <p className="text-dark-head">
                For the moment, the project is in beta which means many things
                may change or break:
              </p>
              <li className="text-dark-head">URLs may change</li>
              <li className="text-dark-head">Service may be down</li>
              <li className="text-dark-head">
                Authentication may be added later
              </li>
              <li className="text-dark-head">etc...</li>
            </div>
          </div>
          {/* img */}
          <div
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            class="laptop:h-full  12pro:ml-auto 12pro:mr-auto  laptop:order-4 ipad-pro:order-4 12pro:order-3"
          >
            <img
              src={new5}
              className=" laptop:w-[380px] ipad-pro:w-[280px] 12pro:w-[200px] "
            />
          </div>

          {/* img3 */}
          <div
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            class=" laptop:h-full laptop:ml-auto  12pro:ml-auto 12pro:mr-auto  laptop:order-5 ipad-pro:order-5 12pro:order-5"
          >
            <img
              src={new6}
              className="  laptop:w-[380px] ipad-pro:w-[280px] 12pro:w-[200px] "
            />
          </div>
          {/* read map */}
          <div
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            class=" laptop:col-span-2 laptop:h-full laptop:mt-16 ipad-pro:col-span-2 ipad-pro:flex ipad-pro:h-full ipad-pro:mt-14 12pro:flex-none  laptop:order-6 ipad-pro:order-6 12pro:order-6"
          >
            <div>
              <h1 className=" text-dark-head laptop:text-xl ipad-pro:text-lg font-bold font-poppins 12pro:text-center 12pro:mt-3">
                Roadmap
              </h1>
            </div>
            <div className="  bg-newYellow   laptop:w-1 laptop:h-32 laptop:ml-5 laptop:mt-3 laptop:p-0.5 ipad-pro:w-1 ipad-pro:h-24 ipad-pro:ml-4 ipad-pro:mt-1 ipad-pro:p-0.5"></div>
            <div className="  font-poppins  laptop:ml-4 laptop:text-lg laptop:w-96 ipad-pro:ml-4 ipad-pro:text-sm ipad-pro:w-80 12pro:mt-1 12pro:text-xs">
              <p className="text-dark-head inline-block">
                I hope to be able to support developer sessions for predefined
                and user-defined mocks. To be notified of updates, you can
                follow me on Facebook Page{" "}
              </p>
              <a
                href="https://www.facebook.com/profile.php?id=100093386327280&mibextid=LQQJ4d"
                className=" inline-block text-blue-500"
              >http://jsonhub.com/</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
