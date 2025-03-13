'use client'

import { Button } from '@/components/ui/button'
import { useCartproducts } from '@/store/useCartproducts'
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'
import { MdLocalShipping } from 'react-icons/md'

interface UserInfo {
  fullName: string
  phoneNumber: string
  postalCode: string
  address: string
}

interface Product {
  id: string
  productname: string
  price: number
  quantitytotake: number
}

interface Order {
  userinfo: UserInfo
  productstobuy: Product[]
  totalprice: number
}

const SHIPPING_COST = 13000
const FREE_SHIPPING_THRESHOLD = 100000

export default function Step3() {
  const router = useRouter()
  const order = useCartproducts(state => state.order) as Order

  const finalPrice = order.totalprice < FREE_SHIPPING_THRESHOLD
    ? order.totalprice + SHIPPING_COST
    : order.totalprice

  const handlePayment = () => {
    // TODO: Implement payment gateway integration
    console.log('Proceeding to payment...')
  }

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-8">تایید نهایی و پرداخت</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/* User Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MdLocalShipping className="text-blue-500" />
            اطلاعات تحویل گیرنده
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600">نام و نام خانوادگی:</span>
              <span className="mr-2 font-medium">{order.userinfo.fullName}</span>
            </div>
            <div>
              <span className="text-gray-600">شماره تماس:</span>
              <span className="mr-2 font-medium">{order.userinfo.phoneNumber}</span>
            </div>
            <div>
              <span className="text-gray-600">کد پستی:</span>
              <span className="mr-2 font-medium">{order.userinfo.postalCode}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-600">آدرس:</span>
              <span className="mr-2 font-medium">{order.userinfo.address}</span>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">سبد خرید</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-right">محصول</th>
                  <th className="py-3 px-4">قیمت واحد</th>
                  <th className="py-3 px-4">تعداد</th>
                  <th className="py-3 px-4">قیمت کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.productstobuy.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">{product.productname}</td>
                    <td className="py-4 px-4">{product.price.toLocaleString()} تومان</td>
                    <td className="py-4 px-4">{product.quantitytotake}</td>
                    <td className="py-4 px-4">
                      {(product.price * product.quantitytotake).toLocaleString()} تومان
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Price Summary */}
        <div className="border-t pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>جمع سبد خرید:</span>
              <span className="font-medium">{order.totalprice.toLocaleString()} تومان</span>
            </div>

            {order.totalprice < FREE_SHIPPING_THRESHOLD ? (
              <div className="flex justify-between text-gray-600">
                <span>هزینه ارسال:</span>
                <span>{SHIPPING_COST.toLocaleString()} تومان</span>
              </div>
            ) : (
              <div className="flex justify-between text-green-600">
                <span>هزینه ارسال:</span>
                <span>رایگان!</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>مبلغ قابل پرداخت:</span>
              <span>{finalPrice.toLocaleString()} تومان</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
            <span>بازگشت</span>
          </Button>

          <Button
            onClick={handlePayment}
            className="bg-green-500 hover:bg-green-600"
          >
            پرداخت و ثبت نهایی سفارش
          </Button>
        </div>
      </div>
    </div>
  )
}
