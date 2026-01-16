// app/(dashboard)/xtb/history/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PLChart from '@/components/xtb/PLChart';
import WinRateChart from '@/components/xtb/WinRateChart';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, TrendingDown, Target, Calendar } from 'lucide-react';
import HistoryTable from '@/components/xtb/HistoryTable';
import { Alert, AlertDescription } from '@/components/ui/alert';
import XTBTabs from '@/components/xtb/XTBTabs';

export default function XTBHistoryPage() {
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/xtb/operations?status=closed');
      
      if (!response.ok) {
        throw new Error('Error al cargar historial');
      }

      const data = await response.json();
      setOperations(data.operations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar historial');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Calcular estadísticas
  const stats = operations.reduce(
    (acc: any, op: any) => {
      acc.totalTrades++;
      acc.totalPL += op.plEuros;
      
      if (op.plEuros > 0) {
        acc.winners++;
        acc.totalWins += op.plEuros;
      } else {
        acc.losers++;
        acc.totalLosses += Math.abs(op.plEuros);
      }
      
      acc.totalDays += op.durationDays;
      
      return acc;
    },
    {
      totalTrades: 0,
      winners: 0,
      losers: 0,
      totalPL: 0,
      totalWins: 0,
      totalLosses: 0,
      totalDays: 0,
    }
  );

  const winRate = stats.totalTrades > 0 
    ? (stats.winners / stats.totalTrades) * 100 
    : 0;
  
  const avgWin = stats.winners > 0 ? stats.totalWins / stats.winners : 0;
  const avgLoss = stats.losers > 0 ? stats.totalLosses / stats.losers : 0;
  const avgDuration = stats.totalTrades > 0 ? stats.totalDays / stats.totalTrades : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">XTB Trading</h1>
          <p className="text-slate-400">
            {stats.totalTrades} operaciones cerradas
          </p>
        </div>

        <Button
          variant="outline"
          onClick={fetchHistory}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>
{/* Gráficas de Performance */}
<div className="grid gap-6 lg:grid-cols-2">
  <PLChart />
  <WinRateChart />
</div>
      {/* Tabs */}
      <XTBTabs />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Estadísticas */}
      {stats.totalTrades > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">P/L Total</p>
                  <p className={`mt-2 text-2xl font-bold ${
                    stats.totalPL >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stats.totalPL >= 0 ? '+' : ''}{stats.totalPL.toFixed(2)}€
                  </p>
                </div>
                {stats.totalPL >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-500" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-500" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Win Rate</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {winRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-slate-500">
                    {stats.winners}W / {stats.losers}L
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900">
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-slate-400">Avg Win / Loss</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    <span className="text-green-500 font-medium">
                      +{avgWin.toFixed(2)}€
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-red-500 font-medium">
                      -{avgLoss.toFixed(2)}€
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800 bg-slate-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Duración Promedio</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {avgDuration.toFixed(0)} días
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabla de historial */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle>Todas las Operaciones</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : (
            <HistoryTable operations={operations} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}