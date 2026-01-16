'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Target, Clock } from 'lucide-react';

interface ClosedOperation {
  _id: string;
  ticker: string;
  companyName: string;
  entryDate: string;
  exitDate: string;
  entryPrice: number;
  exitPrice: number;
  shares: number;
  plEuros: number;
  plPercentage: number;
  durationDays: number;
  closeReason: string;
  technicalSetup: string;
  sector: string;
}

interface HistoryTableProps {
  operations: ClosedOperation[];
}

export default function HistoryTable({ operations }: HistoryTableProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCloseReasonLabel = (reason: string) => {
    const labels: { [key: string]: string } = {
      stop_loss: 'Stop Loss',
      take_profit: 'Take Profit',
      temporal_stop: 'Stop Temporal',
      other: 'Otro',
    };
    return labels[reason] || reason;
  };

  const getCloseReasonColor = (reason: string) => {
    const colors: { [key: string]: string } = {
      stop_loss: 'bg-red-500/10 text-red-500 border-red-500/30',
      take_profit: 'bg-green-500/10 text-green-500 border-green-500/30',
      temporal_stop: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
      other: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    };
    return colors[reason] || colors.other;
  };

  if (operations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-slate-800 p-6 mb-4">
          <DollarSign className="h-12 w-12 text-slate-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No hay operaciones cerradas
        </h3>
        <p className="text-slate-400">
          Tus operaciones cerradas aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {operations.map((op) => {
        const isProfit = op.plEuros >= 0;
        
        return (
          <Card
            key={op._id}
            className={`border-slate-800 bg-slate-900/50 backdrop-blur transition-all hover:border-slate-700 ${
              isProfit ? 'hover:border-green-500/30' : 'hover:border-red-500/30'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                {/* Left: Ticker & Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{op.ticker}</h3>
                    <Badge variant="outline" className="text-xs border-slate-700">
                      {op.sector}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-slate-700">
                      {op.technicalSetup}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{op.companyName}</p>
                </div>

                {/* Right: P/L */}
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-2 mb-1">
                    {isProfit ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`text-2xl font-bold ${
                      isProfit ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {isProfit ? '+' : ''}{op.plPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <p className={`text-sm font-medium ${
                    isProfit ? 'text-green-500/70' : 'text-red-500/70'
                  }`}>
                    {isProfit ? '+' : ''}{op.plEuros.toFixed(2)}€
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    Entrada
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {op.entryPrice.toFixed(2)}€
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Salida
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {op.exitPrice.toFixed(2)}€
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Duración
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {op.durationDays} días
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Acciones</p>
                  <p className="text-sm font-semibold text-white">
                    {op.shares}
                  </p>
                </div>
              </div>

              {/* Footer: Dates & Reason */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(op.entryDate)}</span>
                  <span>→</span>
                  <span>{formatDate(op.exitDate)}</span>
                </div>

                <Badge
                  variant="outline"
                  className={`text-xs ${getCloseReasonColor(op.closeReason)}`}
                >
                  {getCloseReasonLabel(op.closeReason)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}