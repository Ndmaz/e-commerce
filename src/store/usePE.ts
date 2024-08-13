
import { create } from "zustand";

type PEvalue={
    fieldname:string,
    productsinfo:object
}
type PEfunction={
    fieldnamechange:(by:string)=>void,
    productsinfochange:(bys:object)=>void
}
export const usePE=create<PEvalue & PEfunction>((set)=>({
fieldname: "",
productsinfo:{},
fieldnamechange:(by)=>(set(()=>({fieldname:by}))),
productsinfochange:(bys)=>(set(()=>({productsinfo:bys})))
}))