'use client';

import { CiHome, CiShoppingCart } from "react-icons/ci"
import { Icons } from "./Icons"
import Link from "next/link"
import { TbCategory } from "react-icons/tb"
import { VscAccount } from "react-icons/vsc"
import { usePathname } from 'next/navigation';

// Reversed order for RTL
const navigationItems = [
    {
    label: "خانه",
    href: "/",
    icon: CiHome,
},
 {
    label: "محصولات",
    href: "/products",
    icon: TbCategory,
},
 {
    label: "سبد خرید",
    href: "/cart",
    icon: CiShoppingCart,
},
{
    label: "پروفایل",
    href: "/panel",
    icon: VscAccount,
},

] as const;

export default function StickyFooter() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 right-0 left-0 z-50 bg-white border-t border-gray-200">
            <div className="flex flex-row-reverse items-center justify-between px-4 h-16">
                {navigationItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center flex-1 py-2 
                                    transition-colors duration-200 relative
                                    ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                        >
                            <div className={`relative ${isActive ? 'transform scale-110' : ''}`}>
                                <Icon className={`text-2xl ${isActive ? 'mb-1' : ''}`} />
                                {isActive && (
                                    <span className="absolute -bottom-1 right-1/2 w-1 h-1 bg-blue-600 rounded-full 
                                                 transform translate-x-1/2" />
                                )}
                            </div>
                            <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-600' : ''}`}>
                                {label}
                            </span>

                            {isActive && (
                                <div className="absolute -top-0.5 right-1/2 w-12 h-0.5 bg-blue-600 
                                             transform translate-x-1/2 rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}