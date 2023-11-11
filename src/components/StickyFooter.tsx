import { Icons } from "./Icons"
import Link from "next/link"
export default function StickyFooter(){
   
    return <div className="flex md:hidden w-full  justify-evenly space-x-2 fixed bottom-0 h-[5rem] font-serif   bg-slate-300 ">

<Link className="p-5 w-[25vw]"  href="/panel"> 
<Icons.profile/>
<p> پروفایل</p> 
</Link>

<Link className="p-5 w-[25vw]"  href='/cart'>
<Icons.shoppingcart/>
<p>سبد خرید</p> 
</Link>

<Link className="p-5 w-[25vw]"  href='/products'> 
<Icons.products/>
 <p> محصولات</p> 
</Link>

<Link className="p-5 w-[25vw]" href='/'>
<Icons.home />
 <p>خانه</p>  
 </Link>


    </div>
}