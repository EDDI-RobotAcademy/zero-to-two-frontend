"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { getListingById } from '@/lib/repositories/listingRepository';
import { getLandlordContacts } from '@/lib/repositories/landlordRepository';
import { ContactRequest } from '@/types/contact';
import { Listing } from '@/types/listing';

export default function LandlordContactsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [listingMap, setListingMap] = useState<Record<string, Listing | null>>({});

  useEffect(() => {
    (async () => {
      const data = await getLandlordContacts('landlord-1');
      setContacts(data);
      const entries = await Promise.all(
        data.map(async (contact) => [contact.listingId, await getListingById(contact.listingId)]),
      );
      setListingMap(Object.fromEntries(entries) as Record<string, Listing | null>);
    })();
  }, []);

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">내가 보낸 컨택 요청</h2>
      <div className="space-y-3">
        {contacts.map((contact) => {
          const listing = listingMap[contact.listingId];
          return (
            <Card
              key={contact.id}
              title={listing?.title ?? '알 수 없는 매물'}
              actions={<span className="text-sm text-gray-600">상태: {contact.status}</span>}
            >
              <p className="text-sm text-gray-700">
                임차인: {contact.tenantId} · 요청일:{' '}
                {new Date(contact.createdAt).toLocaleDateString('ko-KR')}
              </p>
              {contact.status === 'accepted' && (
                <p className="mt-2 text-sm text-emerald-700">
                  임차인 연락처: {contact.tenantPhone ?? '제공됨'}
                </p>
              )}
              <Button
                className="mt-3"
                variant="secondary"
                onClick={() => (window.location.href = `/landlord/tenants/${contact.tenantId}`)}
              >
                의뢰서 다시 보기
              </Button>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
