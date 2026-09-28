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
 * Authenticate admin user with Email & Password
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: 'Firebase credentials are not configured in environment variables.',
    };
  }

  try {
    const credential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: credential.user,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
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
export const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: 'Firebase is not configured.',
    };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
    return { success: false, error: errorMessage };
  }
};
