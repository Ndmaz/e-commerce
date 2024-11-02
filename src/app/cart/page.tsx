"use client";

import { useCartproducts } from "@/store/useCartproducts";
import { useState } from "react";

export default function Cart() {
    const [qunityarray,setqunityarray]=useState<Number[]>([])
    const products=useCartproducts((state)=>state.products)
     
  return <div>
    <div>
        <div>محصولات منتخب:</div>
        <div>{products.map((product,index)=>{
            
            return <div key={product.id}>
                
                <div>{product.productname}</div>
                <div>{qunityarray[index]}</div>
                </div>
        })}</div>
    </div>
  </div>;
}
