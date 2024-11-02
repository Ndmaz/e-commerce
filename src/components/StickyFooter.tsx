import { CiHome, CiShoppingCart } from "react-icons/ci"
import { Icons } from "./Icons"
import Link from "next/link"
import { TbCategory } from "react-icons/tb"
import { VscAccount } from "react-icons/vsc"


export default function StickyFooter(){
   
    return <div className="flex md:hidden w-full  justify-evenly space-x-2 fixed bottom-0 h-[5rem] font-serif   bg-slate-300 ">

<Link className="p-5 w-[24vw]"  href="/panel"> 
<VscAccount />
<p> پروفایل</p> 
</Link>

<Link className="p-5 w-[24vw]"  href='/cart'>
<CiShoppingCart />
<p>سبد خرید</p> 
</Link>

<Link className="p-5 w-[24vw]"  href='/products'> 
<TbCategory />
 <p> محصولات</p> 
</Link>

<Link className="p-5 w-[24vw]" href='/'>
<CiHome />
 <p>خانه</p>  
 </Link>


    </div>
}