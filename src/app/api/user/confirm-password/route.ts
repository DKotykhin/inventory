import { headers } from 'next/headers';

import { handleError } from '@/handlers/handleError';
import userService from '@/services/userService';

export async function POST(req: Request) {
    try {
        const token = headers().get('authorization') || "";

        const { password } = await req.json();
        const { status } = await userService.confirmPassword(password, token);

        return Response.json({
            message: `Password confirmed`,
            status,
        });
    } catch (error) {
        return handleError(error);
    }
}