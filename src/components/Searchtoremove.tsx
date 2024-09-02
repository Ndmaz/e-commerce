import { useAPR } from "@/store/AsyncStore/useAPR";
import { usePR } from "@/store/usePR";
import { CgSpinner } from "react-icons/cg";
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { CheckIcon } from "@radix-ui/react-icons";
export default function Searchtoremove(searchvalueprop: string) {
  const productinfochange = usePR((state) => state.productinfochange);
  const productinfo=usePR((state)=>state.productinfo)

  const { data, isLoading, isError, error } = useAPR(searchvalueprop);
  
  async function mutate(){
    try {
        const id=productinfo.id
        const res= await fetch('http://localhost:3000/api/PR',{
            method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        })
        if (res.ok){
            return 
        }
    } catch (error) {
        
    }
  }
  const mutation=useMutation(mutate)
  if (isLoading) {
    return <CgSpinner strokeWidth="1" className="animate-spin text-5xl" />;
  }
  if (data == null) {
    return <div>محصولی با این اسم وجود ندارد</div>;}


productinfochange(data)
  return <div>
{isError && `error:${error}`}
<table className="font-sans mt-2 mr-2">
    <tr className="border-2 border-black rounded-t-lg">
        <th className="border-l-2 border-[#addbad] p-1"> اسم محصول</th>
        <th className="border-l-2 border-[#addbad] p-1">کد محصول</th>
        <th className="border-l-2 border-[#addbad] p-1"> تعداد محصول</th>
        <th className="border-l-2 border-[#addbad] p-1"> قیمت محصول</th>
    </tr>
    <tr className="border-2  border-black rounded-b-lg">
        <th className="border-l-2 border-[#addbad] p-1">{data.productname}</th>
        <th className="border-l-2 border-[#addbad] p-1">{data.productcode}</th>
        <th className="border-l-2 border-[#addbad] p-1">{data.quanity}</th>
        <th className="border-l-2 border-[#addbad] p-1">{data.price}</th>
        <th> <Button onClick={mutation.mutate} variant={'destructive'}> حذف محصول
        {mutation.isLoading && (
          <CgSpinner strokeWidth="1" className="animate-spin text-5xl" />
        )}
        {mutation.isSuccess && <CheckIcon className="text-green-600 " />}
            </Button></th>
    </tr>
</table>
  </div>;
}
