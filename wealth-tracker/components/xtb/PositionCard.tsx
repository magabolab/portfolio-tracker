// components/xtb/PositionCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Edit, X, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Position {
  _id: string;
  ticker: string;
  companyName: string;
  entryDate: string;
  entryPrice: number;
  shares: number;
  capitalInvested: number;
  stopLoss: number;
  takeProfit1: number;
  riskPercentage: number;
  sector: string;
  technicalSetup: string;
}

interface PositionCardProps {
  position: Position;
  currentPrice?: number; // TODO: Obtener de API
}

export default function PositionCard({ position, currentPrice = 0 }: PositionCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Obtener precio actual de una API
  const mockCurrentPrice = currentPrice || position.entryPrice * 1.05;

  const currentValue = mockCurrentPrice * position.shares;
  const plEuros = currentValue - position.capitalInvested;
  const plPercentage = (plEuros / position.capitalInvested) * 100;
  const isProfit = plEuros >= 0;

  const distanceToStop = ((mockCurrentPrice - position.stopLoss) / mockCurrentPrice) * 100;
  const daysInPosition = Math.floor(
    (new Date().getTime() - new Date(position.entryDate).getTime()) / 
    (1000 * 60 * 60 * 24)
  );

  // Estados de alerta
  const isNearStop = distanceToStop < 2;
  const isOldPosition = daysInPosition > 14;
  const shouldMoveStopToBE = plPercentage >= 8 && position.stopLoss < position.entryPrice;

  const handleClose = async () => {
    // TODO: Implementar modal de cierre
    router.push(`/xtb/positions/${position._id}/close`);
  };

  return (
    <Card className={`border-slate-800 transition-all hover:border-slate-700 ${
      isNearStop ? 'border-red-500/50' : ''
    }`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-white">{position.ticker}</h3>
                <Badge variant="outline" className="text-xs">
                  {position.sector}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">{position.companyName}</p>
            </div>

            <div className="flex items-center space-x-2">
              {isProfit ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-lg font-bold ${
                isProfit ? 'text-green-500' : 'text-red-500'
              }`}>
                {isProfit ? '+' : ''}{plPercentage.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Alertas */}
          {(isNearStop || shouldMoveStopToBE || isOldPosition) && (
            <div className="space-y-2">
              {isNearStop && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-3">
                  <p className="text-sm text-red-500 font-medium">
                    🔴 ¡Cerca del stop! ({distanceToStop.toFixed(1)}%)
                  </p>
                </div>
              )}
              {shouldMoveStopToBE && (
                <div className="rounded-lg bg-green-500/10 border border-green-500/50 p-3">
                  <p className="text-sm text-green-500 font-medium">
                    🟢 Mover stop a breakeven ({position.entryPrice.toFixed(2)}€)
                  </p>
                </div>
              )}
              {isOldPosition && (
                <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/50 p-3">
                  <p className="text-sm text-yellow-500 font-medium">
                    🟡 {daysInPosition} días en posición. Considerar stop temporal.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400">Precio Entrada</p>
              <p className="text-sm font-medium text-white">
                {position.entryPrice.toFixed(2)}€
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Precio Actual</p>
              <p className="text-sm font-medium text-white">
                {mockCurrentPrice.toFixed(2)}€
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Acciones</p>
              <p className="text-sm font-medium text-white">
                {position.shares}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Capital Invertido</p>
              <p className="text-sm font-medium text-white">
                {position.capitalInvested.toFixed(2)}€
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Stop Loss</p>
              <p className="text-sm font-medium text-red-400">
                {position.stopLoss.toFixed(2)}€
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Take Profit 1</p>
              <p className="text-sm font-medium text-green-400">
                {position.takeProfit1.toFixed(2)}€
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">P/L No Realizado</p>
              <p className={`text-sm font-bold ${
                isProfit ? 'text-green-500' : 'text-red-500'
              }`}>
                {isProfit ? '+' : ''}{plEuros.toFixed(2)}€
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Riesgo</p>
              <p className="text-sm font-medium text-orange-400">
                {position.riskPercentage.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Calendar className="h-3 w-3" />
              <span>{daysInPosition} días</span>
              <span>•</span>
              <span>{position.technicalSetup}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/xtb/positions/${position._id}/edit`)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClose}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-1" />
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}