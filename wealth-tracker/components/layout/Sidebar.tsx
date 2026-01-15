// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Wallet,
  Home,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-blue-500',
  },
  {
    title: 'XTB Trading',
    href: '/xtb',
    icon: TrendingUp,
    color: 'text-orange-500',
  },
  {
    title: 'Trade Republic',
    href: '/trade-republic',
    icon: Briefcase,
    color: 'text-purple-500',
  },
  {
    title: 'Mintos',
    href: '/mintos',
    icon: Wallet,
    color: 'text-green-500',
  },
  {
    title: 'Inmueble',
    href: '/real-estate',
    icon: Home,
    color: 'text-cyan-500',
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    color: 'text-yellow-500',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Wealth Tracker</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-slate-800 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive ? item.color : '')} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-slate-800" />

      {/* Footer */}
      <div className="space-y-1 p-3">
        <Link
          href="/settings"
          className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800/50 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          <span>Configuración</span>
        </Link>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start space-x-3 text-slate-400 hover:bg-slate-800/50 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  );
}