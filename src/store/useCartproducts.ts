import { getLocalStorage } from "@/lib/localstorage";
import { create } from "zustand";

type Cartprodutsvalues = {
    products: Array<object>
    order: object
}
type Cartprodutsfunction = {
    productschange: (by: Array<object>) => void
    orderchange: (ty: object) => void
}
export const useCartproducts = create<Cartprodutsvalues & Cartprodutsfunction>((set) => ({
    order: {},
    products: [() => {
        const cartproducts = getLocalStorage("cartproducts")
        if (cartproducts) {
            return cartproducts
        } return
    }],
    productschange: (by) => (set(() => ({ products: by }))),
    orderchange: (ty) => (set(() => ({ order: ty })))
}))