import { Error } from '@/components/Error';
import type { Metadata } from 'next';

import { errorPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = errorPageMetaData;

export default function NotFound() {

    return <Error />;
};