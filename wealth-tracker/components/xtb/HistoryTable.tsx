// components/xtb/HistoryTable.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

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
      month: '2-digit',
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
      stop_loss: 'bg-red-500/10 text-red-500 border-red-500/50',
      take_profit: 'bg-green-500/10 text-green-500 border-green-500/50',
      temporal_stop: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/50',
      other: 'bg-slate-500/10 text-slate-400 border-slate-500/50',
    };
    return colors[reason] || colors.other;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="py-3 px-4 text-left text-xs font-medium text-slate-400 uppercase">
              Operación
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-slate-400 uppercase">
              Fechas
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-slate-400 uppercase">
              Entrada
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-slate-400 uppercase">
              Salida
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-slate-400 uppercase">
              P/L
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-slate-400 uppercase">
              Duración
            </th>
            <th className="py-3 px-4 text-center text-xs font-medium text-slate-400 uppercase">
              Motivo
            </th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => {
            const isProfit = op.plEuros >= 0;
            
            return (
              <tr
                key={op._id}
                className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
              >
                {/* Operación */}
                <td className="py-4 px-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{op.ticker}</span>
                      <Badge variant="outline" className="text-xs">
                        {op.sector}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {op.companyName}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {op.technicalSetup}
                    </p>
                  </div>
                </td>

                {/* Fechas */}
                <td className="py-4 px-4">
                  <div className="text-sm">
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(op.entryDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-400 mt-1">
                      <span>→</span>
                      <span>{formatDate(op.exitDate)}</span>
                    </div>
                  </div>
                </td>

                {/* Entrada */}
                <td className="py-4 px-4 text-right">
                  <div className="text-sm">
                    <p className="text-white font-medium">
                      {op.entryPrice.toFixed(2)}€
                    </p>
                    <p className="text-xs text-slate-400">
                      {op.shares} acc.
                    </p>
                  </div>
                </td>

                {/* Salida */}
                <td className="py-4 px-4 text-right">
                  <div className="text-sm">
                    <p className="text-white font-medium">
                      {op.exitPrice.toFixed(2)}€
                    </p>
                  </div>
                </td>

                {/* P/L */}
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {isProfit ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <div className="text-sm">
                      <p
                        className={`font-bold ${
                          isProfit ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {isProfit ? '+' : ''}{op.plEuros.toFixed(2)}€
                      </p>
                      <p
                        className={`text-xs ${
                          isProfit ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {isProfit ? '+' : ''}{op.plPercentage.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </td>

                {/* Duración */}
                <td className="py-4 px-4 text-center">
                  <Badge variant="outline" className="text-xs">
                    {op.durationDays}d
                  </Badge>
                </td>

                {/* Motivo */}
                <td className="py-4 px-4 text-center">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getCloseReasonColor(op.closeReason)}`}
                  >
                    {getCloseReasonLabel(op.closeReason)}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {operations.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No hay operaciones cerradas aún</p>
        </div>
      )}
    </div>
  );
}