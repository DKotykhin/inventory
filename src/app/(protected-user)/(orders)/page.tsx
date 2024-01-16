import { Metadata } from 'next';

import { mainPageMetaData } from '@/metadata/metadata';
import orderService from '@/services/orderService';
import { Spinner } from '@/components/Spinner';
import { PageTitle } from './components/PageTitle';
import { OrderList } from './components/OrderList';

export const metadata: Metadata = mainPageMetaData;

export default async function Home() {

    const orders = await orderService.getOrders();

    return orders ? (
        <main className='px-16 py-10'>
            <PageTitle orders={orders} />
            <OrderList orders={orders} />
        </main>
    ) : <Spinner />;
}
