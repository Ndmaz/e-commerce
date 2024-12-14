'use client'
import { useCartproducts } from '@/store/useCartproducts'
import React from 'react'

export default function Step3() {
  const order=useCartproducts((state)=>state.order)
  const products=useCartproducts((state)=>state.products)
  return (
    <div>

      <p>تایید نهایی و پرداخت</p>
      <table>
       {products.map((prodcut)=>{
        return <tr key={prodcut.id}>
          <td>اسم محصول</td>
          <td>{prodcut.productname}</td>
        </tr>
       })}
      </table>
    </div>
  )
}
