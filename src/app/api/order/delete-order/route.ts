import { handleError } from '@/handlers/handleError';
import orderService from '@/services/orderService';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export async function DELETE(req: Request) {
    try {
        const id = await req.json();
        const token = headers().get('authorization') || '';
        const res = await orderService.deleteOrder(id, token);
        if (res) revalidatePath('/');

        return Response.json({
            message: `Order successfully deleted.`,
            status: true,
        });
    } catch (error) {
        return handleError(error);
    }
}
