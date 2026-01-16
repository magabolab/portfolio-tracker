'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Target } from 'lucide-react';

const mockData = [
  { month: 'Sep', winRate: 55, trades: 8 },
  { month: 'Oct', winRate: 62, trades: 10 },
  { month: 'Nov', winRate: 58, trades: 12 },
  { month: 'Dic', winRate: 65, trades: 11 },
  { month: 'Ene', winRate: 68, trades: 9 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/95 backdrop-blur p-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{data.month}</p>
        <p className="text-sm font-bold text-blue-500">{data.winRate}%</p>
        <p className="text-xs text-slate-500">{data.trades} operaciones</p>
      </div>
    );
  }
  return null;
};

export default function WinRateChart() {
  const currentWinRate = mockData[mockData.length - 1].winRate;
  const target = 60;

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Evolución Win Rate
            </CardTitle>
            <p className="text-sm text-slate-400 mt-1">Últimos 5 meses</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-xl font-bold text-blue-500">
                {currentWinRate}%
              </span>
            </div>
            <p className="text-xs text-slate-500">Win rate actual</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={target} 
              stroke="#64748b" 
              strokeDasharray="3 3" 
              label={{ value: 'Objetivo 60%', position: 'right', fill: '#64748b', fontSize: 10 }}
            />
            <Line 
              type="monotone" 
              dataKey="winRate" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}