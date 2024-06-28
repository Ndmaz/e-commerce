
import Link from "next/link"

import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { LogOutButton, LoginButton } from "./SignAuth"
import { Input } from "./ui/input"
import Searchbar from "./Searchbar"
import Providers from "./Providers"

 async function Header (){

  const session=await getServerSession(authOptions)

  return(
  <header className="flex z-10 fixed  w-full h-[5rem] top-0 justify-between bg-slate-300">

{/* */}
<div className="p-1 inline-flex">
  <Link className="hidden md:block" href='/panel'>
 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-10 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
 </Link>
{session?.user.role =='USER'?<div> role is user<LogOutButton/></div>:<div className='hidden md:block  md:mt-2 md:space-x-2'>
  
   <LoginButton/>
   
  </div>}

</div>

<Searchbar/>

{/*navbar */}
<div className="hidden md:flex md:flex-row-reverse md:space-x-4 mr-8">
   
   <Link  href='/' className="m-3 p-1 text-sm md:font-bold hover:bg-slate-200 hover:rounded-md">
        خانه
        </Link>
        <Link  href='/products' className="m-3 p-1 text-sm md:font-bold hover:bg-slate-200 hover:rounded-md">
        محصولات
        </Link>
        <Link  href='/' className="m-3 p-1 text-sm md:font-bold hover:bg-slate-200 hover:rounded-md">
       درباره ما
        </Link>
        <Link  href='/panel' className="m-3 p-1 text-sm md:font-bold hover:bg-slate-200 hover:rounded-md">
        پنل کاربری
        </Link>
</div>

{/* searchbar*/}


  </header>
  )
}

export default Header