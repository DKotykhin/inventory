import { Metadata } from 'next';

import { mainPageMetaData } from '@/metadata/metadata';
import { Orders } from './components/Orders';

export const metadata: Metadata = mainPageMetaData;

export default async function Home() {

    return <Orders />;
}
