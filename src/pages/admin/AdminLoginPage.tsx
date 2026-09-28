import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowLeft, Loader2, AlertCircle, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login(email.trim(), password.trim());
      if (res.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        // Human-friendly error parsing
        let msg = res.error || 'Authentication failed. Please check credentials.';
        if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password') || msg.includes('auth/user-not-found')) {
          msg = 'Invalid email or password. Please verify your admin credentials.';
        } else if (msg.includes('auth/too-many-requests')) {
          msg = 'Access temporarily disabled due to multiple failed attempts. Try again later.';
        }
        setErrorMessage(msg);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected login error occurred.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border border-[#C6A15B]/30 rounded-xl p-8 shadow-2xl space-y-6">
        {/* Header Branding */}
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
