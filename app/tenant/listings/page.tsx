"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { listRecommendedListings } from '@/lib/repositories/listingRepository';
import { getTenantRequest } from '@/lib/repositories/tenantRepository';
import { Listing } from '@/types/listing';
import { TenantRequest } from '@/types/tenant';

export default function TenantListingsPage() {
  const router = useRouter();
  const [request, setRequest] = useState<TenantRequest | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    (async () => {
      const req = await getTenantRequest();
      setRequest(req);
      const rec = await listRecommendedListings(req ?? undefined);
      setListings(rec);
    })();
  }, []);

  const sortByPrice = () => {
    setListings((prev) => [...prev].sort((a, b) => a.price - b.price));
  };

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">추천 매물</h2>
          {request ? (
            <p className="text-sm text-gray-600">
              {request.region} · {request.listingType} · {request.contractType}
            </p>
          ) : (
            <p className="text-sm text-gray-600">의뢰서 없이 기본 추천이 표시됩니다.</p>
          )}
        </div>
        <Button variant="secondary" onClick={sortByPrice}>
          가격 오름차순
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {listings.map((listing) => (
          <Card
            key={listing.id}
            title={listing.title}
            actions={
              <Button onClick={() => router.push(`/tenant/listings/${listing.id}`)}>상세보기</Button>
            }
          >
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="mb-3 h-40 w-full rounded-md object-cover"
            />
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                {listing.district} · {listing.type}
              </p>
              <p>
                {listing.contractType === 'jeonse' ? '전세' : '매매'} {listing.price.toLocaleString()}
                만원
              </p>
              <p>
                {listing.area}m² · 방 {listing.rooms} · 욕실 {listing.bathrooms}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
