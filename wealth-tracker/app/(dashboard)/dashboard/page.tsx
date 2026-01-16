// app/(dashboard)/dashboard/page.tsx
import NetWorthCard from '@/components/dashboard/NetWorthCard';
import AssetDistributionCard from '@/components/dashboard/AssetDistributionCard';
import QuickStatsCard from '@/components/dashboard/QuickStatsCard';
import EquityCurveChart from '@/components/dashboard/EquityCurveChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Dashboard | Wealth Tracker',
  description: 'Vista general de tu patrimonio',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header limpio */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-lg text-slate-400">Bienvenido de nuevo</p>
      </div>

      {/* Alert - Solo si hay algo importante */}
      <Alert className="border-yellow-500/50 bg-yellow-500/5 backdrop-blur">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-yellow-500">
          Tienes 3 posiciones abiertas en XTB. <Link href="/xtb/positions" className="underline font-medium">Revisar ahora</Link>
        </AlertDescription>
      </Alert>

      {/* Hero Section - Patrimonio Neto */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NetWorthCard />
        </div>
        <div className="lg:col-span-1">
          <AssetDistributionCard />
        </div>
      </div>

      {/* NUEVA SECCIÓN: Gráfica de Evolución */}
      <EquityCurveChart />

      {/* Quick Stats - Más espaciado */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Resumen Rápido</h2>
        <QuickStatsCard />
      </div>

      {/* Acciones Rápidas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/xtb/add">
          <Card className="border-slate-800 bg-gradient-to-br from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10 transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">XTB Trading</p>
                  <p className="text-xl font-bold text-white">Nueva Operación</p>
                </div>
                <ArrowRight className="h-6 w-6 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/xtb/positions">
          <Card className="border-slate-800 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10 transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Posiciones</p>
                  <p className="text-xl font-bold text-white">Ver Abiertas</p>
                </div>
                <ArrowRight className="h-6 w-6 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analytics">
          <Card className="border-slate-800 bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10 transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Analytics</p>
                  <p className="text-xl font-bold text-white">Ver Estadísticas</p>
                </div>
                <ArrowRight className="h-6 w-6 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Actividad Reciente - Más limpio */}
      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Actividad Reciente</CardTitle>
            <Link href="/xtb/history">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                Ver todo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                action: 'Abierta posición en NVDA', 
                date: '15 Ene 2026', 
                platform: 'XTB',
                type: 'success'
              },
              { 
                action: 'DCA mensual ejecutado', 
                date: '01 Ene 2026', 
                platform: 'Trade Republic',
                type: 'neutral'
              },
              { 
                action: 'Cobro renta inmueble', 
                date: '30 Dic 2025', 
                platform: 'Real Estate',
                type: 'success'
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.platform}</p>
                  </div>
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