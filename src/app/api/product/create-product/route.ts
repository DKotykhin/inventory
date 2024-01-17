import { handleError } from '@/handlers/handleError';
import productService from '@/services/productService';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const product = await productService.createProduct(data);

        return Response.json({
            message: `Product successfully created.`,
            product,
        });
    } catch (error) {
        return handleError(error);
    }
}
