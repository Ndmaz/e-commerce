"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {useState} from "react"
import { Button } from "./ui/button"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"
import { LogOutButton, LoginButton } from "./SignAuth"

 function Header (){
const navbaritems=[{key:1,name:"خانه",direction:"/"}
,{key:2,name:"محصولات",direction:"/products"}
,{key:3,name:"درباره ما",direction:"/"}
,{key:4,name:"تماس باما",direction:"/"},]
 const [nav,usenav]= useState( true)

  return(
  <header className="fixed w-full h-[5rem] top-0 flex justify-between bg-slate-300">

{/* */}
<div className="p-1 inline-flex">
  <Link href='/panel'>
 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-10 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>
 </Link>
<div className='hidden md:block  md:mt-2 md:space-x-2'>
  <LogOutButton/>
   <LoginButton/>
   
  </div>
</div>

{/*navbar */}
<div className="hidden md:flex md:flex-row-reverse md:space-x-4 ">
     {navbaritems.map((navbar)=>{
      return(
        <Link key={navbar.key} href={navbar.direction} className="m-3 p-1 text-sm md:font-bold hover:bg-slate-200 hover:rounded-md">
        {navbar.name}
        </Link>
      )
     })}
   
</div>

{/* logo*/}

<div className="">
  <div className= {` ${nav?'hidden':'flex'} md:hidden flex-col h-full fixed right-0 top-0 bg-slate-400   `}>
  <svg onClick={()=>usenav(!nav)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-down-right"><path d="m7 7 10 10"/><path d="M17 7v10H7"/></svg>
{navbaritems.map((navbar)=>{
      return(
        <Link key={navbar.key} href={navbar.direction} className="m-3 p-1 text-sm font-bold hover:bg-slate-200 hover:rounded-md">
        {navbar.name}
      
        </Link>
      )
     })}
     <LoginButton />
     <LogOutButton/>
   
</div >
<svg onClick={()=>usenav(!nav)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className= {`${nav?'':'hidden'}md:hidden mt-4 mr-3 w-6 h-6 border-box`}><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>


</div>
  </header>
  )
}

export default Header