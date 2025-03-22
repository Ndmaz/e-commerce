import { useQuery } from "@tanstack/react-query";

interface Category {
    id: number;
    name: string;
    imageUrl?: string;
}

interface CategoriesResponse {
    categories: Category[];
}

async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch('/api/getcategory');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data: CategoriesResponse = await response.json();
        return data.categories;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
}

export const useAGetcategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });
};