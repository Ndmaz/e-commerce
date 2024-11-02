import { create } from "zustand";

type Cartprodutsvalues={
    products:Array<object>
}
type Cartprodutsfunction={
    productschange:(by:Array<object>)=>void
}
export const useCartproducts=create<Cartprodutsvalues&Cartprodutsfunction>((set)=>({
products:[],
productschange:(by)=>(set(()=>({products:by})))
}))