"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { getLandlordContacts, getLandlordListings } from '@/lib/repositories/landlordRepository';
import { Listing } from '@/types/listing';
import { ContactRequest } from '@/types/contact';

export default function LandlordHomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getLandlordListings('landlord-1');
      setListings(data);
      const contactData = await getLandlordContacts('landlord-1');
      setContacts(contactData);
    })();
  }, []);

  const pendingContacts = contacts.filter((c) => c.status === 'pending').length;

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">임대인 홈</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="매물 현황" actions={<span className="text-sm text-gray-600">전체</span>}>
          <p className="text-3xl font-bold">{listings.length}개</p>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => (window.location.href = '/landlord/listings/new')}>
              매물 등록하기
            </Button>
            <Button variant="secondary" onClick={() => (window.location.href = '/landlord/listings')}>
              내 매물 목록 보기
            </Button>
          </div>
        </Card>
        <Card title="컨택 요청" actions={<span className="text-sm text-gray-600">대기</span>}>
          <p className="text-3xl font-bold">{pendingContacts}건</p>
          <Button className="mt-3" onClick={() => (window.location.href = '/landlord/contacts')}>
            컨택 요청 현황 보기
          </Button>
        </Card>
      </div>
      <Card title="빠른 이동" actions={null}>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <Link className="rounded bg-emerald-50 px-3 py-2" href="/landlord/listings/new">
            매물 등록하기
          </Link>
          <Link className="rounded bg-emerald-50 px-3 py-2" href="/landlord/listings">
            내 매물 목록 보기
          </Link>
          <Link className="rounded bg-emerald-50 px-3 py-2" href="/landlord/contacts">
            컨택 요청 보기
          </Link>
        </div>
      </Card>
    </main>
  );
}
