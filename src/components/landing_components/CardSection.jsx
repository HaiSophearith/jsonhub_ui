// import React from 'react'
import icon1 from "../../asset/icon/Vector1.png";
import icon2 from "../../asset/icon/Vector2.png";
import icon3 from "../../asset/icon/Vector3.png";
import icon4 from "../../asset/img/Vector5.svg";
import icon5 from "../../asset/img/Vector6.svg";
import icon6 from "../../asset/img/victor7.svg";
import developer_friendly from "../../asset/icon/developer-mode-outline (1).svg";
import React, { useEffect, react } from "react";

import AOS from "aos";

import "aos/dist/aos.css";

export default function CardSection() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex flow-cow justify-items-center items-center bg-bg-project">
      <div className="mt-10 flex justify-center 12pro:px-14 laptop:px-32">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10">
          {/* card 1 */}
          <div
            className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700
            "
          >
            <div>
              <h5 className="mb-2 text-2xl font-semibold font-poppins tracking-tight text-dark-head dark:text-white">
                API mocking that saves you time
              </h5>
              <p className="mb-3 font-normal font-montserrat text-dark-head dark:text-gray-400 line-clamp-3">
                Get working mock REST APIs in seconds with an intuitive and
                easy-to-use interface.Run them everywhere with the CLI.
              </p>
            </div>
            <img src={icon4} alt="vector1" className="ml-6 mr-5" />
          </div>

          {/* card 2 */}
          <div
            className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <h5 className="mb-2 text-2xl font-poppins font-semibold tracking-tight text-dark-head dark:text-white">
                Integrates with your workflow
              </h5>
              <p className="mb-3 font-montserrat font-normal text-dark-head dark:text-gray-400 line-clamp-3">
                Compatible with the OpenAPI specification, Mockoon integrates
                perfectly with your existing applications and API design
                workflow.
              </p>
            </div>
            <img src={icon5} alt="vector1" className="h-24 ml-6" />
          </div>

          {/* card 3 */}
          <div
            className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <h5 className="mb-2 text-2xl font-poppins font-semibold tracking-tight text-dark-head dark:text-white">
                Complete tooling
              </h5>
              <p className="mb-3 font-normal font-montserrat text-dark-head dark:text-gray-400 line-clamp-3">
                Go beyond mocking with advanced features and tackle the most
                complex situation with HTTP requests recording, proxying,
                integration testing, etc.
              </p>
            </div>
            <img src={icon6} alt="vector1" className="w-32 h-28 ml-6 mt-3" />
          </div>

          {/* card 4 */}
          <div
            className="p-8 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <h5 className="mb-2 text-2xl font-poppins font-semibold tracking-tight text-dark-head dark:text-white">
                Developer Friendly
              </h5>
              <p className="mb-3 font-normal font-montserrat text-dark-head dark:text-gray-400 line-clamp-3">
                Mocky is compatible with JS, Mobile and Server applications,
                featuring CORS, JSONP and GZIP responses.No authentication, just
                call it!
              </p>
            </div>
            <img src={developer_friendly} alt="vector1" className="w-32 h-28 ml-6 mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
