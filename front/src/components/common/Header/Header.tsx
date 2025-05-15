"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { getUser, logout, nameIcon } from "@/helper";
import { AuthResp } from "@/services";

const UserAvatar = ({ name }: { name?: string }) => (
  <div
    aria-label={`User initials for ${name}`}
    className="w-9 h-9 rounded-full bg-purple-300 text-purple-900 font-bold text-lg flex justify-center items-center shadow-md hover:bg-purple-400 hover:text-purple-800 transition-colors"
  >
    {nameIcon(name)}
  </div>
);

const UserDetails = ({
  name,
  email,
  onLogout,
}: {
  name?: string;
  email?: string;
  onLogout: () => void;
}) => (
  <motion.div
    className="absolute top-12 right-0 w-56 bg-white rounded-lg shadow-lg text-gray-800 p-4 flex flex-col gap-3 z-20"
    role="menu"
    aria-label="User info"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={{
      hidden: { opacity: 0, y: -10, pointerEvents: "none" },
      visible: { opacity: 1, y: 0, pointerEvents: "auto" },
      exit: { opacity: 0, y: -10, pointerEvents: "none" },
    }}
    transition={{ duration: 0.2 }}
  >
    <UserInfo label="Name" value={name} />
    <UserInfo label="Email" value={email} />
    <button
      onClick={onLogout}
      className="self-start bg-purple-600 text-white px-3 py-1 rounded-md font-semibold text-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition"
    >
      Logout
    </button>
  </motion.div>
);

const UserInfo = ({ label, value }: { label: string; value?: string }) => (
  <p className="text-sm font-semibold text-indigo-700">
    {label}: <span className="font-normal text-gray-900">{value}</span>
  </p>
);

const MobileMenu = ({
  name,
  email,
  onLogout,
}: {
  name?: string;
  email?: string;
  onLogout: () => void;
}) => (
  <motion.div
    className="absolute top-16 left-0 right-0 bg-white text-gray-900 px-4 py-3 md:hidden z-20 shadow-md"
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="font-semibold text-sm">{name}</span>
      <UserAvatar name={name} />
    </div>
    <p className="text-sm mb-1">Email: {email}</p>
    <button
      onClick={onLogout}
      className="w-full bg-purple-600 text-white px-3 py-2 rounded-md font-semibold text-sm hover:bg-purple-700 transition"
    >
      Logout
    </button>
  </motion.div>
);

export const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<AuthResp | null>(null);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleLogout = () => logout(false);
  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <div className="flex justify-between items-center px-4 md:px-6 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-sans relative z-30">
      <div
        className="font-bold text-base md:text-lg select-none"
        aria-label="Logo"
      >
        Free Dictionary
      </div>

      {/* Botão mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          aria-label="Abrir menu"
          className="text-white text-xl"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className="hidden md:flex relative items-center gap-3 cursor-pointer select-none"
        onClick={toggleUserMenu}
        ref={userMenuRef}
        role="button"
        aria-haspopup="true"
        aria-expanded={isUserMenuOpen}
        tabIndex={0}
      >
        <span className="font-semibold text-sm md:text-base">{user?.name}</span>
        <UserAvatar name={user?.name} />
        <AnimatePresence>
          {isUserMenuOpen && (
            <UserDetails
              name={user?.name}
              email={user?.email}
              onLogout={handleLogout}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            name={user?.name}
            email={user?.email}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
