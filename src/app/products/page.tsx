'use client'

import ProductList from "@/components/ProductList"
import Providers from "@/components/Providers"

 

export default  function Products(){



    return<div className="mb-[6rem]">

        products
 
   <ProductList/>
    
    </div>
}


//getting product data using a fetch and then giving to props of components to render it,
//it should  be an array of objects to map through
//its and object called product that contains an array so it data.product.map that maps through the items and 
//it could be a component structutre that takes props or it could be an array
//first i used fetch,then i used it inside useeffect, i wanna use react query,


//products filter needs an api endpoint that takes price,brand and category to filter out the desired products,
//it should be a state that takes values and then return them in an object, the result will be sent to products list to prop it 
//to the products card component, it could be inside the product list then on apply the changes gets applyed to the client too
//