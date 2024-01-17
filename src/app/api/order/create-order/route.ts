import { handleError } from '@/handlers/handleError';
import orderService from '@/services/orderService';

import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const order = await orderService.createOrder(data);
        if (order) revalidatePath('/');

        return Response.json({
            message: `Order successfully created.`,
            order,
        });
    } catch (error) {
        return handleError(error);
    }
}