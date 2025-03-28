import React from "react";
import FloatingParticle from "./FloatingParticle";
import { BookOpenIcon } from "@heroicons/react/16/solid";
import { li } from "framer-motion/client";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to bg-gray-900/95 backdrop-blur-2xl border-t border-t-gray-400">
      <FloatingParticle />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex justify-center sm:justify-start items-center space-x-2">
            <BookOpenIcon className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              BOOK SHOW
            </span>
            <p className="text-gray-400 text-sm">
              There are No limits for you Knowledge...
            </p>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Explore
            </h3>
            <ul className="space-y-3">
              {["Trending", "New Releases", "Genres", "Authors"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors flex items-center justify-center sm:justify-start group">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Powered By
            </h3>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {["React", "Tailwind", "Vite", "API"].map((tech) => (
                <span
                  className="px-3 py-1.5 cursor-pointer rounded-full bg-gray-800/50 text-gray-300 text-sm backdrop-blur-sm hover:bg-cyan-400/10 hover:text-cyan-300 transition-all"
                  key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
