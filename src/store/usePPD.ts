import { create } from "zustand";


type Ptype={
    productinfo:Object
}
type PFtype={
    productinfochange:(by:Object)=>void
}
export const usePPD=create<Ptype & PFtype>((set)=>({
    productinfo:{},
    productinfochange:(by)=>(set(()=>({productinfo:by})))
}))