import { useQuery } from "@tanstack/react-query";

interface PricedOffProduct {
    id: string;
    productname: string;
    productcode: string;
    price: number;
    priceoff: number;
    images: string;
}

async function fetchPricedOffProducts(): Promise<PricedOffProduct[]> {
    try {
        const res = await fetch('/api/Getpricedoffproducts');
        if (!res.ok) {
            throw new Error('Failed to fetch priced off products');
        }
        const data = await res.json();
        return data.pricedoff;
    } catch (error) {
        throw new Error('Failed to fetch priced off products');
    }
}

export const useAGetpricedoffproducts = () => {
    return useQuery({
        queryKey: ['pricedoff'],
        queryFn: fetchPricedOffProducts
    });
};