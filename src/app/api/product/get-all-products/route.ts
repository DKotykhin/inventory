import { handleError } from '@/handlers/handleError';
import productService from '@/services/productService';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit');
        const page = searchParams.get('page');
        const type = searchParams.get('type');

        const { products, totalCount, totalPages, productTypeList } = await productService.getProducts({
            limit,
            page,
            type,
        });

        return Response.json({
            products,
            totalCount,
            totalPages,
            productTypeList,
        });
    } catch (error) {
        return handleError(error);
    }
}
