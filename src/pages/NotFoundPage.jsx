import React from "react";
import notfound from "../asset/img/404.jpg";
import notfound1 from "../asset/img/4004.jpg";

export default function NotFoundPage() {
  return (
    <div>
      <div className="flex  justify-center">
        <div className=" w-128 h-128 laptop:w-[900px] laptop:mt-20 12pro:w-[300px] 12pro:mt-40 ipad-pro:w-[750px]">
          <img className="" src={notfound1} alt="" />
        </div>
      </div>
    </div>
  );
}
