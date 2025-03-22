import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

interface SearchResponse {
    product: Product[];
    message?: string;
}

async function fetchProducts(searchValue: string): Promise<Product[]> {
    try {
        const response = await fetch('/api/PEsearchresult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchvalueprop: searchValue }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data: SearchResponse = await response.json();
        return data.product;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
}

export const useAPR = (searchValue: string) => {
    return useQuery({
        queryKey: ['product-search', searchValue],
        queryFn: () => fetchProducts(searchValue),
        enabled: !!searchValue,
    });
};