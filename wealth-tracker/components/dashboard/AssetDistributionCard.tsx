// components/dashboard/AssetDistributionCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AssetDistributionCard() {
  // TODO: Obtener datos reales
  const distribution = [
    { name: 'Inmueble', value: 50000, color: 'bg-cyan-500', percentage: 93.3 },
    { name: 'XTB', value: 1766.82, color: 'bg-orange-500', percentage: 3.3 },
    { name: 'Trade Republic', value: 1056.23, color: 'bg-purple-500', percentage: 2.0 },
    { name: 'Mintos', value: 752.26, color: 'bg-green-500', percentage: 1.4 },
  ];

  return (
    <Card className="border-slate-800 bg-slate-900">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-400">
          Distribución de Activos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {distribution.map((asset) => (
            <div key={asset.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{asset.name}</span>
                <span className="font-medium text-white">
                  {asset.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full ${asset.color} transition-all`}
                  style={{ width: `${asset.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}