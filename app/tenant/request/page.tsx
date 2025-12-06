"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { getTenantRequest } from '@/lib/repositories/tenantRepository';
import { TenantRequest } from '@/types/tenant';

export default function TenantRequestPage() {
  const [request, setRequest] = useState<TenantRequest | null>(null);

  useEffect(() => {
    getTenantRequest().then(setRequest);
  }, []);

  if (!request) {
    return (
      <main className="space-y-4">
        <h2 className="text-2xl font-bold">내 매물 의뢰서</h2>
        <Card title="의뢰서 없음" actions={null}>
          <p className="text-gray-700">아직 의뢰서를 작성하지 않았습니다.</p>
          <Button className="mt-3" onClick={() => (window.location.href = '/tenant/request/new')}>
            지금 작성하기
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">내 매물 의뢰서</h2>
      <Card title="요약" actions={<Link href="/tenant/request/new">수정하기</Link>}>
        <dl className="grid grid-cols-2 gap-3 text-sm text-gray-700">
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
          <div>
            <dt className="font-semibold">최소 면적</dt>
            <dd>{request.areaMin} m²</dd>
          </div>
          <div>
            <dt className="font-semibold">방/욕실</dt>
            <dd>
              {request.rooms} / {request.bathrooms}
            </dd>
          </div>
          <div>
            <dt className="font-semibold">입주 가능 시기</dt>
            <dd>{request.moveInDate}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-semibold">기타</dt>
            <dd>{request.notes || '-'}</dd>
          </div>
        </dl>
        <Button className="mt-4" onClick={() => (window.location.href = '/tenant/listings')}>
          이 조건으로 추천 매물 보기
        </Button>
      </Card>
    </main>
  );
}
