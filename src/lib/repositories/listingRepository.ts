import { listingMocks } from '@/mocks/listings.mock';
import { Listing } from '@/types/listing';
import { TenantRequest } from '@/types/tenant';

let listingStore: Listing[] = [...listingMocks];

export async function listRecommendedListings(
  tenantRequest?: TenantRequest | null,
): Promise<Listing[]> {
  const base = [...listingStore];
  if (!tenantRequest) {
    return base.sort((a, b) => a.price - b.price);
  }

  const filtered = base.filter((listing) => {
    const matchContract = listing.contractType === tenantRequest.contractType;
    const matchType = listing.type === tenantRequest.listingType;
    const matchRegion =
      listing.district === tenantRequest.region || listing.region.includes(tenantRequest.region);
    const matchBudget = listing.price <= tenantRequest.budget;
    const matchRooms = listing.rooms >= tenantRequest.rooms;
    const matchBaths = listing.bathrooms >= tenantRequest.bathrooms;
    return matchContract && matchType && matchRegion && matchBudget && matchRooms && matchBaths;
  });
  return filtered.sort((a, b) => a.price - b.price);
}

export async function getListingById(id: string): Promise<Listing | null> {
  const listing = listingStore.find((item) => item.id === id);
  return listing ?? null;
}

export async function listLandlordListings(landlordId: string): Promise<Listing[]> {
  return listingStore.filter((listing) => listing.ownerId === landlordId);
}

export async function createListing(
  payload: Omit<Listing, 'id' | 'createdAt'>,
): Promise<Listing> {
  const newListing: Listing = {
    ...payload,
    id: `listing-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  listingStore = [newListing, ...listingStore];
  return newListing;
}
