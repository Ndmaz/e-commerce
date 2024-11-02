import { useAPRELATED } from "@/store/AsyncStore/useAPRELATED";
import { usePPD } from "@/store/usePPD";
import Image from "next/image";
import pic from "@/app/1.jpg";
import Link from "next/link";
import { FaArrowsSpin } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
export default function RelatedCarousel() {
  const productinfo = usePPD((state) => state.productinfo);
  const categoryid = productinfo.categoryid;
  const issegment=true
  const { data,isLoading } = useAPRELATED(categoryid,issegment);
if (isLoading){
  return  <div className="flex  w-full justify-center">
  <CgSpinner strokeWidth="1" className="animate-spin text-5xl blur-sm" />
</div>
}
  const maped = data?.map((product) => {
    if(productinfo.productname==product.productname){
      return
    }
    const imagess = JSON.parse(product.images);
    const imagesss =
      product.images == `{"pic1":"","pic2":"","pic3":"","pic4":""}`
        ? false
        : imagess;
    return (
      <div key={product.id} className="md:w-[15%] p-2 rounded-md h-50 focus:bg-[#caf0b1] hover:shadow-lg hover:bg-[#caf0b1]">
        <Link href={`/products/${product.id}`}>
          <div>
            <Image
              className="mx-auto rounded-sm h-40 "
              width={200}
              height={200}
              src={imagesss == false ? pic : imagesss.pic1}
              alt="rrr"
            />
          </div>
          <div>
            <p>{product.productname}</p>
            <p>{product.price}</p>
          </div>
        </Link>
      </div>
    );
  });
  return (
    <div dir="rtl" className=" md:w-[95vw] rounded-sm md:mx-auto p-1 mb-20">
      <p >محصولات مرتبط</p>

      <div className="  flex space-x-2 py-2 ">
        {maped}
        <Link href={'/'} className="flex my-auto hover:shadow-md   ">
          <p className="text-xs ">ادامه محصولات</p>
        <MdKeyboardDoubleArrowLeft  className="text-lg my-auto" />  
        </Link>
        
      </div>
    </div>
  );
}
