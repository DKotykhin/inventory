import { Resend } from 'resend';

import { ApiError } from '@/handlers/apiError';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const mailSender = async ({
    to,
    subject,
    react,
}: {
    to: string;
    subject: string;
    react: any;
}) => {
    const { data, error } = await resend.emails.send({
        from: `No-reply service <${process.env.RESEND_EMAIL_ADDRESS}>`,
        to,
        subject,
        react,
    });
    if (error) throw ApiError.internalError(error.message || "Can't send email");
    return data;
};
