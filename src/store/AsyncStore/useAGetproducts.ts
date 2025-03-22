import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";

interface ProductsResponse {
    products: Product[];
    total?: number;
}

interface PriceRange {
    price1: number;
    price2: number;
}

interface ProductsParams {
    page: number;
    price: PriceRange;
    category?: string;
    brand?: string;
    searchprop?: string;
}

async function fetchProducts(params: ProductsParams): Promise<Product[]> {
    try {
        const response = await fetch('/api/gettingproducts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data: ProductsResponse = await response.json();
        return data.products;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
}

export const useAGetproducts = (page: number, price: PriceRange, category?: string, brand?: string, searchprop?: string) => {
    return useQuery({
        queryKey: ['products', page, category, brand, searchprop, price.price1, price.price2],
        queryFn: () => fetchProducts({ page, price, category, brand, searchprop }),
    });
};

