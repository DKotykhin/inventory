import { Metadata } from 'next';

import { mainPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = mainPageMetaData;

export default async function Home() {

  return (
    <main>
      <h1 className="">Main Page</h1>
    </main>
  );
}
