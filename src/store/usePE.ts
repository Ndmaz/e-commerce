import { create } from "zustand";
import { Product } from "@/types/product";

type PEvalue = {
    fieldname: string;
    productsinfo: Product | null;
    selectedProduct: Product | null;
}

type PEfunction = {
    fieldnamechange: (by: string) => void;
    productsinfochange: (bys: Product) => void;
    setSelectedProduct: (product: Product | null) => void;
}

export const usePE = create<PEvalue & PEfunction>((set) => ({
    fieldname: "",
    productsinfo: null,
    selectedProduct: null,
    fieldnamechange: (by) => set(() => ({ fieldname: by })),
    productsinfochange: (bys) => set(() => ({ productsinfo: bys })),
    setSelectedProduct: (product) => set(() => ({
        selectedProduct: product,
        productsinfo: product,
        fieldname: "" // Reset fieldname when selecting a new product
    }))
}));