import { create } from "zustand";



type PRvalues={
productinfo:object

}
type PRfunctions={
    productinfochange:(by:object)=>void
}

export const usePR=create<PRvalues&PRfunctions>((set)=>({
    productinfo:{},
    productinfochange:(by)=>(set(()=>({productinfo:by})))
}))