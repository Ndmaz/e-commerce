"use client";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import Avatarsection from "./Avatarsection";
import { SessionProvider } from "next-auth/react";
import { useHeaders } from "@/store/useheaders";
import Cartsidebar from "./Cartsidebar";
import { IoSearchOutline } from "react-icons/io5";
import { RiHome3Line } from "react-icons/ri";
import { BsBox } from "react-icons/bs";
import { FiInfo, FiUser } from "react-icons/fi";
import Searchsidebar from "./Searchsidebar";
import { useCartproducts } from "@/store/useCartproducts";
import { useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "خانه", icon: RiHome3Line },
  { href: "/products", label: "محصولات", icon: BsBox },
  { href: "/", label: "درباره ما", icon: FiInfo },
  { href: "/panel", label: "پنل کاربری", icon: FiUser },
];

function Header() {
  const {
    searchboolean,
    searchbooleanchange,
    cartboolean,
    cartbooleanchange,
  } = useHeaders((state) => ({
    searchboolean: state.searchboolean,
    searchbooleanchange: state.searchbooleanchange,
    cartboolean: state.cartboolean,
    cartbooleanchange: state.cartbooleanchange,
  }));

  const { products, productchange } = useCartproducts((state) => ({
    products: state.products,
    productchange: state.productschange,
  }));

  useEffect(() => {
    const loadCartProducts = () => {
      const storedProducts = localStorage.getItem("cartproducts");
      if (storedProducts) {
        productchange(JSON.parse(storedProducts));
      }
    };

    loadCartProducts();
    window.addEventListener("focus", loadCartProducts);
    return () => window.removeEventListener("focus", loadCartProducts);
  }, [productchange]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 h-20">
          <div className="flex items-center justify-between h-full">
            {/* Actions */}
            <div className="flex items-center gap-6">
              {/* User Menu */}
              <div className="border-l pl-6">
                <SessionProvider>
                  <Avatarsection />
                </SessionProvider>
              </div>

              {/* Cart */}
              <button
                onClick={() => cartbooleanchange(true)}
                className="hidden md:flex items-center p-2 text-gray-700 hover:text-blue-600 
                         transition-colors duration-200 relative"
              >
                <LuShoppingCart className="text-2xl" />
                {products?.length > 0 && (
                  <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs 
                                 w-5 h-5 flex items-center justify-center rounded-full">
                    {products.length}
                  </span>
                )}
              </button>

              {/* Search */}
              <button
                onClick={() => searchbooleanchange(true)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <IoSearchOutline className="text-2xl" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-row-reverse items-center space-x-reverse space-x-8 ml-auto">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href + label}
                  href={href}
                  className="flex flex-row-reverse items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 
                           transition-colors duration-200 font-medium"
                >
                  <Icon className="text-xl" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebars */}
      {cartboolean && <Cartsidebar />}
      {searchboolean && <Searchsidebar />}
    </>
  );
}

export default Header;