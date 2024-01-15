import { Metadata } from 'next';

import { mainPageMetaData } from '@/metadata/metadata';

export const metadata: Metadata = mainPageMetaData;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1 className="text-6xl font-bold">Hello World</h1>
    </main>
  );
}
