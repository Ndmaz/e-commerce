import { useQuery } from "react-query"

type RelatedProduct = {
    id: string;
    productname: string;
    price: number;
    images: string;
    category: {
        id: number;
        name: string;
    };
}

type RelatedProductsResponse = {
    products: RelatedProduct[];
    total: number;
}

interface RelatedProductsError {
    error: string;
    details?: Record<string, unknown>;
}

export const useAPRELATED = (categoryId: string | number, isSegment: boolean) => {
    return useQuery<RelatedProductsResponse, RelatedProductsError>(
        ['related-products', categoryId, isSegment],
        async () => {
            const response = await fetch('http://localhost:3000/api/Relatedproducts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categoryid: categoryId, issegment: isSegment })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw {
                    error: errorData.error || 'Failed to fetch related products',
                    details: errorData.details
                };
            }

            const data = await response.json();
            return data;
        },
        {
            staleTime: 5 * 60 * 1000, // Cache for 5 minutes
            cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
            retry: 2,
            refetchOnWindowFocus: false
        }
    );
};