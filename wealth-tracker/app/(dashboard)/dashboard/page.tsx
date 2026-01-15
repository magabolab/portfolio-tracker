// app/(dashboard)/dashboard/page.tsx
import NetWorthCard from '@/components/dashboard/NetWorthCard';
import AssetDistributionCard from '@/components/dashboard/AssetDistributionCard';
import QuickStatsCard from '@/components/dashboard/QuickStatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const metadata = {
  title: 'Dashboard | Wealth Tracker',
  description: 'Vista general de tu patrimonio',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400">Vista general de tu patrimonio</p>
      </div>

      {/* Alerts */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-yellow-500">
          <strong>Aviso:</strong> Tienes 3 posiciones abiertas en XTB. Revisa tus stops.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <QuickStatsCard />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patrimonio Neto */}
        <div className="lg:col-span-2">
          <NetWorthCard />
        </div>

        {/* Asset Distribution */}
        <div className="lg:col-span-1">
          <AssetDistributionCard />
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Abierta posición en NVDA', date: '15 Ene 2026', platform: 'XTB' },
              { action: 'DCA mensual ejecutado', date: '01 Ene 2026', platform: 'Trade Republic' },
              { action: 'Cobro renta inmueble', date: '30 Dic 2025', platform: 'Real Estate' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-slate-400">{activity.platform}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}