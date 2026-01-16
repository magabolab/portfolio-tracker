'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from 'lucide-react';

const mockData = [
  { date: '01 Ene', value: 50000, xtb: 1500, tr: 1000, mintos: 750 },
  { date: '05 Ene', value: 50500, xtb: 1650, tr: 1020, mintos: 755 },
  { date: '10 Ene', value: 51200, xtb: 1800, tr: 1050, mintos: 760 },
  { date: '15 Ene', value: 52100, xtb: 1950, tr: 1080, mintos: 765 },
  { date: '20 Ene', value: 51800, xtb: 1850, tr: 1100, mintos: 770 },
  { date: '25 Ene', value: 52800, xtb: 2000, tr: 1120, mintos: 775 },
  { date: '30 Ene', value: 53575, xtb: 2150, tr: 1150, mintos: 780 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900/95 backdrop-blur p-4 shadow-xl">
        <p className="text-xs text-slate-400 mb-2">{data.date}</p>
        <div className="space-y-1">
          <p className="text-sm font-bold text-white">
            Total: {data.value.toLocaleString('es-ES')}€
          </p>
          <div className="text-xs space-y-0.5 pt-2 border-t border-slate-800">
            <p className="text-orange-400">XTB: {data.xtb.toLocaleString('es-ES')}€</p>
            <p className="text-purple-400">TR: {data.tr.toLocaleString('es-ES')}€</p>
            <p className="text-green-400">Mintos: {data.mintos.toLocaleString('es-ES')}€</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function EquityCurveChart() {
  const firstValue = mockData[0].value;
  const lastValue = mockData[mockData.length - 1].value;
  const change = lastValue - firstValue;
  const changePercent = ((change / firstValue) * 100).toFixed(2);
  const isPositive = change >= 0;

  return (
    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Evolución del Patrimonio
            </CardTitle>
            <p className="text-sm text-slate-400 mt-1">Últimos 30 días</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <TrendingUp className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-xl font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{changePercent}%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {isPositive ? '+' : ''}{change.toLocaleString('es-ES')}€
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2}
              fill="url(#colorValue)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-orange-500" />
            <span className="text-xs text-slate-400">XTB</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-purple-500" />
            <span className="text-xs text-slate-400">Trade Republic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-xs text-slate-400">Mintos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-cyan-500" />
            <span className="text-xs text-slate-400">Inmueble</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}