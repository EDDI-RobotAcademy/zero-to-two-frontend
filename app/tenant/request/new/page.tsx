"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { saveTenantRequest } from '@/lib/repositories/tenantRepository';

const districts = ['마포구', '용산구', '영등포구'];
const listingTypes = ['apartment', 'officetel', 'villa', 'house', 'commercial'];
const contractTypes = ['jeonse', 'sale'];

export default function TenantRequestNewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    region: '마포구',
    listingType: 'apartment',
    contractType: 'jeonse',
    budget: 80000,
    areaMin: 60,
    rooms: 2,
    bathrooms: 1,
    moveInDate: '2024-09-01',
    notes: '',
  });

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await saveTenantRequest({ tenantId: 'tenant-1', ...form });
    router.push('/tenant/request');
  };

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">매물 의뢰 작성</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            지역(구)
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.region}
              onChange={(e) => handleChange('region', e.target.value)}
            >
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            매물 종류
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.listingType}
              onChange={(e) => handleChange('listingType', e.target.value)}
            >
              {listingTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            계약 형태
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.contractType}
              onChange={(e) => handleChange('contractType', e.target.value)}
            >
              {contractTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            예산(만원)
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.budget}
              onChange={(e) => handleChange('budget', Number(e.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            최소 면적(m²)
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.areaMin}
              onChange={(e) => handleChange('areaMin', Number(e.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            방 개수
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.rooms}
              onChange={(e) => handleChange('rooms', Number(e.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            욕실 개수
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.bathrooms}
              onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
            />
          </label>
          <label className="space-y-2 text-sm font-semibold text-gray-700">
            입주 가능 시기
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={form.moveInDate}
              onChange={(e) => handleChange('moveInDate', e.target.value)}
            />
          </label>
        </div>
        <label className="space-y-2 text-sm font-semibold text-gray-700">
          기타 요청사항
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            rows={4}
            value={form.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
          />
        </label>
        <div className="flex gap-3">
          <Button type="submit">작성 완료</Button>
          <Button type="button" variant="secondary" onClick={() => router.push('/tenant')}>
            취소
          </Button>
        </div>
      </form>
    </main>
  );
}
