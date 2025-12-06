import { tenantRequestMock } from '@/mocks/tenant/request.mock';
import { ContactRequest, ContactStatus } from '@/types/contact';
import { TenantRequest } from '@/types/tenant';
import {
  addContact,
  getContactsByTenant,
  updateContactStatus,
} from './contactStore';

let tenantRequestStore: TenantRequest | null = tenantRequestMock;

export async function getTenantRequest(tenantId = 'tenant-1'): Promise<TenantRequest | null> {
  if (tenantRequestStore?.tenantId === tenantId) {
    return tenantRequestStore;
  }
  return null;
}

export async function saveTenantRequest(
  payload: Omit<TenantRequest, 'id'>,
): Promise<TenantRequest> {
  const existingId = tenantRequestStore?.id ?? `tenant-request-${Date.now()}`;
  tenantRequestStore = {
    ...payload,
    id: existingId,
  };
  return tenantRequestStore;
}

export async function getTenantContacts(tenantId: string): Promise<ContactRequest[]> {
  return getContactsByTenant(tenantId);
}

export async function updateTenantContactStatus(
  contactId: string,
  status: ContactStatus,
): Promise<ContactRequest | null> {
  return updateContactStatus(contactId, status);
}

export async function getTenantRequestById(tenantId: string): Promise<TenantRequest | null> {
  return getTenantRequest(tenantId);
}

export function appendTenantContact(contact: ContactRequest) {
  addContact(contact);
}
