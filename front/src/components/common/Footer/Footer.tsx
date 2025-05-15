
'use client'
import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-200 via-purple-200 to-white py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shadow-md">
            K
          </div>
          <div>
            <h1 className="text-xl font-semibold text-purple-800">Kelwin de Souza</h1>
            <p className="text-sm text-blue-800">
              This is a challenge by Coodesh
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
