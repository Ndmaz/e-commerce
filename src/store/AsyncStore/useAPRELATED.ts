import { useQuery } from "@tanstack/react-query";

interface RelatedProduct {
    id: string;
    productname: string;
    price: number;
    images: string;
    category: {
        id: number;
        name: string;
    };
}

interface RelatedProductsResponse {
    products: RelatedProduct[];
    total: number;
}

interface RelatedProductsError {
    error: string;
    details?: Record<string, unknown>;
}

async function fetchRelatedProducts(categoryId: string | number, isSegment: boolean): Promise<RelatedProductsResponse> {
    try {
        const response = await fetch('/api/Relatedproducts', {
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

        return response.json();
    } catch (error) {
        throw error;
    }
}

export const useAPRELATED = (categoryId: string | number, isSegment: boolean) => {
    return useQuery({
        queryKey: ['related-products', categoryId, isSegment],
        queryFn: () => fetchRelatedProducts(categoryId, isSegment),
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
        gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
        retry: 2,
        refetchOnWindowFocus: false
    });
};