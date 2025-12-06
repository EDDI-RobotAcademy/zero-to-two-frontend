"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { getTenantRequest } from '@/lib/repositories/tenantRepository';
import { TenantRequest } from '@/types/tenant';

export default function TenantHomePage() {
  const [request, setRequest] = useState<TenantRequest | null>(null);

  useEffect(() => {
    getTenantRequest().then(setRequest);
  }, []);

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">임차인 홈</h2>
      {!request ? (
        <Card title="내 매물 의뢰서" actions={null}>
          <p className="text-gray-700">아직 작성한 매물 의뢰서가 없습니다.</p>
          <Button className="mt-3" onClick={() => (window.location.href = '/tenant/request/new')}>
            매물 의뢰 작성하기
          </Button>
        </Card>
      ) : (
        <Card
          title="내 의뢰서 요약"
          actions={
            <Link className="text-sm text-blue-600 underline" href="/tenant/request">
              상세보기
            </Link>
          }
        >
          <dl className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div>
              <dt className="font-semibold">지역</dt>
              <dd>{request.region}</dd>
            </div>
            <div>
              <dt className="font-semibold">매물 종류</dt>
              <dd>{request.listingType}</dd>
            </div>
            <div>
              <dt className="font-semibold">계약 형태</dt>
              <dd>{request.contractType}</dd>
            </div>
            <div>
              <dt className="font-semibold">예산</dt>
              <dd>{request.budget.toLocaleString()} 만원</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => (window.location.href = '/tenant/listings')}>
              추천 매물 보러가기
            </Button>
            <Button
              variant="secondary"
              onClick={() => (window.location.href = '/tenant/contacts')}
            >
              임대인 컨택 확인하기
            </Button>
          </div>
        </Card>
      )}
    </main>
  );
}
