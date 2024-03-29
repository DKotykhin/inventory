"use client";

import { cn } from '@/utils/cn';
import React, { useState, useEffect } from 'react';

export const ConnectionCounter = () => {

    const [connectionCount, setConnectionCount] = useState(0);

    useEffect(() => {
        const newWs = new WebSocket(process.env.NEXT_PUBLIC_WS_SERVER as string);

        // newWs.onopen = () => console.log('WebSocket connected');

        newWs.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type === 'connection count') {
                setConnectionCount(data.count);
            }
        };

        newWs.onclose = () => setConnectionCount(0);
        newWs.onerror = (error: any) => console.log('WebSocket error:', error);

        return () => newWs.close();
    }, []);

    return (
        <div className='flex items-center gap-1 text-sm text-grey'>
            <div className={cn(
                'w-2 h-2 rounded-full',
                connectionCount > 0 ? 'bg-green' : 'bg-grey',
            )} />
            <p>{connectionCount}</p>
        </div>
    );
};
