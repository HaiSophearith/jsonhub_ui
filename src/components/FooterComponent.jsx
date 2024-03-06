// import React from "react";
// import logo from "../asset/img/jsonhub_footer.png";
// export default function FooterComponent() {
//   return (
//     <div className="">
//       <footer className="   bg-bg-footer  ">
//         <div className= " fixed bottom-0  container mx-auto w-full bg-gray">
//           <div className="ipad-pro:flex ipad-pro:items-center ipad-pro:justify-between ">
//             <a href=" " className="flex items-center  ">
//               <img
//                 src={logo}
//                 className=" laptop:w-[80%] ipad-pro:w-[80%] 12pro:pl-12 ipad-pro:pl-0 12pro:w-fit "
//                 alt=""
//               />
//             </a>
//             <ul className="flex flex-row  justify-center  items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
//               <li className=" list-none text-dark-head">
//                 <a
//                   href="termandcondition.html" 
//                   target="_blank"
//                   className=" 12pro:text-12pro  ipad-pro:text-sm ipad-pro:capitalize laptop:text-lg laptop:capitalize hover:underline md:mr-6 "
//                 >
//                   Term and condition
//                 </a>
//               </li> 
//               <li className=" list-none text-dark-head">
//                 <a
//                   href="privacy_policy.html" 
//                   target="_blank"
//                   className=" 12pro:text-12pro laptop:text-lg ipad-pro:text-sm laptop:capitalize  hover:underline md:mr-6 "
//                 >
//                   Privacy Policy
//                 </a>
//               </li>
//               <li className=" list-none text-dark-head">
//                 <a
//                   href="mailto:jsonhub.info@gmail.com"
//                   className=" 12pro:text-12pro laptop:text-lg ipad-pro:text-sm laptop:capitalize   hover:underline md:mr-6 "
//                 >
//                   Contact Us
//                 </a>
//               </li>
//             </ul>
//             <span className=" text-dark-head flex flex-row justify-center item-center pt-5 12pro:pb-5 laptop:pb-0 ipad-pro:pb-0 12pro:text-12pro 12pro:capitalize   ipad-pro:items-center ipad-pro:text-sm ipad-pro:capitalize 12pro:-mt-5 laptop:text-lg laptop:capitalize text-sm text-gray-500 sm:text-center dark:text-gray-400">
//               copyright © 2021-2023 mockend. all rights reserved.
//             </span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React from "react";
import logo from "../asset/img/jsonhub_footer.png";
export default function FooterComponent() {
  return (
    <div>
      <footer className=" bg-bg-footer laptop:px-32 ipad-pro:px-24 12pro:px-8">
        <div className="w-full bg-gray">
          <div className="ipad-pro:flex ipad-pro:items-center ipad-pro:justify-between ">
            <a href=" " className="flex items-center  ">
              <img
                src={logo}
                className=" laptop:w-[80%] ipad-pro:w-[80%] 12pro:pl-12 ipad-pro:pl-0 12pro:w-fit "
                alt=""
              />
            </a>
            <ul className="flex flex-row  justify-center  items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li className=" list-none text-dark-head">
                <a
                  href="termandcondition.html" 
                  target="_blank"
                  className=" 12pro:text-12pro  ipad-pro:text-sm ipad-pro:capitalize laptop:text-lg laptop:capitalize hover:underline md:mr-6 "
                >
                  Term and condition
                </a>
              </li>
              <li className=" list-none text-dark-head">
                <a
                  href="privacy_policy.html" 
                  target="_blank"
                  className=" 12pro:text-12pro laptop:text-lg ipad-pro:text-sm laptop:capitalize  hover:underline md:mr-6 "
                >
                  Privacy Policy
                </a>
              </li>
              <li className=" list-none text-dark-head">
                <a
                  href="mailto:jsonhub.info@gmail.com"
                  className=" 12pro:text-12pro laptop:text-lg ipad-pro:text-sm laptop:capitalize   hover:underline md:mr-6 "
                >
                  Contact Us
                </a>
              </li>
            </ul>
            <span className=" text-dark-head flex flex-row justify-center item-center pt-5 12pro:pb-5 laptop:pb-0 ipad-pro:pb-0 12pro:text-12pro 12pro:capitalize   ipad-pro:items-center ipad-pro:text-sm ipad-pro:capitalize 12pro:-mt-5 laptop:text-lg laptop:capitalize text-sm text-gray-500 sm:text-center dark:text-gray-400">
              copyright © 2021-2023 mockend. all rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

