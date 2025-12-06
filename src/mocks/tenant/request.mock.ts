import { TenantRequest } from '@/types/tenant';

export let tenantRequestMock: TenantRequest | null = {
  id: 'tenant-request-1',
  tenantId: 'tenant-1',
  region: '마포구',
  listingType: 'apartment',
  contractType: 'jeonse',
  budget: 100000,
  areaMin: 70,
  rooms: 3,
  bathrooms: 2,
  moveInDate: '2024-09-01',
  notes: '반려동물 동반 가능하면 좋겠어요.',
};
