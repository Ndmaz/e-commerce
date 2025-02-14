"use client";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import Avatarsection from "./Avatarsection";
import { SessionProvider } from "next-auth/react";
import { useHeaders } from "@/store/useheaders";
import Cartsidebar from "./Cartsidebar";
import { IoSearchOutline } from "react-icons/io5";
import Searchsidebar from "./Searchsidebar";
import { useCartproducts } from "@/store/useCartproducts";
import { useEffect, useState } from "react";

function Header() {
  const searchboolean = useHeaders((state) => state.searchboolean);
  const searchbooleanchange = useHeaders((state) => state.searchbooleanchange);
  const cartboolean = useHeaders((state) => state.cartboolean);
  const cartbooleanchange = useHeaders((state) => state.cartbooleanchange);
  const profileboolean = useHeaders((state) => state.profileboolean);
  const profilebooleanchange = useHeaders(
    (state) => state.profilebooleanchange
  );
  const products = useCartproducts((state) => state.products);
  const productchange = useCartproducts((state) => state.productschange);
  
  useEffect(() => {
      const storedProducts = localStorage.getItem("cartproducts");
      if (storedProducts) {
        productchange(JSON.parse(storedProducts));
      }
  
      const handleFocus = () => {
        const storedProducts = localStorage.getItem("cartproducts");
        if (storedProducts) {
          productchange(JSON.parse(storedProducts));
        }
      };
  
      window.addEventListener("focus", handleFocus);
  
      return () => {
        window.removeEventListener("focus", handleFocus);
      };
    }, [productchange]);

  return (
    <header className="flex z-10 fixed  w-full h-[5rem] top-0 justify-between bg-slate-300">
      {cartboolean && <Cartsidebar />}
      {searchboolean && <Searchsidebar />}
      {}
      {/* */}
      <div className="flex my-auto ml-8 justify-between w-[8rem] relative" >
       <div> 
        <LuShoppingCart
          className="hidden md:block text-2xl cursor-pointer"
          onClick={() => cartbooleanchange(true)}
        />
        <p className={`${(products?.length==0)?'hidden':'hidden md:block'} absolute bg-red-400 text-white rounded-2xl px-1`}>{products?.length}</p>
        </div>
       

        <SessionProvider >
          <Avatarsection />
        </SessionProvider>

        <IoSearchOutline
          className="text-2xl cursor-pointer mr-auto md:mr-0"
          onClick={() => searchbooleanchange(true)}
        />
      </div>

      {/*navbar */}
      <div className="hidden md:flex md:flex-row-reverse md:space-x-4 mr-8 ">
        <Link
          href="/"
          className="m-3 p-1 text-sm md:font-bold hover:border-b-2 hover:border-blue-600 transition ease-in-out duration-100 "
        >
          خانه
        </Link>
        <Link
          href="/products"
          className="m-3 p-1 text-sm md:font-bold hover:border-b-2 hover:border-blue-600 transition ease-linear "
        >
          محصولات
        </Link>
        <Link
          href="/"
          className="m-3 p-1 text-sm md:font-bold hover:border-b-2 hover:border-blue-600 transition ease-in-out "
        >
          درباره ما
        </Link>
        <Link
          href="/panel"
          className="m-3 p-1 text-sm md:font-bold hover:border-b-2 hover:border-blue-600 transition ease-in-out  "
        >
          پنل کاربری
        </Link>
      </div>

      {/* searchbar*/}
      <div>logo</div>
    </header>
  );
}

export default Header;
