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
  query,
  orderBy,
} from 'firebase/firestore';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
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

export interface FirestoreCustomRequest {
  id?: string;
  customerName: string;
  phone: string;
  email: string;
  jewelleryType: string;
  metalType: string;
  budgetRange: string;
  preferredCompletionDate?: string;
  designDescription: string;
  specialRequirements?: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'completed';
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

export const addFirestoreProduct = async (
  productData: Omit<FirestoreProduct, 'id'>
): Promise<{ success: boolean; id?: string; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: false, error: 'Firebase is not configured.' };
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
      ...productData,
      createdAt: productData.createdAt || new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to add product';
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
    const docRef = await addDoc(collection(db, COLLECTIONS.CUSTOM_REQUESTS), {
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to submit custom request';
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
