import { handleError } from '@/handlers/handleError';
import productService from '@/services/productService';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit');
        const page = searchParams.get('page');

        const { products, totalCount, totalPages } = await productService.getProducts({
            limit,
            page,
        });

        return Response.json({
            products,
            totalCount,
            totalPages,
        });
    } catch (error) {
        return handleError(error);
    }
}
