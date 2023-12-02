
export default function Productcard({productname,price,productid}){

    return <div  className="w-[15rem]">

{productid}
        <div className="flex">
             <p>{price}</p>
             <p className="">{productname}</p>
             </div>
       

    </div>
}