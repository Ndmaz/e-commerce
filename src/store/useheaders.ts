
import { create } from "zustand";

type Headersvalue={
    searchboolean:boolean,
    profileboolean:boolean,
    cartboolean:boolean
    
}
type Headersfunction={
    searchbooleanchange:(by1:boolean)=>void,
    profilebooleanchange:(by2:boolean)=>void,
    cartbooleanchange:(by3:boolean)=>void,

}
export const useHeaders=create<Headersvalue & Headersfunction>((set)=>({
searchboolean:false,
profileboolean:false,
cartboolean:false,
searchbooleanchange:(by1)=>(set(()=>({searchboolean:by1}))),
profilebooleanchange:(by2)=>(set(()=>({profileboolean:by2}))),
cartbooleanchange:(by3)=>(set(()=>({cartboolean:by3}))),
}))