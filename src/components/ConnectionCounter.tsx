"use client";

import React, { useState, useEffect } from 'react';

export const ConnectionCounter = () => {

    const [connectionCount, setConnectionCount] = useState(0);

    useEffect(() => {
        const newWs = new WebSocket('wss://inventory-backend-1-7f739e60a909.herokuapp.com');

        // newWs.onopen = () => console.log('WebSocket connected');

        newWs.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            if (data.type === 'connection count') {
                setConnectionCount(data.count);
            }
        };

        // newWs.onclose = () => console.log('WebSocket disconnected');
        // newWs.onerror = (error: any) => console.log('WebSocket error:', error);

        return () => {
            if (newWs.readyState === newWs.OPEN) newWs.close();
        };
    }, []);

    return (
        <div className='flex items-center gap-1 text-sm text-grey'>
            <p className='w-2 h-2 bg-green rounded-full'></p>
            <p>{connectionCount}</p>
        </div>
    );
};
