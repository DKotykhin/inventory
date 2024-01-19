import { headers } from 'next/headers';

import { handleError } from '@/handlers/handleError';
import userService from '@/services/userService';

export async function POST(req: Request) {
    try {
        const token = headers().get('authorization') || '';

        const { password } = await req.json();
        const { status } = await userService.updatePassword(password, token);

        return Response.json({
            message: `Password has been changed`,
            status,
        });
    } catch (error) {
        return handleError(error);
    }
}
