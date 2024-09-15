import { create } from "zustand";


type Ptype = {
    page: number,
    category: string,
    price: object,
    flip:boolean
}
type PFtype = {
    pagechange: (by: number) => void,
    categorychange: (cate: string) => void,
    pricechange: (pri: object) => void,
    flipchange:(fli:boolean)=>void
}
export const useparameters = create<Ptype & PFtype>((set) => ({
    page: 1,
    category: '',
    price: {
        price1:0,
        price2:100000000000000
    },
    flip:false,
    pagechange: (by) => (set(() => ({ page: by }))),
    categorychange: (cate) => (set(() => ({ category: cate }))),
    pricechange: (pri) => (set(() => ({ price: pri }))),
    flipchange:(fli)=>(set(()=>({flip:fli})))
}))