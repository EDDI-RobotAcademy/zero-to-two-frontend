"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useRole } from '@/lib/auth/roleContext';

export default function TenantLayout({ children }: { children: ReactNode }) {
  const { role, isReady } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!role || role !== 'tenant') {
      router.push('/auth/role-select');
    }
  }, [role, router, isReady]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow">
        <div>
          <p className="text-xs uppercase text-blue-600">임차인 전용</p>
          <h1 className="text-2xl font-bold">Tenant Dashboard</h1>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm font-medium">
          <Link href="/tenant" className="rounded px-3 py-2 hover:bg-blue-50">
            홈
          </Link>
          <Link href="/tenant/request" className="rounded px-3 py-2 hover:bg-blue-50">
            내 의뢰서
          </Link>
          <Link href="/tenant/listings" className="rounded px-3 py-2 hover:bg-blue-50">
            추천 매물
          </Link>
          <Link href="/tenant/contacts" className="rounded px-3 py-2 hover:bg-blue-50">
            임대인 컨택
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
