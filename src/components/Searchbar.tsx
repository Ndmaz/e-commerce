'use client'
import { useState } from "react";
import { Input } from "./ui/input";
import { useQuery } from "react-query";

 
 export default function Searchbar() {
   const [values,setvalue]=useState()
  



     return (
       <div>
       
<Input
 type="text"
 placeholder="...جستجو"
 name="searchbar"
 value={values}

 onChange={(e)=>setvalue(e.target.value)}
 />
       </div>
     
     )
 }
 