import { v2 as cloudinary } from 'cloudinary';

import { ApiError } from '@/handlers/apiError';

interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
    secure: boolean;
}

if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw ApiError.unprocessableEntity('Cloudinary environment variables are not set.');
}

const config: CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
};

cloudinary.config(config);

export default cloudinary;
