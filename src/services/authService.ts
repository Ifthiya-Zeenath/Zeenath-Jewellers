/**
 * ============================================================================
 * Firebase Authentication Service Layer
 * ============================================================================
 * Encapsulates Firebase Email/Password authentication operations, user state
 * subscriptions, and session management.
 * ============================================================================
 */

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Helper to map Firebase Auth error codes to user-friendly messages
 */
export const formatAuthError = (err: unknown): string => {
  if (!err) return 'An unexpected error occurred.';

  const code = (err as { code?: string })?.code || '';
  const message = err instanceof Error ? err.message : String(err);

  if (
    code === 'auth/invalid-credential' ||
    code === 'auth/wrong-password' ||
    code === 'auth/user-not-found' ||
    message.includes('auth/invalid-credential') ||
    message.includes('auth/wrong-password') ||
    message.includes('auth/user-not-found')
  ) {
    return 'Invalid email or password. Please verify your admin credentials.';
  }

  if (
    code === 'auth/invalid-email' ||
    message.includes('auth/invalid-email')
  ) {
    return 'Please enter a valid email address.';
  }

  if (
    code === 'auth/too-many-requests' ||
    message.includes('auth/too-many-requests')
  ) {
    return 'Access temporarily disabled due to multiple failed attempts. Please wait a few minutes and try again.';
  }

  if (
    code === 'auth/network-request-failed' ||
    message.includes('auth/network-request-failed')
  ) {
    return 'Network connection error. Please check your internet connection and try again.';
  }

  if (
    code === 'auth/user-disabled' ||
    message.includes('auth/user-disabled')
  ) {
    return 'This admin account has been disabled. Please contact system administrator.';
  }

  // Fallback generic error message to avoid exposing internal Firebase details
  return 'Authentication request failed. Please check your credentials and try again.';
};

/**
 * Authenticate admin user with Email & Password
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: 'Firebase service is not configured. Please check system configuration.',
    };
  }

  try {
    const credential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: credential.user,
    };
  } catch (err: unknown) {
    const errorMessage = formatAuthError(err);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Sign out the currently authenticated user
 */
export const logoutUser = async (): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return { success: true };
  }

  try {
    await signOut(auth);
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Sign out failed';
    return { success: false, error: errorMessage };
  }
};

/**
 * Subscribe to real-time authentication state changes
 */
export const subscribeToAuthState = (callback: (user: User | null) => void): (() => void) => {
  if (!isFirebaseConfigured()) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

/**
 * Get the current Firebase Auth user instance
 */
export const getCurrentUser = (): User | null => {
  if (!isFirebaseConfigured()) return null;
  return auth.currentUser;
};

/**
 * Send password reset email for an admin email
 */
export const sendPasswordReset = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: 'Firebase service is not configured. Please check system configuration.',
    };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code || '';
    const message = err instanceof Error ? err.message : String(err);

    // For security, do not expose account existence if user-not-found occurs
    if (code === 'auth/user-not-found' || message.includes('auth/user-not-found')) {
      return { success: true };
    }

    const errorMessage = formatAuthError(err);
    return { success: false, error: errorMessage };
  }
};
