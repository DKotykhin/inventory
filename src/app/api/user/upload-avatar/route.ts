import { headers } from 'next/headers';

import uploadService from '@/services/uploadService';
import { handleError } from '@/handlers/handleError';

export async function POST(req: Request) {
    try {
        const token = headers().get('authorization') || "";

        const formData = await req.formData();
        const { avatar } = await uploadService.uploadAvatar(formData, token);

        return Response.json({
            message: `Avatar successfully uploaded.`,
            avatar,
        });
    } catch (error) {
        return handleError(error);
    }
}
