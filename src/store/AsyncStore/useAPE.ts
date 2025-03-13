import { useQuery } from "react-query"
import { Product } from "@/types/product"

interface SearchResponse {
    products: Product[]
    message?: string
}

interface SearchError {
    message: string
    status?: number
}

//the fetch and the data to fetch

export const useAPE = (searchValue: string) => {
    const queryFunction = async (): Promise<Product[]> => {
        try {
            const response = await fetch('/api/PEsearchresult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchValue }),
            })

            if (!response.ok) {
                const error: SearchError = await response.json()
                throw new Error(error.message || 'خطا در جستجوی محصول')
            }

            const data: SearchResponse = await response.json()
            return data.products
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
            throw new Error('خطای ناشناخته در جستجوی محصول')
        }
    }

    return useQuery<Product[], Error>(
        ['product-search', searchValue],
        queryFunction,
        {
            enabled: !!searchValue,
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: 2,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        }
    )
}
