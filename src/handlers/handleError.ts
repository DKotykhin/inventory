import { NextResponse } from 'next/server';

import { ApiError } from './apiError';

function handleError(error: unknown): Response {
    if (error instanceof ApiError) {
        // console.error(error);

        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: error?.status || 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    // console.error('Unknown error:', error);
    return new NextResponse(JSON.stringify({ message: 'Unknown error occurred.' }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export { handleError };
