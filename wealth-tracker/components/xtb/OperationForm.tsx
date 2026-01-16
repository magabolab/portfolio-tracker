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
import { Loader2, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  
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

  // Recalcular cuando cambien los datos relevantes
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

      // Validaciones
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

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const canProceedStep1 = formData.ticker && formData.companyName && formData.entryPrice && formData.entryDate;
  const canProceedStep2 = formData.stopLoss && formData.shares && !error;
  const canProceedStep3 = formData.sector && formData.technicalSetup && formData.catalyst;

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    const entryPrice = parseFloat(formData.entryPrice);
    const shares = parseFloat(formData.shares);
    const stopLoss = parseFloat(formData.stopLoss);

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

      router.push('/xtb/positions');
      router.refresh();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la operación');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                step === currentStep
                  ? 'bg-blue-500 text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {step < currentStep ? <CheckCircle2 className="h-5 w-5" /> : step}
            </div>
            {step < 4 && (
              <div
                className={`h-1 flex-1 mx-2 transition-all ${
                  step < currentStep ? 'bg-green-500' : 'bg-slate-800'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-xs text-slate-400 -mt-2">
        <span className={currentStep === 1 ? 'text-blue-500 font-medium' : ''}>Datos Básicos</span>
        <span className={currentStep === 2 ? 'text-blue-500 font-medium' : ''}>Gestión Riesgo</span>
        <span className={currentStep === 3 ? 'text-blue-500 font-medium' : ''}>Tesis</span>
        <span className={currentStep === 4 ? 'text-blue-500 font-medium' : ''}>Confirmar</span>
      </div>

      {/* Error/Warning Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {warning && !error && (
        <Alert className="border-yellow-500/50 bg-yellow-500/5">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-500">{warning}</AlertDescription>
        </Alert>
      )}

      {/* Step 1: Datos Básicos */}
      {currentStep === 1 && (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Paso 1: Datos Básicos</CardTitle>
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
                  className="h-11"
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
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryDate">Fecha Entrada *</Label>
                <Input
                  id="entryDate"
                  type="date"
                  value={formData.entryDate}
                  onChange={(e) => setFormData({ ...formData, entryDate: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Gestión de Riesgo */}
      {currentStep === 2 && (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Paso 2: Gestión de Riesgo</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCalculateOptimal}
                disabled={!formData.entryPrice || !formData.stopLoss}
              >
                Calcular Óptimo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
                className="h-11"
              />
              <p className="text-xs text-slate-500">
                Precio al que cerrarás la operación si va mal
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shares">Número de Acciones *</Label>
              <Input
                id="shares"
                type="number"
                step="0.01"
                placeholder="10"
                value={formData.shares}
                onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                required
                className="h-11"
              />
            </div>

            {/* Cálculos Automáticos */}
            {calculatedData.capitalInvested > 0 && (
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Capital a Invertir:</span>
                  <span className="font-semibold text-white">
                    {calculatedData.capitalInvested.toFixed(2)}€
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Riesgo:</span>
                  <span className={`font-semibold ${
                    calculatedData.riskPercentage > 3 ? 'text-red-500' :
                    calculatedData.riskPercentage < 2 ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {calculatedData.riskEuros.toFixed(2)}€ ({calculatedData.riskPercentage.toFixed(2)}%)
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-800 space-y-1">
                  <p className="text-xs text-slate-500">Take Profits Automáticos:</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">TP1 (+8%):</span>
                    <span className="text-green-500">{calculatedData.tp1.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">TP2 (+15%):</span>
                    <span className="text-green-500">{calculatedData.tp2.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">TP3 (+25%):</span>
                    <span className="text-green-500">{calculatedData.tp3.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Tesis */}
      {currentStep === 3 && (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Paso 3: Tesis de Inversión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sector">Sector *</Label>
                <Select
                  value={formData.sector}
                  onValueChange={(value) => setFormData({ ...formData, sector: value })}
                >
                  <SelectTrigger className="h-11">
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

              <div className="space-y-2">
                <Label htmlFor="technicalSetup">Setup Técnico *</Label>
                <Select
                  value={formData.technicalSetup}
                  onValueChange={(value) => setFormData({ ...formData, technicalSetup: value })}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecciona setup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakout">Breakout</SelectItem>
                    <SelectItem value="pullback">Pullback</SelectItem>
                    <SelectItem value="reversal">Reversal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="catalyst">¿Por qué entras en esta operación? *</Label>
              <Textarea
                id="catalyst"
                placeholder="Ej: Breakout de consolidación + earnings beat Q4"
                value={formData.catalyst}
                onChange={(e) => setFormData({ ...formData, catalyst: e.target.value })}
                required
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryNotes">Notas Adicionales (Opcional)</Label>
              <Textarea
                id="entryNotes"
                placeholder="Contexto adicional, análisis técnico..."
                value={formData.entryNotes}
                onChange={(e) => setFormData({ ...formData, entryNotes: e.target.value })}
                rows={2}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review */}
      {currentStep === 4 && (
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Paso 4: Confirmar Operación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">{formData.ticker} - {formData.companyName}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Precio Entrada</p>
                    <p className="font-semibold text-white">{parseFloat(formData.entryPrice).toFixed(2)}€</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Stop Loss</p>
                    <p className="font-semibold text-red-400">{parseFloat(formData.stopLoss).toFixed(2)}€</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Acciones</p>
                    <p className="font-semibold text-white">{formData.shares}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Inversión Total</p>
                    <p className="font-semibold text-white">{calculatedData.capitalInvested.toFixed(2)}€</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-800/50 p-4">
                <p className="text-xs text-slate-400 mb-2">Gestión de Riesgo</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Riesgo de la operación:</span>
                  <span className={`font-bold ${
                    calculatedData.riskPercentage > 3 ? 'text-red-500' :
                    calculatedData.riskPercentage >= 2 ? 'text-green-500' :
                    'text-yellow-500'
                  }`}>
                    {calculatedData.riskPercentage.toFixed(2)}% ({calculatedData.riskEuros.toFixed(2)}€)
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-2">Tesis</p>
                <p className="text-sm text-slate-300">{formData.catalyst}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
        )}

        {currentStep < 4 ? (
          <Button
            type="button"
            onClick={nextStep}
            disabled={
              (currentStep === 1 && !canProceedStep1) ||
              (currentStep === 2 && !canProceedStep2) ||
              (currentStep === 3 && !canProceedStep3)
            }
          >
            Siguiente
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
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
        )}
      </div>
    </div>
  );
}