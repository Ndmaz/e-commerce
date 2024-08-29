import { usePE } from "@/store/usePE";

export default function DetailEdit() {

  const productinfo=usePE((state)=>state.productsinfo)
  const details= JSON.parse(productinfo.details)
  return (
    <div>

      
{details.map((item:object)=>{
  return <div key={item.detailname}>
 {item.detailname}:{item.detailvalue}
  </div>
})}
    </div>
  );
}
