// lib/validations/xtb-rules.ts

export interface ValidationResult {
  valid: boolean;
  error?: string;
  warning?: string;
}

export interface NewOperationData {
  entryPrice: number;
  stopLoss: number;
  shares: number;
  sector: string;
}

/**
 * Valida que no se excedan las 4 posiciones simultáneas
 */
export function validateMaxPositions(currentPositions: number): ValidationResult {
  if (currentPositions >= 4) {
    return {
      valid: false,
      error: '❌ Ya tienes 4 posiciones abiertas. Cierra una antes de abrir otra.',
    };
  }
  
  if (currentPositions === 3) {
    return {
      valid: true,
      warning: '⚠️ Esta será tu 4ª posición (límite máximo).',
    };
  }
  
  return { valid: true };
}

/**
 * Calcula el riesgo de una operación
 */
export function calculateRisk(
  entryPrice: number,
  stopLoss: number,
  shares: number,
  totalCapital: number
): {
  riskEuros: number;
  riskPercentage: number;
} {
  const riskEuros = (entryPrice - stopLoss) * shares;
  const riskPercentage = (riskEuros / totalCapital) * 100;
  
  return {
    riskEuros: Math.abs(riskEuros),
    riskPercentage: Math.abs(riskPercentage),
  };
}

/**
 * Valida que el riesgo esté entre 2-3%
 */
export function validateRisk(
  entryPrice: number,
  stopLoss: number,
  shares: number,
  totalCapital: number
): ValidationResult {
  const { riskEuros, riskPercentage } = calculateRisk(
    entryPrice,
    stopLoss,
    shares,
    totalCapital
  );
  
  if (riskPercentage > 3) {
    const maxShares = calculateMaxShares(entryPrice, stopLoss, totalCapital, 3);
    return {
      valid: false,
      error: `❌ Riesgo del ${riskPercentage.toFixed(2)}% excede el límite del 3%. Reduce el tamaño a máximo ${maxShares.toFixed(2)} acciones.`,
    };
  }
  
  if (riskPercentage < 2) {
    return {
      valid: true,
      warning: `⚠️ Riesgo del ${riskPercentage.toFixed(2)}% es bajo (óptimo: 2-3%). Podrías aumentar el tamaño.`,
    };
  }
  
  return { valid: true };
}

/**
 * Calcula el número máximo de acciones dado un riesgo
 */
export function calculateMaxShares(
  entryPrice: number,
  stopLoss: number,
  totalCapital: number,
  maxRiskPercentage: number
): number {
  const maxRiskEuros = (totalCapital * maxRiskPercentage) / 100;
  const priceDistance = Math.abs(entryPrice - stopLoss);
  
  if (priceDistance === 0) return 0;
  
  return maxRiskEuros / priceDistance;
}

/**
 * Calcula los niveles de take profit automáticamente
 */
export function calculateTakeProfits(entryPrice: number): {
  tp1: number;
  tp2: number;
  tp3: number;
} {
  return {
    tp1: entryPrice * 1.08,  // +8%
    tp2: entryPrice * 1.15,  // +15%
    tp3: entryPrice * 1.25,  // +25%
  };
}

/**
 * Valida que el stop loss sea coherente
 */
export function validateStopLoss(
  entryPrice: number,
  stopLoss: number
): ValidationResult {
  if (stopLoss >= entryPrice) {
    return {
      valid: false,
      error: '❌ El stop loss debe estar por debajo del precio de entrada.',
    };
  }
  
  const stopDistance = ((entryPrice - stopLoss) / entryPrice) * 100;
  
  if (stopDistance > 6) {
    return {
      valid: false,
      error: `❌ Stop demasiado lejano (${stopDistance.toFixed(1)}%). Máximo recomendado: 6%.`,
    };
  }
  
  if (stopDistance < 2) {
    return {
      valid: true,
      warning: `⚠️ Stop muy ajustado (${stopDistance.toFixed(1)}%). Riesgo de salto prematuro.`,
    };
  }
  
  return { valid: true };
}

/**
 * Calcula la correlación entre sectores (simplificada)
 */
export function calculateSectorCorrelation(
  newSector: string,
  existingSectors: string[]
): number {
  // Sectores altamente correlacionados
  const correlatedSectors: { [key: string]: string[] } = {
    'Tech': ['Software', 'Semiconductors', 'Cloud'],
    'Software': ['Tech', 'Cloud', 'SaaS'],
    'Semiconductors': ['Tech', 'Hardware'],
    'Cloud': ['Tech', 'Software'],
    'Finance': ['Banking', 'Insurance', 'FinTech'],
    'Healthcare': ['Biotech', 'Pharma'],
    'Energy': ['Oil', 'Gas', 'Renewables'],
  };
  
  let maxCorrelation = 0;
  
  for (const existingSector of existingSectors) {
    if (existingSector === newSector) {
      maxCorrelation = 1;
      break;
    }
    
    if (correlatedSectors[newSector]?.includes(existingSector) ||
        correlatedSectors[existingSector]?.includes(newSector)) {
      maxCorrelation = Math.max(maxCorrelation, 0.7);
    }
  }
  
  return maxCorrelation;
}

/**
 * Valida correlación con posiciones existentes
 */
export function validateCorrelation(
  newSector: string,
  existingSectors: string[]
): ValidationResult {
  const correlation = calculateSectorCorrelation(newSector, existingSectors);
  
  if (correlation >= 0.7) {
    return {
      valid: true,
      warning: `⚠️ Alta correlación con posiciones existentes (${(correlation * 100).toFixed(0)}%). Estás concentrando riesgo en ${newSector}.`,
    };
  }
  
  return { valid: true };
}

/**
 * Calcula el tamaño óptimo de posición
 */
export function calculateOptimalPositionSize(
  entryPrice: number,
  stopLoss: number,
  totalCapital: number,
  targetRiskPercentage: number = 2.5
): {
  shares: number;
  capitalInvested: number;
  riskEuros: number;
} {
  const shares = calculateMaxShares(entryPrice, stopLoss, totalCapital, targetRiskPercentage);
  const capitalInvested = shares * entryPrice;
  const riskEuros = (totalCapital * targetRiskPercentage) / 100;
  
  return {
    shares: Math.floor(shares * 100) / 100, // Redondear a 2 decimales
    capitalInvested: Math.round(capitalInvested * 100) / 100,
    riskEuros: Math.round(riskEuros * 100) / 100,
  };
}