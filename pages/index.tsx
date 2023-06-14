import { type ReactNode } from 'react';

import { Layout } from '../src/components/shared/Layout';

export default function Home() {
  return (
    <>
      <main></main>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>;
};
