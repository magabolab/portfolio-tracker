// components/xtb/PositionCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Edit, X, Calendar, AlertTriangle } from 'lucide-react';
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
  currentPrice?: number;
}

export default function PositionCard({ position, currentPrice = 0 }: PositionCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const isNearStop = distanceToStop < 2;
  const isOldPosition = daysInPosition > 14;
  const shouldMoveStopToBE = plPercentage >= 8 && position.stopLoss < position.entryPrice;

  const handleClose = async () => {
    router.push(`/xtb/positions/${position._id}/close`);
  };

  return (
    <Card className={`border-slate-800 bg-slate-900/50 backdrop-blur transition-all hover:border-slate-700 ${
      isNearStop ? 'border-red-500/30 shadow-red-500/10 shadow-lg' : ''
    }`}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-white">{position.ticker}</h3>
              <Badge variant="outline" className="text-xs border-slate-700">
                {position.sector}
              </Badge>
              <Badge variant="outline" className="text-xs border-slate-700">
                {position.technicalSetup}
              </Badge>
            </div>
            <p className="text-sm text-slate-400">{position.companyName}</p>
          </div>

          {/* P/L Grande y prominente */}
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2 mb-1">
              {isProfit ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-3xl font-bold ${
                isProfit ? 'text-green-500' : 'text-red-500'
              }`}>
                {isProfit ? '+' : ''}{plPercentage.toFixed(1)}%
              </span>
            </div>
            <p className={`text-sm font-medium ${
              isProfit ? 'text-green-500/70' : 'text-red-500/70'
            }`}>
              {isProfit ? '+' : ''}{plEuros.toFixed(2)}€
            </p>
          </div>
        </div>

        {/* Alertas - Solo si son relevantes */}
        {(isNearStop || shouldMoveStopToBE || isOldPosition) && (
          <div className="space-y-2 mb-6">
            {isNearStop && (
              <div className="flex items-start space-x-2 rounded-lg bg-red-500/10 border border-red-500/30 p-3">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-500">Cerca del stop loss</p>
                  <p className="text-xs text-red-500/70">A solo {distanceToStop.toFixed(1)}% de distancia</p>
                </div>
              </div>
            )}
            {shouldMoveStopToBE && !isNearStop && (
              <div className="flex items-start space-x-2 rounded-lg bg-green-500/10 border border-green-500/30 p-3">
                <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-500">Mueve el stop a breakeven</p>
                  <p className="text-xs text-green-500/70">Has alcanzado +{plPercentage.toFixed(1)}%, protege tu capital</p>
                </div>
              </div>
            )}
            {isOldPosition && !isNearStop && !shouldMoveStopToBE && (
              <div className="flex items-start space-x-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-3">
                <Calendar className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-500">Posición antigua</p>
                  <p className="text-xs text-yellow-500/70">{daysInPosition} días sin momentum claro</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Métricas - Grid limpio */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-xs text-slate-500 mb-1">Entrada</p>
            <p className="text-sm font-semibold text-white">{position.entryPrice.toFixed(2)}€</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Actual</p>
            <p className="text-sm font-semibold text-white">{mockCurrentPrice.toFixed(2)}€</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Stop Loss</p>
            <p className="text-sm font-semibold text-red-400">{position.stopLoss.toFixed(2)}€</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Target</p>
            <p className="text-sm font-semibold text-green-400">{position.takeProfit1.toFixed(2)}€</p>
          </div>
        </div>

        {/* Progress bar hacia el target */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Stop</span>
            <span>Target +8%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${
                isProfit ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'
              }`}
              style={{ 
                width: `${Math.min(Math.max(((mockCurrentPrice - position.stopLoss) / (position.takeProfit1 - position.stopLoss)) * 100, 0), 100)}%` 
              }}
            />
          </div>
        </div>

        {/* Footer - Acciones */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {daysInPosition}d
            </span>
            <span>•</span>
            <span>{position.shares} acc.</span>
            <span>•</span>
            <span className="text-orange-400">{position.riskPercentage.toFixed(1)}% riesgo</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/xtb/positions/${position._id}/edit`)}
              className="h-8 px-3"
            >
              <Edit className="h-3 w-3 mr-1" />
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClose}
              disabled={isLoading}
              className="h-8 px-3"
            >
              <X className="h-3 w-3 mr-1" />
              Cerrar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}