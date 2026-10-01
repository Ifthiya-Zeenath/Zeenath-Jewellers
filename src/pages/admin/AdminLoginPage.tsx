import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Lock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();

  const [mode, setMode] = useState<'login' | 'forgot-password'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [resetEmail, setResetEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSwitchMode = (targetMode: 'login' | 'forgot-password') => {
    setErrorMessage('');
    setSuccessMessage('');
    if (targetMode === 'forgot-password') {
      setResetEmail(email.trim());
    }
    setMode(targetMode);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(email.trim(), password.trim());
      if (res.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected login error occurred.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!resetEmail.trim()) {
      setErrorMessage('Please enter your admin email address.');
      return;
    }

    if (!validateEmail(resetEmail)) {
      setErrorMessage('Please enter a valid email address format.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await resetPassword(resetEmail.trim());
      if (res.success) {
        setSuccessMessage(
          'If an admin account is associated with this email address, a password reset link has been sent. Please check your inbox and follow the instructions.'
        );
      } else {
        setErrorMessage(res.error || 'Failed to send password reset email. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-gray-900 border border-[#C6A15B]/30 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        {mode === 'login' ? (
          <>
            {/* Login Header Branding */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#C6A15B]/10 border border-[#C6A15B]/30 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-lg">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="font-serif-luxury text-2xl font-bold text-white tracking-wider">
                ZEENATH JEWELLERY
              </h1>
              <p className="text-xs text-[#C6A15B] uppercase tracking-[0.2em] font-medium">
                Admin Portal Authentication
              </p>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded text-xs text-red-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@zeenath.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-950 border border-gray-800 text-white rounded focus:border-[#C6A15B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-gray-950 border border-gray-800 text-white rounded focus:border-[#C6A15B] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 text-gray-500 hover:text-gray-300 focus:outline-none focus:text-[#C6A15B] transition-colors p-0.5 rounded cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('forgot-password')}
                    className="text-xs text-gray-400 hover:text-[#C6A15B] transition-colors focus:outline-none focus:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C6A15B] text-gray-950 font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#A88645] transition-all rounded shadow disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Log In to Admin Console</span>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* Forgot Password Header Branding */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-[#C6A15B]/10 border border-[#C6A15B]/30 rounded-full flex items-center justify-center mx-auto text-[#C6A15B] shadow-lg">
                <KeyRound className="w-7 h-7" />
              </div>
              <h1 className="font-serif-luxury text-2xl font-bold text-white tracking-wider">
                ZEENATH JEWELLERY
              </h1>
              <p className="text-xs text-[#C6A15B] uppercase tracking-[0.2em] font-medium">
                Reset Admin Password
              </p>
            </div>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Enter your registered admin email address below to receive a password reset link.
            </p>

            {/* Error Notification */}
            {errorMessage && (
              <div className="p-3.5 bg-red-950/80 border border-red-500/50 rounded text-xs text-red-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 rounded text-xs text-emerald-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* Forgot Password Form */}
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Admin Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@zeenath.com"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-950 border border-gray-800 text-white rounded focus:border-[#C6A15B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C6A15B] text-gray-950 font-bold text-xs uppercase tracking-[0.18em] hover:bg-[#A88645] transition-all rounded shadow disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Send Password Reset Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Back to Admin Login</span>
              </button>
            </form>
          </>
        )}

        <div className="pt-4 border-t border-gray-800 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Return to Public Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
