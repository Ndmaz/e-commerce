"use client";
import { RiEqualizerLine } from "react-icons/ri";
import Productfilter from "@/components/Productfilter";
import ProductList from "@/components/ProductList";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useparameters } from "@/store/useparameters";
import { useState } from "react";

export default function Products() {
  const page = useparameters((state) => state.page);
  const pagechange = useparameters((state) => state.pagechange);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile Filter Trigger */}
      <div className="md:hidden sticky top-[5rem] bg-white z-40 shadow-sm">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 p-4 w-full justify-center text-gray-700 hover:bg-gray-50"
        >
          <RiEqualizerLine className="text-xl" />
          <span>فیلتر محصولات</span>
        </button>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex">
          <ProductList />
          <Productfilter isOpen={showFilter} onClose={() => setShowFilter(false)} />
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-auto bg-white  py-4 shadow-md md:shadow-none">
        <div className="container mx-auto flex justify-center items-center gap-2">
          <button
            className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition-colors disabled:opacity-50"
            onClick={() => page > 1 && pagechange(page - 1)}
            disabled={page === 1}
          >
            <IoIosArrowDropleft />
          </button>

          {page > 1 && (
            <button
              className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition-colors"
              onClick={() => pagechange(page - 1)}
            >
              {page - 1}
            </button>
          )}

          <button className="bg-slate-300 p-2 rounded">
            {page}
          </button>

          <button
            className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition-colors"
            onClick={() => pagechange(page + 1)}
          >
            {page + 1}
          </button>

          <button
            className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition-colors"
            onClick={() => pagechange(page + 2)}
          >
            {page + 2}
          </button>

          <button
            className="bg-slate-200 p-2 rounded hover:bg-slate-300 transition-colors"
            onClick={() => pagechange(page + 1)}
          >
            <IoIosArrowDropright />
          </button>
        </div>
      </div>
    </div>
  );
}
