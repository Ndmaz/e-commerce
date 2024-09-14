import { useQuery } from "react-query";




export const useAGetproducts = () => {
    async function queryfunction() {
        try {
            const res = await fetch("http://localhost:3000/api/gettingproducts");
            if (res.ok) {
                const datas = await res.json();
                const products = datas.products;
                return products;
            }
        } catch (error) {
            return error
        }
    }
    return useQuery('datas', queryfunction)
}

