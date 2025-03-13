import { useHeaders } from "@/store/useheaders";
import { useState, useEffect } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import Link from "next/link";
import { useparameters } from "@/store/useparameters";

export default function Searchsidebar() {
  const searchbooleanchange = useHeaders((state) => state.searchbooleanchange);
  const searchpropchange = useparameters((state) => state.searchpropchange);
  const [searchvalue, setsearchvalue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchvalue.trim()) {
      handleSearch();
    }
  };

  // Handle search action
  const handleSearch = () => {
    if (searchvalue.trim()) {
      searchpropchange(searchvalue);
      handleClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => searchbooleanchange(false), 300);
  };

  // Focus input on mount
  useEffect(() => {
    const inputElement = document.getElementById('search-input');
    if (inputElement) {
      inputElement.focus();
      setIsOpen(true);
    }
    return () => setIsOpen(false);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Search Header */}
      <div className={`bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4">
          <div className="h-[5rem] flex items-center gap-4">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors duration-200 active:scale-95"
            >
              <IoClose className="text-2xl text-gray-600" />
            </button>

            {/* Search Input Container */}
            <div className="flex-1">
              <div className="relative flex items-center">
                <input
                  id="search-input"
                  className="w-full py-3 px-5 pr-12 bg-gray-50 rounded-2xl border border-gray-200 
                           focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 
                           transition-all duration-200 outline-none text-lg shadow-sm"
                  type="text"
                  placeholder="جستجو در محصولات..."
                  value={searchvalue}
                  onChange={(e) => setsearchvalue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  dir="rtl"
                />
                <Link
                  href="/products"
                  className={`absolute left-3 p-2.5 rounded-xl transition-all duration-200 
                            ${searchvalue.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  onClick={(e) => {
                    if (!searchvalue.trim()) {
                      e.preventDefault();
                    } else {
                      handleSearch();
                    }
                  }}
                >
                  <IoSearchOutline className="text-xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`flex-1 bg-black/60 backdrop-blur-[2px] cursor-pointer 
                   transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
    </div>
  );
}
