import { useQuery } from "react-query";




export const useAGetproducts = (page,price,category,flip) => {
    async function queryfunction() {
        try {
            const res = await fetch("http://localhost:3000/api/gettingproducts",{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page,price,category })

            });
            if (res.ok) {
                const datas = await res.json();
                const products = datas.products;
                return products;
            }
        } catch (error) {
            return error
        }
    }
    return useQuery(['pages',page,flip], queryfunction)
}

