import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Layers, MessageSquare, ArrowLeft, Shield } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const adminNav = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#C6A15B]" />
            <div>
              <h1 className="text-lg font-serif-luxury tracking-wider text-white font-bold">
                ZEENATH JEWELLERY
              </h1>
              <p className="text-xs text-[#C6A15B]">Admin Management Console</p>
            </div>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white border border-gray-700 px-3 py-1.5 rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Store</span>
          </Link>
        </div>
      </header>

      {/* Admin Navigation Bar */}
      <div className="bg-gray-950/50 border-b border-gray-800 px-6">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-2 py-2">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#C6A15B] text-gray-950 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
