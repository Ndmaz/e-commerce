'use client'
import { Button } from '@/components/ui/button'
import { useCartproducts } from '@/store/useCartproducts'
import React from 'react'

export default function Step3() {
  const order = useCartproducts((state) => state.order)

  return (
    <div dir='rtl'>

      <div className='bg-white mx-auto p-6 rounded-md md:w-7/12'>


        <p className='font-bold'>تایید نهایی و پرداخت</p>
        <table >
          <tr>
            <td>نام و نام خانوادگی:</td>
            <td>{order.userinfo.fullName}</td>
          </tr>
          <tr>
            <td>کدپستی:</td>
            <td>{order.userinfo.postalCode}</td>
          </tr>
          <tr>
            <td>شماره تماس:</td>
            <td>{order.userinfo.phoneNumber}</td>
          </tr>
          <tr>
            <td>آدرس:</td>
            <td>{order.userinfo.address}</td>
          </tr>

          <p>محصولات انتخاب شده</p>
          {order.productstobuy?.map((product) => {
            return <tr key={product.id} className='p-2  rounded-r-md bg-[#2220202f]'>
              <td className='px-2'>اسم محصول:</td>
              <td className='px-2'>{product.productname}</td>
              <td className='px-2'>قیمت:</td>
              <td className='px-2'>{product.price}</td>
              <td className='px-2'>تعداد:</td>
              <td className='px-2'>{product.quantitytotake}</td>
            </tr>
          })}
          <tr>
            <td>قیمت کل</td>
            {(order.productstobuy[1].totalprice<100000)&&<td>به اضافه 13000 هزینه پست:</td> } 
            <td>{(order.productstobuy[1].totalprice>100000)?order.productstobuy[1].totalprice:order.productstobuy[1].totalprice+13000}</td>
            
          </tr>


        </table>
        <Button>
          تایید و رفتن به صفحه پرداخت
        </Button>
      </div>
    </div>
  )
}
