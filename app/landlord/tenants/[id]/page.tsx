"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { getTenantRequestById } from '@/lib/repositories/tenantRepository';
import { sendContactRequest } from '@/lib/repositories/landlordRepository';
import { TenantRequest } from '@/types/tenant';

export default function LandlordTenantDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [tenantRequest, setTenantRequest] = useState<TenantRequest | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getTenantRequestById(params.id).then(setTenantRequest);
  }, [params.id]);

  const handleContact = async () => {
    if (!tenantRequest) return;
    await sendContactRequest(tenantRequest.tenantId, 'listing-1', 'landlord-1');
    setMessage('컨택 요청을 보냈습니다.');
  };

  if (!tenantRequest) {
    return (
      <main className="space-y-4">
        <p className="text-gray-600">임차인 정보를 찾을 수 없습니다.</p>
        <Button variant="secondary" onClick={() => router.back()}>
          돌아가기
        </Button>
      </main>
    );
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">임차인 의뢰서 상세</h2>
        <Button variant="secondary" onClick={() => router.back()}>
          뒤로가기
        </Button>
      </div>
      {message && <p className="text-sm text-emerald-600">{message}</p>}
      <Card title={`임차인 ${tenantRequest.tenantId}`} actions={null}>
        <dl className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <div>
            <dt className="font-semibold">지역</dt>
            <dd>{tenantRequest.region}</dd>
          </div>
          <div>
            <dt className="font-semibold">매물 종류</dt>
            <dd>{tenantRequest.listingType}</dd>
          </div>
          <div>
            <dt className="font-semibold">계약 형태</dt>
            <dd>{tenantRequest.contractType}</dd>
          </div>
          <div>
            <dt className="font-semibold">예산</dt>
            <dd>{tenantRequest.budget.toLocaleString()} 만원</dd>
          </div>
          <div>
            <dt className="font-semibold">면적</dt>
            <dd>{tenantRequest.areaMin} m² 이상</dd>
          </div>
          <div>
            <dt className="font-semibold">방/욕실</dt>
            <dd>
              {tenantRequest.rooms} / {tenantRequest.bathrooms}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="font-semibold">입주 가능 시기</dt>
            <dd>{tenantRequest.moveInDate}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-semibold">기타 요청사항</dt>
            <dd>{tenantRequest.notes ?? '-'}</dd>
          </div>
        </dl>
        <Button className="mt-4" onClick={handleContact}>
          컨텍하기
        </Button>
      </Card>
    </main>
  );
}
