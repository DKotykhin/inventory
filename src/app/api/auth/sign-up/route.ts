import userService from '@/services/userService';
import { handleError } from '@/handlers/handleError';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { user } = await userService.signUp(data);

        return Response.json(
            {
                message: `User with email ${user?.email} added to DB.`,
                user,
            },
            { status: 201 }
        );
    } catch (error) {
        return handleError(error);
    }
}
