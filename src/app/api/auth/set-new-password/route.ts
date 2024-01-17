import { handleError } from '@/handlers/handleError';
import userService from '@/services/userService';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { status } = await userService.setNewPassword(data);

        return Response.json({
            message: `New password successfully set`,
            status,
        });
    } catch (error) {
        return handleError(error);
    }
}
