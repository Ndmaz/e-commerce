import { create } from "zustand";


type Ptype = {
    page: number,
    category: string,
    brand: string,
    price: object,

    searchprop: string
}
type PFtype = {
    pagechange: (by: number) => void,
    categorychange: (cate: string) => void,
    brandchange: (bran: string) => void,
    pricechange: (pri: object) => void,

    searchpropchange: (searchpro: string) => void
}
export const useparameters = create<Ptype & PFtype>((set) => ({
    page: 1,
    category: '',
    brand: '',
    price: {
        price1: 0,
        price2: 1000
    },

    searchprop: '',
    pagechange: (by) => (set(() => ({ page: by }))),
    categorychange: (cate) => (set(() => ({ category: cate }))),
    brandchange: (bran) => (set(() => ({ brand: bran }))),
    pricechange: (pri) => (set(() => ({ price: pri }))),

    searchpropchange: (searchpro) => (set(() => ({ searchprop: searchpro })))
}))