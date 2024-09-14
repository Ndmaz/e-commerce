'use client'
import { FaArrowsSpin } from "react-icons/fa6"
import ProductDisone from "@/components/ProductDisone"
import RelatedCarousel from "@/components/RelatedCarousel"
import { useAPF } from "@/store/AsyncStore/useAPF"
import { usePPD } from "@/store/usePPD"
import { CgSpinner } from "react-icons/cg"
import ProductDistwo from "@/components/ProductDistwo"

export default function page({params}:{params:{slug:string}}) {
    const {data,isLoading,isError,error}= useAPF(params.slug)
    const productonfocahnge=usePPD((state)=>state.productinfochange)
    if (isLoading){
        return  <div className="flex  w-full justify-center">
        <CgSpinner strokeWidth="1" className="animate-spin text-5xl blur-sm" />
      </div>
    } 
    if(isError){
        return <div>{error}</div>
    }
    console.log(data)
    productonfocahnge(data)
  return (
    <div className="min-h-[120vh]" >
 <ProductDisone/>
 <RelatedCarousel/>
<ProductDistwo/>
 related

        
 
    </div>
  )
}

