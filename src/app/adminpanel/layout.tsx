"use server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Link from "next/link";

export default async function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  /* if(session?.user?.role =='USER'){
        return <div className='ml-8 mt-8 font-mono font-bold'> unauthenticated </div>
    }*/
  return (
    <div className="h-full flex flex-row-reverse ">
      <div
        className="w-[25vw] border-t-2 border-slate-500 bg-slate-300 flex flex-col items-center space-y-8 font-semibold text-xs md:text-sm "
        dir="rtl"
      >
        <h1 className="mx-auto mt-2">پنل کاربری</h1>
        <div className="w-full  bg-slate-300">
          <div className=" my-4  ">
            <p>مدیریت صفحه اصلی</p>
            <div className="flex flex-col items-center space-y-2  ">
            <Link
                className="bg-[rgb(162,190,163)] hover:bg-slate-300  hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/Mainpageimage"
              >
                 عکس زمینه 
              </Link>
              <Link
                className="bg-[rgb(162,190,163)] hover:bg-[rgb(190,212,191)] hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/Categoryfilter"
              >
                تغییرات دسته بندی
              </Link>
              <Link
                className="bg-[rgb(162,190,163)] hover:bg-[rgb(190,212,191)] hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/Brandfilter"
              >
                تغییرات برند
              </Link>
            </div>
          </div>
          <div className=" my-4  ">
            <p>مدیریت محصولات</p>
            <div className="flex flex-col items-center space-y-2  ">
              <Link
                className="bg-[rgb(162,190,163)] hover:bg-[rgb(190,212,191)] hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/ProductRegestry"
              >
                ثبت محصولات
              </Link>
              <Link
                className="bg-[rgb(162,190,163)] hover:bg-[rgb(190,212,191)] hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/ProductEditing"
              >
                ویرایش محصولات
              </Link>
              <Link
                className="bg-[rgb(162,190,163)] hover:bg-[rgb(190,212,191)] hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/ProductRemoving"
              >
                حذف محصولات
              </Link>
            </div>
          </div>
          <div className=" my-4 ">
            <p> مدیریت سفارشات </p>
            <div className="flex flex-col  space-y-2">
              <Link
                className="bg-[rgb(162,190,163)] hover:bg-[rgb(190,212,191)] hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/NewOrder"
              >
                سفارشات تازه
              </Link>
              <Link
                className="bg-[rgb(162,190,163)] hover:bg-[rgb(190,212,191)] hover:border-black border-2 rounded-lg py-3 px-2 w-full"
                href="/adminpanel/NewOrder"
              >
                سفارشات گذشته
              </Link>
            </div>
          </div>
          <div className=" my-4 mx-5">
            <p> مدیریت کاربران </p>
          </div>
          <div className=" my-4 mx-5">
            <p> مدیریت صفحه اصلی </p>
          </div>
        </div>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
