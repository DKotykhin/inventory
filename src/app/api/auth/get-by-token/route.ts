import { handleError } from '@/handlers/handleError';
import userService from '@/services/userService';

import { headers } from 'next/headers';

export async function GET() {
    try {        
        const token = headers().get('authorization') || "";

        const user = await userService.getUserByToken(token);

        return Response.json({
            user,
        });
    } catch (error) {
        return handleError(error);
    }
}
