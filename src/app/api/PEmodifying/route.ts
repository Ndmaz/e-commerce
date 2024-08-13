import prisma from "@/lib/database"



export async function POST(req:Request) {
    
    
    
  
    try {

 const {Editinput,fieldname,id}=await req.json()  
const idd=parseFloat(id.id)
  
    switch (fieldname){
        case 'اسم محصول':
            try {
                 
const pn= await prisma.product.update({
            where:{ id: idd }
            ,data:{productname:Editinput}
        })
    
       return Response.json({pn})
            } catch (error) {
               
                return Response.json({error})
            }
           
       break;
       case 'کد محصول':
        try {
                 
            const pn= await prisma.product.update({
                        where:{ id: idd }
                        ,data:{productcode:Editinput}
                    })
                    
                   return Response.json({pn})
                        } catch (error) {
                           
                            return Response.json({error})
                        }
       break;
       case 'قیمت':

       try {
             const pricenum=parseFloat(Editinput)    
        const pn= await prisma.product.update({
                    where:{ id: idd }
                    ,data:{price:pricenum}
                })
                
               return Response.json({pn})
                    } catch (error) {
                       
                        return Response.json({error})
                    }
   break;
   case 'تعداد':
    try {
        const quanitynum=parseFloat(Editinput)     
        const pn= await prisma.product.update({
                    where:{ id: idd }
                    ,data:{quanity:quanitynum}
                })
                
               return Response.json({pn})
                    } catch (error) {
                       
                        return Response.json({error})
                    }
break;

    }
        
    } catch (error) {
        return Response.json({status:500})
    }
}