import { handleError } from '@/handlers/handleError';
import userService from '@/services/userService';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { user, token } = await userService.signIn(data);

        return Response.json({
            message: `User ${user?.email} successfully logged.`,
            user,
            token,
        });
    } catch (error) {
        return handleError(error);
    }
}
