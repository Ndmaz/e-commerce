'use client'
import Searchtoremove from '@/components/Searchtoremove';
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { HiOutlineChevronUp } from 'react-icons/hi';

export default function ProductRemoving() {
  const [searchvalue, setsearchvalue] = useState<String | any | undefined>("");
  const [searchClicked, setsearchClicked] = useState<Boolean>(false);
  
  return (
    <div className="mt-6" dir="rtl">
      
      <h1 className="mr-4 text-xl font-mono font-bold">حذف محصول</h1>
      <div className="w-[35vw] flex ml-auto mr-4">
        <input
          className="bg-white w-full rounded-r-lg pr-2 "
          name="search"
          type="text"
          placeholder=" جستجو محصول"
          value={searchvalue}
          onChange={(e) => {
            setsearchvalue(e.target.value);
          }}
        />
        <button onClick={() => setsearchClicked(true)}>
          <CiSearch
            strokeWidth="0.5"
            className="text-3xl rounded-l-xl  bg-white"
          />
        </button>
      </div>
    <div>
      {searchClicked&&<Searchtoremove searchvalueprop={searchvalue}/>}
    </div>
    {searchClicked && (
        <HiOutlineChevronUp
          className="m-6 hover:bg-white rounded-sm "
          onClick={() => {
            setsearchClicked(false);
            setsearchvalue("");
           
          }}
        />
      )}
    </div>
  )
}
