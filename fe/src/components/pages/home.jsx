import React from "react";
import Topbar from "./topbar";
import SVG from "./../../assets/bg.svg";
const home = () => {
  return (
    <div>
      <Topbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <img src={SVG} alt="logo" className="h-96" />
          <h1 className="text-4xl font-semibold text-gray-700">
            Science Mela UET Narowal
          </h1>
        </div>
        <section className="w-full mt-8">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold text-gray-700">
              About Science Mela
            </h1>
            <p className="text-lg text-gray-700">
              Science Mela is a science exhibition organized by UET Narowal
              Campus. The purpose of this exhibition is to promote science and
              technology in the region.
            </p>
          </div>
          </section>
          </div>
    </div>
  );
};

export default home;
