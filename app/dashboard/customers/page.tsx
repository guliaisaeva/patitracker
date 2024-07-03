import React from 'react';
import { Metadata } from 'next';
import Table from '@/app/components/customers/table';

export const metadata: Metadata = {
  title: 'Customers',
};

function Page() {
  return <div> <Table customers={[]}/></div>;
}

export default Page;
