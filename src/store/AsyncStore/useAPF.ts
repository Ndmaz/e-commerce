import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

interface ProductResponse {
    product: Product;
}

async function fetchProduct(id: string): Promise<Product> {
    try {
        const response = await fetch('/api/ProductFetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const data: ProductResponse = await response.json();
        return data.product;
    } catch (error) {
        throw new Error('Failed to fetch product');
    }
}

export const useAPF = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id),
        enabled: !!id,
    });
};
