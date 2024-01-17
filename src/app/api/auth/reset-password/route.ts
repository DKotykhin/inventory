import { handleError } from '@/handlers/handleError';
import userService from '@/services/userService';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        const { status } = await userService.resetPassword({email});

        return Response.json({
            message: `Link successfully sent to ${email}`,
            status,
        });
    } catch (error) {
        return handleError(error);
    }
}