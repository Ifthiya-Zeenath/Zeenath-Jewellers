/**
 * ============================================================================
 * Cloud Firestore Data Service Layer
 * ============================================================================
 * Reusable, strongly-typed Firestore service module interfacing with Cloud
 * Firestore collections: `products`, `categories`, `customRequests`, `enquiries`.
 * ============================================================================
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { db, auth, isFirebaseConfigured } from '../lib/firebase';
import type { ProductCategory, ProductAvailability } from '../data/products';

// Collection Constants
export const COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  CUSTOM_REQUESTS: 'customRequests',
  ENQUIRIES: 'enquiries',
} as const;

// Firestore Document Schemas
export interface FirestoreProduct {
  id: string;
  name: string;
  description: string;
  craftsmanshipNotes?: string;
  hallmarkInfo?: string;
  price: number;
  category: ProductCategory;
  purity: string;
  weight: string;
  productCode: string;
  image: string;
  images?: string[];
  featured: boolean;
  availability: ProductAvailability;
  createdAt: string;
}

export interface FirestoreCategory {
  id: string;
  name: ProductCategory;
  description?: string;
  displayOrder: number;
  active: boolean;
}

export type CustomRequestStatus =
  | 'pending'
  | 'contacted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export const CUSTOM_REQUEST_STATUS_LABELS: Record<CustomRequestStatus, string> = {
  pending: 'Pending',
  contacted: 'Contacted',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export interface FirestoreCustomRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  jewelleryType: string;
  metalType: string;
  budgetRange: string;
  preferredCompletionDate?: string;
  designDescription: string;
  specialRequirements?: string;
  status: CustomRequestStatus;
  createdAt: string;
}

export interface FirestoreEnquiry {
  id?: string;
  customerName: string;
  phone: string;
  email?: string;
  productCode?: string;
  productName?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

/**
 * ============================================================================
 * PRODUCTS COLLECTION OPERATIONS
 * ============================================================================
 */

export const getFirestoreProducts = async (): Promise<FirestoreProduct[]> => {
  if (!isFirebaseConfigured()) return [];

  try {
    const q = query(collection(db, COLLECTIONS.PRODUCTS), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<FirestoreProduct, 'id'>),
    }));
  } catch (err) {
    console.warn('Firestore Products fetch error:', err);
    return [];
  }
};

export const getFirestoreProductById = async (id: string): Promise<FirestoreProduct | null> => {
  if (!isFirebaseConfigured() || !id) return null;

  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<FirestoreProduct, 'id'>),
      };
    }
    return null;
  } catch (err) {
    console.warn(`Firestore Product fetch error for ID ${id}:`, err);
    return null;
  }
};

/**
 * Helper to remove undefined values from objects before writing to Firestore.
 * Firestore Web SDK rejects objects containing properties with `undefined` values.
 */
const sanitizeForFirestore = <T extends Record<string, unknown>>(obj: T): Record<string, unknown> => {
  const sanitized: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      sanitized[key] = obj[key];
    }
  });
  return sanitized;
};

export const addFirestoreProduct = async (
  productData: Omit<FirestoreProduct, 'id' | 'createdAt'> & { createdAt?: string }
): Promise<{ success: boolean; id?: string; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase is not configured.' };
  }

  if (!auth.currentUser) {
    return {
      success: false,
      error: 'Admin user is not authenticated with Firebase Auth. Please sign in again.',
    };
  }

  try {
    const rawPayload = {
      ...productData,
      createdAt: productData.createdAt || new Date().toISOString(),
    };
    const cleanPayload = sanitizeForFirestore(rawPayload as Record<string, unknown>);

    const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), cleanPayload);
    return { success: true, id: docRef.id };
  } catch (err: unknown) {
    console.error('addFirestoreProduct Error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to add product to Firestore.';
    return { success: false, error: msg };
  }
};

export const updateFirestoreProduct = async (
  id: string,
  productData: Partial<Omit<FirestoreProduct, 'id'>>
): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase is not configured.' };
  }

  if (!auth.currentUser) {
    return {
      success: false,
      error: 'Admin user is not authenticated with Firebase Auth. Please sign in again.',
    };
  }

  try {
    const cleanPayload = sanitizeForFirestore(productData as Record<string, unknown>);
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
    await updateDoc(docRef, cleanPayload);
    return { success: true };
  } catch (err: unknown) {
    console.error('updateFirestoreProduct Error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to update product in Firestore.';
    return { success: false, error: msg };
  }
};

export const deleteFirestoreProduct = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase is not configured.' };
  }

  if (!auth.currentUser) {
    return {
      success: false,
      error: 'Admin user is not authenticated with Firebase Auth. Please sign in again.',
    };
  }

  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (err: unknown) {
    console.error('deleteFirestoreProduct Error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to delete product from Firestore.';
    return { success: false, error: msg };
  }
};

/**
 * ============================================================================
 * CUSTOM REQUESTS COLLECTION OPERATIONS
 * ============================================================================
 */

export const submitCustomRequestToFirestore = async (
  requestData: Omit<FirestoreCustomRequest, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase environment variables not set.' };
  }

  try {
    const rawPayload = {
      ...requestData,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };
    const cleanPayload = sanitizeForFirestore(rawPayload as Record<string, unknown>);

    const docRef = await addDoc(collection(db, COLLECTIONS.CUSTOM_REQUESTS), cleanPayload);
    return { success: true, id: docRef.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to submit custom request';
    return { success: false, error: msg };
  }
};

export const getCustomRequests = async (): Promise<FirestoreCustomRequest[]> => {
  if (!isFirebaseConfigured()) return [];

  try {
    const q = query(collection(db, COLLECTIONS.CUSTOM_REQUESTS), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<FirestoreCustomRequest, 'id'>),
    }));
  } catch (err: unknown) {
    console.error('getCustomRequests Error:', err);
    throw err;
  }
};

export const updateCustomRequest = async (
  id: string,
  updates: Partial<Omit<FirestoreCustomRequest, 'id'>>
): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase is not configured.' };
  }

  if (!auth.currentUser) {
    return {
      success: false,
      error: 'Admin user is not authenticated. Please sign in again.',
    };
  }

  try {
    const cleanPayload = sanitizeForFirestore(updates as Record<string, unknown>);
    const docRef = doc(db, COLLECTIONS.CUSTOM_REQUESTS, id);
    await updateDoc(docRef, cleanPayload);
    return { success: true };
  } catch (err: unknown) {
    console.error('updateCustomRequest Error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to update custom request';
    return { success: false, error: msg };
  }
};

export const deleteCustomRequest = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase is not configured.' };
  }

  if (!auth.currentUser) {
    return {
      success: false,
      error: 'Admin user is not authenticated. Please sign in again.',
    };
  }

  try {
    const docRef = doc(db, COLLECTIONS.CUSTOM_REQUESTS, id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (err: unknown) {
    console.error('deleteCustomRequest Error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to delete custom request';
    return { success: false, error: msg };
  }
};

/**
 * ============================================================================
 * ENQUIRIES COLLECTION OPERATIONS
 * ============================================================================
 */

export const submitEnquiryToFirestore = async (
  enquiryData: Omit<FirestoreEnquiry, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id?: string; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase environment variables not set.' };
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.ENQUIRIES), {
      ...enquiryData,
      status: 'new',
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to submit enquiry';
    return { success: false, error: msg };
  }
};
