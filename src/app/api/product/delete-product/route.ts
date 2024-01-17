import { handleError } from '@/handlers/handleError';
import productService from '@/services/productService';

import { headers } from 'next/headers';

export async function DELETE(req: Request) {
    try {
        const id = await req.json();
        const token = headers().get('authorization') || '';
        await productService.deleteProduct(id, token);

        return Response.json({
            message: `Order successfully deleted.`,
            status: true,
        });
    } catch (error) {
        return handleError(error);
    }
}
