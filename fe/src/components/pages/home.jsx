import React from "react";
import { motion } from "framer-motion";
import Topbar from "./topbar";
import SVG from "./../../assets/bg.svg";
import wave from "/wave.svg";


const Home = () => {
  return (
    <div className="bgspecial"   style={{
      backgroundImage: `url(${wave})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      

  }}>
      <Topbar />
      <div className="flex flex-col items-center justify-center h-screen">
      <img src={SVG} alt="logo" className="h-96" />

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Using an online SVG icon */}
          <svg
            className="h-16 w-16 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
          <h1 className="text-4xl font-semibold text-gray-700">
            Science Mela UET Narowal
          </h1>
        </motion.div>
        <section className="w-full mt-8">
          <div className="flex flex-col items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-semibold text-gray-700"
            >
              About Science Mela
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg text-gray-700"
            >
              Science Mela is a science exhibition organized by UET Narowal
              Campus. The purpose of this exhibition is to promote science and
              technology in the region.
            </motion.p>
          </div>
        </section>
      </div>
      {/* Using an online SVG pattern */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32"
        style={{
          backgroundImage: "url('https://www.heropatterns.com/svg/argyle.svg')",
        }}
      ></div>
    </div>
  );
};

export default Home;
