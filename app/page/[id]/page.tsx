export default function PageDetail({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Page ID: {params.id}</h1>
      <p className="mt-2 text-sm text-gray-600">라우팅 테스트용 페이지입니다.</p>
    </main>
  );
}
