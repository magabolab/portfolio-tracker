// components/xtb/XTBTabs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Activity, History } from 'lucide-react';

const tabs = [
  {
    name: 'Posiciones Abiertas',
    href: '/xtb/positions',
    icon: Activity,
  },
  {
    name: 'Historial',
    href: '/xtb/history',
    icon: History,
  },
];

export default function XTBTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-slate-800">
      <nav className="flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname?.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex items-center space-x-2 px-1 py-4 text-sm font-medium border-b-2 transition-colors',
                isActive
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white hover:border-slate-700'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}