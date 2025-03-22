import { useMutation } from "@tanstack/react-query";

interface Category {
    id: number;
    name: string;
    imageUrl?: string;
}

interface CategoryResponse {
    category: Category;
}

interface PostCategoryImageParams {
    categoryvalue: string;
    categoryimageurl: string;
}

async function postCategoryImage({ categoryvalue, categoryimageurl }: PostCategoryImageParams): Promise<Category> {
    try {
        const response = await fetch('/api/POSTcategoryimage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoryvalue, categoryimageurl })
        });

        if (!response.ok) {
            throw new Error('Failed to post category image');
        }

        const data: CategoryResponse = await response.json();
        return data.category;
    } catch (error) {
        throw new Error('Failed to post category image');
    }
}

export const useAPostcategoryimage = (categoryvalue: string, categoryimageurl: string) => {
    return useMutation({
        mutationFn: () => postCategoryImage({ categoryvalue, categoryimageurl }),
    });
};