import React from 'react';

interface EmailTemplateProps {
    token: string;
}

export const ResetPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    token,
}) => (
    <div>
        <h2>
            Please, follow the link to set new password
        </h2>
        <h4>
            If you don&apos;t restore your password ignore this mail
        </h4>
        <p>
            <a href={`${process.env.FRONT_URL}/set-new-password/${token}`}>
                Link for set new password
            </a>
        </p>
    </div>
);

export const VerifyEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    token,
}) => (
    <div>
        <h2>
            Please, follow the link to verify email
        </h2>
        <h4>
            If you don&apos;t verify your email ignore this mail
        </h4>
        <p>
            <a href={`${process.env.FRONT_URL}/verify-email/${token}`}>
                Link for email verification
            </a>
        </p>
    </div>
);
