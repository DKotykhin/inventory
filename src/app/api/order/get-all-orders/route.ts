import { handleError } from '@/handlers/handleError';
import orderService from '@/services/orderService';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit');
        const page = searchParams.get('page');

        const { orders, totalCount, totalPages } = await orderService.getOrders({ limit, page });

        return Response.json({
            orders,
            totalCount,
            totalPages,
        });
    } catch (error) {
        return handleError(error);
    }
}
