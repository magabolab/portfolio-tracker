// lib/db/models/XTBOperation.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IXTBOperation extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  ticker: string;
  companyName: string;
  entryDate: Date;
  entryPrice: number;
  shares: number;
  capitalInvested: number;
  
  // Risk management
  stopLoss: number;
  riskEuros: number;
  riskPercentage: number;
  
  // Take profits
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  
  // Thesis
  catalyst: string;
  technicalSetup: 'breakout' | 'pullback' | 'reversal';
  sector: string;
  sectorMomentum?: string;
  
  // Status
  status: 'open' | 'closed';
  
  // Exit data
  exitDate?: Date;
  exitPrice?: number;
  plEuros?: number;
  plPercentage?: number;
  durationDays?: number;
  closeReason?: 'stop_loss' | 'take_profit' | 'temporal_stop' | 'other';
  
  // Journal
  entryNotes?: string;
  exitNotes?: string;
  whatWorked?: string;
  whatToImprove?: string;
  setupRating?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const XTBOperationSchema = new Schema<IXTBOperation>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  ticker: {
    type: String,
    required: [true, 'El ticker es obligatorio'],
    uppercase: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: [true, 'El nombre de la empresa es obligatorio'],
  },
  entryDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  entryPrice: {
    type: Number,
    required: [true, 'El precio de entrada es obligatorio'],
    min: [0, 'El precio no puede ser negativo'],
  },
  shares: {
    type: Number,
    required: [true, 'El número de acciones es obligatorio'],
    min: [0.01, 'Debe tener al menos 0.01 acciones'],
  },
  capitalInvested: {
    type: Number,
    required: true,
  },
  
  // Risk management
  stopLoss: {
    type: Number,
    required: [true, 'El stop loss es obligatorio'],
    min: [0, 'El stop loss no puede ser negativo'],
  },
  riskEuros: {
    type: Number,
    required: true,
  },
  riskPercentage: {
    type: Number,
    required: true,
    max: [3, 'El riesgo no puede exceder el 3%'],
  },
  
  // Take profits
  takeProfit1: { type: Number, required: true },
  takeProfit2: { type: Number, required: true },
  takeProfit3: { type: Number, required: true },
  
  // Thesis
  catalyst: { type: String, required: true },
  technicalSetup: {
    type: String,
    enum: ['breakout', 'pullback', 'reversal'],
    required: true,
  },
  sector: { type: String, required: true },
  sectorMomentum: { type: String },
  
  // Status
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
    index: true,
  },
  
  // Exit data
  exitDate: { type: Date },
  exitPrice: { type: Number },
  plEuros: { type: Number },
  plPercentage: { type: Number },
  durationDays: { type: Number },
  closeReason: {
    type: String,
    enum: ['stop_loss', 'take_profit', 'temporal_stop', 'other'],
  },
  
  // Journal
  entryNotes: { type: String },
  exitNotes: { type: String },
  whatWorked: { type: String },
  whatToImprove: { type: String },
  setupRating: {
    type: Number,
    min: 1,
    max: 5,
  },
}, {
  timestamps: true,
});

// Índices para búsquedas eficientes
XTBOperationSchema.index({ userId: 1, status: 1 });
XTBOperationSchema.index({ userId: 1, entryDate: -1 });

const XTBOperation: Model<IXTBOperation> = 
  mongoose.models.XTBOperation || 
  mongoose.model<IXTBOperation>('XTBOperation', XTBOperationSchema);

export default XTBOperation;