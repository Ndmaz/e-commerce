'use client';

import { Card } from "@/components/ui/card";
import {
  MdShoppingCart,
  MdInventory,
  MdPeople,
  MdTrendingUp,
  MdLocalShipping,
  MdCategory,
  MdBrandingWatermark,
  MdSettings
} from "react-icons/md";
import Link from "next/link";

interface StatCard {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const statCards: StatCard[] = [
  {
    title: "سفارشات جدید",
    value: "12",
    icon: <MdShoppingCart className="text-2xl" />,
    href: "/adminpanel/NewOrder",
    color: "bg-blue-500",
  },
  {
    title: "کل محصولات",
    value: "156",
    icon: <MdInventory className="text-2xl" />,
    href: "/adminpanel/ProductRegestry",
    color: "bg-green-500",
  },
  {
    title: "کاربران فعال",
    value: "2,453",
    icon: <MdPeople className="text-2xl" />,
    href: "/adminpanel/Users",
    color: "bg-purple-500",
  },
  {
    title: "درآمد امروز",
    value: "2.5M تومان",
    icon: <MdTrendingUp className="text-2xl" />,
    href: "#",
    color: "bg-yellow-500",
  },
];

const quickActions = [
  {
    title: "مدیریت سفارشات",
    description: "مشاهده و مدیریت سفارشات جدید",
    icon: <MdLocalShipping className="text-2xl" />,
    href: "/adminpanel/NewOrder",
  },
  {
    title: "مدیریت دسته‌بندی‌ها",
    description: "افزودن و ویرایش دسته‌بندی‌ها",
    icon: <MdCategory className="text-2xl" />,
    href: "/adminpanel/Categoryfilter",
  },
  {
    title: "مدیریت برندها",
    description: "افزودن و ویرایش برندها",
    icon: <MdBrandingWatermark className="text-2xl" />,
    href: "/adminpanel/Brandfilter",
  },
  {
    title: "تنظیمات سیستم",
    description: "تنظیمات کلی سیستم",
    icon: <MdSettings className="text-2xl" />,
    href: "/adminpanel/Settings",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">داشبورد مدیریت</h1>
        <p className="mt-2 text-gray-600">
          به پنل مدیریت خوش آمدید. از اینجا می‌توانید تمام بخش‌های سایت را مدیریت کنید.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-full text-white`}>
                  {card.icon}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-full text-gray-600">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">فعالیت‌های اخیر</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">سفارش جدید ثبت شد</p>
                    <p className="text-xs text-gray-500">۲ ساعت پیش</p>
                  </div>
                </div>
                <Link
                  href="/adminpanel/NewOrder"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  مشاهده
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}