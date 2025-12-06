"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useRole } from '@/lib/auth/roleContext';

export default function LandlordLayout({ children }: { children: ReactNode }) {
  const { role, isReady } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!role || role !== 'landlord') {
      router.push('/auth/role-select');
    }
  }, [role, router, isReady]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-xs uppercase text-emerald-600">임대인 전용</p>
          <h1 className="text-2xl font-bold">Landlord Dashboard</h1>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/landlord" className="rounded px-3 py-2 hover:bg-emerald-50">
            홈
          </Link>
          <Link href="/landlord/listings" className="rounded px-3 py-2 hover:bg-emerald-50">
            내 매물
          </Link>
          <Link href="/landlord/listings/new" className="rounded px-3 py-2 hover:bg-emerald-50">
            매물 등록
          </Link>
          <Link href="/landlord/contacts" className="rounded px-3 py-2 hover:bg-emerald-50">
            컨택 요청
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
