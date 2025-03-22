'use client'

import { LogOutButton, LoginButton } from "./SignAuth";
import { RxAvatar } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiUser, FiMail, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";

interface UserSession {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    image?: string | null;
  };
}

export default function Avatarsection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession() as { data: UserSession | null };

  const renderUserMenu = () => {
    if (!session?.user) {
      return (
        <div 
        onMouseOver={() => setIsMenuOpen(true)}
          onMouseLeave={() => setTimeout(() => setIsMenuOpen(false), 200)} 
          className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-in-out"
          >
          <div className="p-4 border-b border-gray-100">
            <p className="text-right text-gray-600 mb-2">شما وارد نشدید</p>
            <LoginButton />
          </div>
        </div>
      );
    }

    return (
      <div 
      onMouseOver={() => setIsMenuOpen(true)}
        onMouseLeave={() => setTimeout(() => setIsMenuOpen(false), 200)}
         className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-in-out"
         >
        <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex items-center justify-end gap-3 text-white">
            <div className="text-right">
              <p className="font-semibold">{session.user.name}</p>
              <p className="text-sm text-blue-100">{session.user.email}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FiUser className="text-2xl text-white" />
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="flex flex-col space-y-1">
            <Link
              href="/panel"
              className="flex items-center justify-end gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150"
            >
              <span>پنل کاربری</span>
              <FiUser className="text-gray-500" />
            </Link>

            <button
              className="flex items-center justify-end gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-150 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>تنظیمات</span>
              <FiSettings className="text-gray-500" />
            </button>

            <div className="px-2 py-1">
              <LogOutButton />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setTimeout(() => setIsMenuOpen(false), 500)}
    >
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-150 relative"
        aria-label="User menu"
      >
        {session?.user ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
            {session.user.name?.[0]?.toUpperCase() || <FiUser />}
          </div>
        ) : (
          <RxAvatar className="text-2xl text-gray-600" />
        )}

        {session?.user && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>

      {isMenuOpen && renderUserMenu()}
    </div>
  );
}
