import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Maincarousel from "@/components/Maincarousel";
import Image from "next/image";

export default async function Home() {

  const image =
  "https://ecommercemountain.storage.iran.liara.space/beach-campfire-4184-x-2779-wallpaper-gauuk7tw4u9qof5v.jpg?AWSAccessKeyId=2m48k681k2lqbaa7&Expires=1858087191&Signature=Ml2PHpa%2B%2BfPFFdGXs1t0kwOEAQs%3D"
  return (
    <div className=" flex flex-col">
      <div className=" w-full h-[30rem] absolute top-0 -z-10 object-cover opacity-85 ">
        <Image
          className="w-full h-full "
          width={1920}
          height={1275}
          alt="bg"
          src={image}
        />
      </div>
      <div  className="flex flex-col w-1/3 h-36 mr-7 ml-auto mt-[15rem] font-semibold  rounded-xl bg-[#3d80ade5]">
        <p className="ml-auto w-[66%] font-bold">با جدیدترین مجموعه محصولات ما آشنا شوید  </p>
       <button className=" bg-[#ad893d] hover:bg-[#eeb844] rounded-sm m-2 w-1/3 text-sm"> رفتن به صفحه محصولات</button>
      </div>
<div className="flex mt-24">
   <p className="font-bold mx-auto">دسته بندی های مختلف محصولات را اینجا ببینید</p>
   <div>
      <div></div>
   </div>
</div>
      <Maincarousel />
    </div>
  );
}
