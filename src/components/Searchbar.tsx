"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { useQuery } from "react-query";
import { IoSearchOutline } from "react-icons/io5"
export default function Searchbar() {
  const [values, setvalue] = useState();
  const [inputdisplay,setinputdisplay]=useState(false)
if(inputdisplay){
  setTimeout(() => {
    setinputdisplay(false)
  }, 5000);
}
  return (
    <div className="relative">
<IoSearchOutline className="text-2xl" onMouseOver={()=>setinputdisplay(true)}/>
    {inputdisplay&&<div className="absolute w-[6rem]">
        <Input
          type="text"
          placeholder="...جستجو"
          name="searchbar"
          value={values}
          onChange={(e) => setvalue(e.target.value)}
        />
      </div>}
    </div>
  );
}
