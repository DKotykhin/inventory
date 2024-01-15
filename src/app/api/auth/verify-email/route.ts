import userService from '@/services/userService';
import { handleError } from '@/handlers/handleError';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { status } = await userService.verifyEmail(data);

        return Response.json({
            message: `User successfully verified.`,
            status,
        });
    } catch (error) {
        return handleError(error);
    }
}
