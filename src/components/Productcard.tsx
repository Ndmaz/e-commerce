import Image from "next/image";
import pic from '@/app/1.jpg'

export default function Productcard({productname,price,productid}){

    return <div  className="w-[20rem] mt-4 ml-7">
<div className="">
<Image
        src={pic}
        width={600}
        height={500}
        alt="dd"
        className=""
        />
</div>
{productid}
        <div className="  ">
             <p>{price}</p>
             <p className="text-right">{productname}</p>
             </div>
       

    </div>
}