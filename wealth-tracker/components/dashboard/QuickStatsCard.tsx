// components/dashboard/QuickStatsCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Wallet, Home, TrendingUp } from 'lucide-react';

export default function QuickStatsCard() {
  const stats = [
    {
      name: 'XTB Posiciones',
      value: '3',
      icon: Activity,
      color: 'text-orange-500',
    },
    {
      name: 'TR Inversión',
      value: '1.056€',
      icon: Wallet,
      color: 'text-purple-500',
    },
    {
      name: 'Cashflow Mes',
      value: '+450€',
      icon: Home,
      color: 'text-cyan-500',
    },
    {
      name: 'ROI YTD',
      value: '+12.3%',
      icon: TrendingUp,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name} className="border-slate-800 bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.name}</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}