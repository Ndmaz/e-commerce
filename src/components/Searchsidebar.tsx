import { useHeaders } from "@/store/useheaders";
import { IoSearchOutline } from "react-icons/io5";
import { MdSearchOff } from "react-icons/md";
export default function Searchsidebar() {
  const searchbooleanchange = useHeaders((state) => state.searchbooleanchange);
  return (
    <div className="absolute w-full flex">
      <div className=" bg-white w-2/3 md:w-1/3 h-[100vh] rounded-br-xl z-10">
        <div className="p-2 w-full">
          <MdSearchOff
            className="cursor-pointer text-xl"
            onClick={() => searchbooleanchange(false)}
          />
        </div>
        <div className="flex mx-auto w-3/4 border-2 rounded-lg border-black">
        <IoSearchOutline className=" text-2xl"/>
          <input className="w-full" type="text" />
        </div>
      </div>
      <div className="w-1/3 md:w-2/3  min-h-screen opacity-40 cursor-pointer bg-black" onClick={()=>searchbooleanchange(false)}>
      </div>
    </div>
  );
}
