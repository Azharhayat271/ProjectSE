import React from "react";
import { motion } from "framer-motion";
import Topbar from "./topbar";
import SVG from "./../../assets/bg.svg";
import wave from "/wave.svg";

const Home = () => {
  const projectsData = [
    {
      title: "Project Exibition",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      color: "bg-red-500",
    },
    {
      title: "FYPs",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      color: "bg-yellow-500",
    },
    {
      title: "Models",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      color: "bg-green-500",
    },
    {
      title: "Stalls",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
      color: "bg-blue-500",
    },
    {
      title: "Art",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
      color: "bg-indigo-500",
    },
    {
      title: "Paintings",
      description:
        "Fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      color: "bg-purple-500",
    },
  ];
  return (
    <div
      className="bgspecial"
      style={{
        backgroundImage: `url(${wave})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Topbar />

      <div className="flex flex-col items-center justify-center h-screen   mt-[-100px]">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl mb-20 font-semibold text-gray-700 hover:transform hover:-translate-y-2"
        >
          Science Mela UET Narowal
        </motion.h1>
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
      <div className="container mx-auto  mt-[-150px]">
        <h1 className="text-4xl font-semibold text-gray-700 mb-10">
          About
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${project.color} text-white`}
            >
              <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
