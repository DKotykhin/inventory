import { db } from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

import { ApiError } from '@/handlers/apiError';
import { checkAuth } from '@/utils/_index';

class UploadService {
    async uploadAvatar(formData: any, token: string) {
        const { id } = checkAuth(token);
        const file = formData.get('avatar') as File | null;

        if (!file) {
            throw ApiError.badRequest('No file uploaded.');
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadData = 'data:image/png;base64,' + buffer.toString("base64");
        
        const fileType = file.type;
        if (!fileType.startsWith("image")) {
            throw ApiError.badRequest('Incorrect file type.');
        }

        const result = await cloudinary.uploader.upload(uploadData, {
            folder: 'avatars',
            resource_type: 'image',
            transformation: [
                { width: 100, height: 100, crop: 'fill', fetch_format: 'auto' },
            ],
            public_id: id,
            overwrite: true,
        }, (error, result) => {
            if (error) {
                throw ApiError.badRequest("Can't upload avatar");
            }
            return result;
        });

        try {            
            await db.user.update({
                where: { id },
                data: { avatar: result.secure_url },
            });
        } catch (error) {
            throw ApiError.internalError("Can't update avatar");
        }

        return { avatar: result.secure_url };
    }
}

const uploadService = new UploadService();

export default uploadService;
