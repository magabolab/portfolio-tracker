// components/xtb/OperationForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle2, Calculator } from 'lucide-react';
import {
  validateRisk,
  validateStopLoss,
  calculateTakeProfits,
  calculateOptimalPositionSize,
  calculateRisk,
} from '@/lib/validations/xtb-rules';

interface FormData {
  ticker: string;
  companyName: string;
  entryDate: string;
  entryPrice: string;
  shares: string;
  stopLoss: string;
  sector: string;
  technicalSetup: string;
  catalyst: string;
  entryNotes: string;
}

export default function OperationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  
  // Capital del usuario (TODO: obtener del contexto/API)
  const [userCapital] = useState(1766.82);
  
  const [formData, setFormData] = useState<FormData>({
    ticker: '',
    companyName: '',
    entryDate: new Date().toISOString().split('T')[0],
    entryPrice: '',
    shares: '',
    stopLoss: '',
    sector: '',
    technicalSetup: '',
    catalyst: '',
    entryNotes: '',
  });

  const [calculatedData, setCalculatedData] = useState({
    capitalInvested: 0,
    riskEuros: 0,
    riskPercentage: 0,
    tp1: 0,
    tp2: 0,
    tp3: 0,
  });

  // Recalcular datos cuando cambien los campos relevantes
  useEffect(() => {
    const entryPrice = parseFloat(formData.entryPrice) || 0;
    const shares = parseFloat(formData.shares) || 0;
    const stopLoss = parseFloat(formData.stopLoss) || 0;

    if (entryPrice > 0 && shares > 0) {
      const capitalInvested = entryPrice * shares;
      const { riskEuros, riskPercentage } = calculateRisk(
        entryPrice,
        stopLoss,
        shares,
        userCapital
      );
      const { tp1, tp2, tp3 } = calculateTakeProfits(entryPrice);

      setCalculatedData({
        capitalInvested,
        riskEuros,
        riskPercentage,
        tp1,
        tp2,
        tp3,
      });

      // Validar stop loss
      if (stopLoss > 0) {
        const stopValidation = validateStopLoss(entryPrice, stopLoss);
        if (!stopValidation.valid) {
          setError(stopValidation.error || '');
          setWarning('');
        } else if (stopValidation.warning) {
          setWarning(stopValidation.warning);
          setError('');
        } else {
          setError('');
          setWarning('');
        }

        // Validar riesgo
        const riskValidation = validateRisk(entryPrice, stopLoss, shares, userCapital);
        if (!riskValidation.valid) {
          setError(riskValidation.error || '');
        } else if (riskValidation.warning) {
          setWarning(riskValidation.warning);
        }
      }
    }
  }, [formData.entryPrice, formData.shares, formData.stopLoss, userCapital]);

  const handleCalculateOptimal = () => {
    const entryPrice = parseFloat(formData.entryPrice);
    const stopLoss = parseFloat(formData.stopLoss);

    if (!entryPrice || !stopLoss) {
      setError('Introduce precio de entrada y stop loss primero');
      return;
    }

    const optimal = calculateOptimalPositionSize(entryPrice, stopLoss, userCapital, 2.5);
    
    setFormData({
      ...formData,
      shares: optimal.shares.toString(),
    });
    
    setWarning(`💡 Tamaño óptimo calculado: ${optimal.shares} acciones (Riesgo 2.5%)`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validaciones finales
    const entryPrice = parseFloat(formData.entryPrice);
    const shares = parseFloat(formData.shares);
    const stopLoss = parseFloat(formData.stopLoss);

    const stopValidation = validateStopLoss(entryPrice, stopLoss);
    if (!stopValidation.valid) {
      setError(stopValidation.error || '');
      setIsLoading(false);
      return;
    }

    const riskValidation = validateRisk(entryPrice, stopLoss, shares, userCapital);
    if (!riskValidation.valid) {
      setError(riskValidation.error || '');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/xtb/operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          entryPrice,
          shares,
          stopLoss,
          capitalInvested: calculatedData.capitalInvested,
          riskEuros: calculatedData.riskEuros,
          riskPercentage: calculatedData.riskPercentage,
          takeProfit1: calculatedData.tp1,
          takeProfit2: calculatedData.tp2,
          takeProfit3: calculatedData.tp3,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la operación');
      }

      // Éxito - redirigir a posiciones
      router.push('/xtb/positions');
      router.refresh();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la operación');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {warning && (
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-500">{warning}</AlertDescription>
        </Alert>
      )}

      {/* Datos básicos */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle>Datos de la Operación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ticker">Ticker *</Label>
              <Input
                id="ticker"
                placeholder="NVDA"
                value={formData.ticker}
                onChange={(e) => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre Empresa *</Label>
              <Input
                id="companyName"
                placeholder="NVIDIA Corporation"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="entryDate">Fecha Entrada *</Label>
              <Input
                id="entryDate"
                type="date"
                value={formData.entryDate}
                onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector">Sector *</Label>
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData({ ...formData, sector: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech">Tech / IA</SelectItem>
                  <SelectItem value="Semiconductors">Semiconductores</SelectItem>
                  <SelectItem value="Software">Software / Cloud</SelectItem>
                  <SelectItem value="Finance">Finanzas</SelectItem>
                  <SelectItem value="Healthcare">Healthcare / Biotech</SelectItem>
                  <SelectItem value="Consumer">Consumer / Retail</SelectItem>
                  <SelectItem value="Energy">Energía</SelectItem>
                  <SelectItem value="Other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Precio y tamaño */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Precio y Tamaño de Posición</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCalculateOptimal}
              disabled={!formData.entryPrice || !formData.stopLoss || isLoading}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calcular Óptimo
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="entryPrice">Precio Entrada (€) *</Label>
              <Input
                id="entryPrice"
                type="number"
                step="0.01"
                placeholder="125.50"
                value={formData.entryPrice}
                onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shares">Acciones / CFDs *</Label>
              <Input
                id="shares"
                type="number"
                step="0.01"
                placeholder="10"
                value={formData.shares}
                onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss (€) *</Label>
              <Input
                id="stopLoss"
                type="number"
                step="0.01"
                placeholder="118.00"
                value={formData.stopLoss}
                onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Cálculos automáticos */}
          {calculatedData.capitalInvested > 0 && (
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Capital Invertido:</span>
                  <span className="font-medium text-white">
                    {calculatedData.capitalInvested.toFixed(2)}€
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Riesgo:</span>
                  <span className={`font-medium ${
                    calculatedData.riskPercentage > 3 ? 'text-red-500' :
                    calculatedData.riskPercentage < 2 ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {calculatedData.riskEuros.toFixed(2)}€ ({calculatedData.riskPercentage.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Take Profit 1 (+8%):</span>
                  <span className="font-medium text-green-500">
                    {calculatedData.tp1.toFixed(2)}€
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Take Profit 2 (+15%):</span>
                  <span className="font-medium text-green-500">
                    {calculatedData.tp2.toFixed(2)}€
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Take Profit 3 (+25%):</span>
                  <span className="font-medium text-green-500">
                    {calculatedData.tp3.toFixed(2)}€
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tesis */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader>
          <CardTitle>Tesis de Inversión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="technicalSetup">Setup Técnico *</Label>
            <Select
              value={formData.technicalSetup}
              onValueChange={(value) => setFormData({ ...formData, technicalSetup: value })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona setup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakout">Breakout</SelectItem>
                <SelectItem value="pullback">Pullback</SelectItem>
                <SelectItem value="reversal">Reversal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="catalyst">Catalizador / Razón *</Label>
            <Textarea
              id="catalyst"
              placeholder="Ej: Breakout de consolidación + earnings beat Q4"
              value={formData.catalyst}
              onChange={(e) => setFormData({ ...formData, catalyst: e.target.value })}
              required
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="entryNotes">Notas Adicionales</Label>
            <Textarea
              id="entryNotes"
              placeholder="Análisis técnico, contexto de mercado, etc."
              value={formData.entryNotes}
              onChange={(e) => setFormData({ ...formData, entryNotes: e.target.value })}
              disabled={isLoading}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Botón submit */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading || !!error}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Abrir Posición
            </>
          )}
        </Button>
      </div>
    </form>
  );
}