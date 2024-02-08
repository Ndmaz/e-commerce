import Image from "next/image";
import pic from '@/app/1.jpg'

export default function Productcard({productname,price,productid}){

    return <div  className="flex flex-row-reverse md:block w-[20rem] mt-4 ml-7 p-1 border-[0.01rem] border-y-gray-700">
    <div className="w-[12rem] pl-[3px] border-[0.01rem] border-l-green-600 ">
<Image
        src={pic}
        width={300}
        height={300}
        alt="dd"
        className=""
        />
</div>
<div className="  ">
     <p className="text-right ">{productname}</p>
            {productid}
             <p>{price}</p>
            
             </div>
       

    </div>
}3