'use client'
import { FaArrowsSpin } from "react-icons/fa6"
import ProductDisone from "@/components/ProductDisone"
import RelatedCarousel from "@/components/RelatedCarousel"
import { useAPF } from "@/store/AsyncStore/useAPF"
import { usePPD } from "@/store/usePPD"

export default function page({params}:{params:{slug:string}}) {
    const {data,isLoading,isError,error}= useAPF(params.slug)
    const productonfocahnge=usePPD((state)=>state.productinfochange)
    if (isLoading){
        return <div className=" h-full flex justify-center items-center"><FaArrowsSpin className="animate-spin text-3xl" /></div>
    } 
    if(isError){
        return <div>{error}</div>
    }
    console.log(data)
    productonfocahnge(data)
  return (
    <div >
 <ProductDisone/>
 <RelatedCarousel/>
 productdiplaytwo
 related

        
 
    </div>
  )
}

