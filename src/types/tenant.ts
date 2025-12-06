import { ContractType, ListingType } from './listing';

export interface TenantProfile {
  id: string;
  nickname: string;
  phone?: string;
}

export interface TenantRequest {
  id: string;
  tenantId: string;
  region: string;
  listingType: ListingType;
  contractType: ContractType;
  budget: number;
  areaMin: number;
  rooms: number;
  bathrooms: number;
  moveInDate: string;
  notes?: string;
}
