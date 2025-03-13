import { useQuery } from "react-query";
//flip is used for the filterss parameters to work
export const useAGetproducts = (page, price, category, brand, searchprop?) => {
    async function queryfunction() {
        try {
            const res = await fetch("http://localhost:3000/api/gettingproducts", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page, price, category, brand, searchprop })
            });
            if (res.ok) {
                const datas = await res.json();
                const products = datas.products;
                return products;
            }
        } catch (error) {
            return error;
        }
    }
    return useQuery(['pages', page, category, brand, searchprop, price.price1, price.price2], queryfunction);
}

