// components/dashboard/NetWorthCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function NetWorthCard() {
  // TODO: Obtener datos reales del usuario
  const netWorth = 53575.31;
  const monthlyChange = 5.2;
  const isPositive = monthlyChange >= 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className="border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-400">
          Patrimonio Neto Total
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-4xl font-bold text-white">
            {formatCurrency(netWorth)}
          </p>
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isPositive ? '+' : ''}{monthlyChange}% este mes
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}