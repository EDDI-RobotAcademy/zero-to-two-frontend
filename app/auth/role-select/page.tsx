import Link from 'next/link';
import { Card } from '@/components/common/Card';

export default function RoleSelectPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">역할을 선택하세요</h1>
      <Card title="부동산 매칭 시작" actions={null}>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center font-semibold text-blue-700 hover:bg-blue-100"
            href="/auth/login?role=tenant"
          >
            임차인으로 시작하기
          </Link>
          <Link
            className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center font-semibold text-emerald-700 hover:bg-emerald-100"
            href="/auth/login?role=landlord"
          >
            임대인으로 시작하기
          </Link>
        </div>
      </Card>
    </main>
  );
}
