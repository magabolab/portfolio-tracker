'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const mockData = [
  { month: 'Sep', pl: 145.50 },
  { month: 'Oct', pl: -85.20 },
  { month: 'Nov', pl: 220.80 },
  { month: 'Dic', pl: 180.30 },
  { month: 'Ene', pl: 250.00 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const isPositive = data.value >= 0;
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/95 backdrop-blur p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{data.payload.month}</p>
        <p className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{data.value.toFixed(2)}€
        </p>
      </div>
    );
  }
  return null;
};

export default function PLChart() {
  const totalPL = mockData.reduce((sum, item) => sum + item.pl, 0);
  const isPositive = totalPL >= 0;
  const winners = mockData.filter(d => d.pl > 0).length;
  const losers = mockData.filter(d => d.pl < 0).length;

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              P/L Mensual XTB
            </CardTitle>
            <p className="text-sm text-slate-400 mt-1">
              {winners} meses positivos • {losers} meses negativos
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{totalPL.toFixed(2)}€
              </span>
            </div>
            <p className="text-xs text-slate-500">Total acumulado</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="pl" 
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            >
              {mockData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.pl >= 0 ? '#10b981' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}