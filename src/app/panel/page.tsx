import { Card, CardTitle } from "@/components/ui/card";

import Link from "next/link";

export default function panel(){

    return <div>
        <Card className="">
<CardTitle>
    پنل کاربری
</CardTitle>
    
panel
<div>
     سبد خرید

</div>


<div>تغییر اطلاعات پروفایل، </div>

admin access
<div>
    حذف و اضافه محصول
</div>
<div>،سفارشات، 
 </div>
<div>مدیریت محصولات  
</div>   
<Link href='/panel/ProductManagment'>Productmanagement</Link> 
</Card>
 </div>
}