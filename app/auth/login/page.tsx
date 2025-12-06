"use client";

import { FormEvent, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useRole } from '@/lib/auth/roleContext';
import { Button } from '@/components/common/Button';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const roleParam = searchParams.get('role');
  const roleLabel = roleParam === 'tenant' ? '임차인' : roleParam === 'landlord' ? '임대인' : null;

  const nextPath = useMemo(() => {
    if (roleParam === 'tenant') return '/tenant';
    if (roleParam === 'landlord') return '/landlord';
    return '/auth/role-select';
  }, [roleParam]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (roleParam !== 'tenant' && roleParam !== 'landlord') {
      router.push('/auth/role-select');
      return;
    }
    login(roleParam);
    router.push(nextPath);
  };

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">선택한 역할</p>
          <h1 className="text-3xl font-bold">{roleLabel ?? '역할이 선택되지 않았습니다'}</h1>
        </div>
        <Link className="text-sm text-blue-600 underline" href="/auth/role-select">
          역할 다시 선택하기
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="example@email.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">소셜 로그인</p>
        <div className="grid gap-2 md:grid-cols-3">
          <button
            type="button"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Google로 계속하기
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-gray-300 bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100"
          >
            Kakao로 계속하기
          </button>
          <button
            type="button"
            className="w-full rounded-md border border-gray-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
          >
            Naver로 계속하기
          </button>
        </div>
        <p className="text-xs text-gray-500">
          (데모) 버튼은 UI용으로만 제공되며 실제 소셜 로그인 연동은 포함되어 있지 않습니다.
        </p>
      </div>
    </main>
  );
}
