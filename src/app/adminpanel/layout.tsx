"use server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Link from "next/link";
import {
  MdDashboard,
  MdImage,
  MdCategory,
  MdBrandingWatermark,
  MdInventory,
  MdShoppingCart,
  MdPeople,
  MdSettings
} from "react-icons/md";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: {
    title: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [
  {
    title: "داشبورد",
    href: "/adminpanel",
    icon: <MdDashboard className="text-xl" />,
  },
  {
    title: "مدیریت صفحه اصلی",
    href: "#",
    icon: <MdImage className="text-xl" />,
    children: [
      { title: "عکس زمینه", href: "/adminpanel/Mainpageimage" },
      { title: "تغییرات دسته بندی", href: "/adminpanel/Categoryfilter" },
      { title: "تغییرات برند", href: "/adminpanel/Brandfilter" },
      { title: "تغییرات فوتر", href: "/adminpanel/Footerinfo" },
      { title: "تغییرات لوگو", href: "/adminpanel/Logo" },
    ],
  },
  {
    title: "مدیریت محصولات",
    href: "#",
    icon: <MdInventory className="text-xl" />,
    children: [
      { title: "ثبت محصولات", href: "/adminpanel/ProductRegestry" },
      { title: "ویرایش محصولات", href: "/adminpanel/ProductEditing" },
      { title: "حذف محصولات", href: "/adminpanel/ProductRemoving" },
    ],
  },
  {
    title: "مدیریت سفارشات",
    href: "#",
    icon: <MdShoppingCart className="text-xl" />,
    children: [
      { title: "سفارشات تازه", href: "/adminpanel/NewOrder" },
      { title: "سفارشات گذشته", href: "/adminpanel/PastOrders" },
    ],
  },
  {
    title: "مدیریت کاربران",
    href: "/adminpanel/Users",
    icon: <MdPeople className="text-xl" />,
  },
  {
    title: "تنظیمات",
    href: "/adminpanel/Settings",
    icon: <MdSettings className="text-xl" />,
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (/*!session?.user || session.user.role !== 'ADMIN'*/false) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">دسترسی غیرمجاز</h1>
          <p className="text-gray-600">شما به این بخش دسترسی ندارید.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row-reverse" dir="rtl">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">پنل مدیریت</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.title} className="space-y-1">
              {item.children ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600 p-2 rounded-lg hover:bg-gray-100">
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <div className="mr-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex justify-start p-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-gray-600 p-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              {session?.user?.name?.[0] || "A"}
            </div>
            <div>
              <p className="font-medium">{session?.user?.name || "کاربر"}</p>
              <p className="text-xs text-gray-500">مدیر سیستم</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
