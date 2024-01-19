"use client";

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

import { useUserStore } from '@/stores/userStore';

export const UserTable = () => {

    const { userData } = useUserStore();

    return (
        <Table aria-label="User table" className='w-[500px]' hideHeader isStriped>
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell className='font-semibold'>Name</TableCell>
                    <TableCell>{userData.userName}</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell className='font-semibold'>Email</TableCell>
                    <TableCell>{userData.email}</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell className='font-semibold'>Created</TableCell>
                    <TableCell>{new Date(userData.createdAt || '').toLocaleString()}</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell className='font-semibold'>Role</TableCell>
                    <TableCell>{userData.role}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
