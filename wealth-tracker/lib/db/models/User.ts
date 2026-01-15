// lib/db/models/User.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
  profile: {
    age: number;
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    annualTarget: number;
  };
  totalCapital: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  profile: {
    age: { 
      type: Number, 
      required: true,
      min: [18, 'Debes ser mayor de 18 años'],
    },
    riskTolerance: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive'],
      default: 'aggressive',
    },
    annualTarget: { 
      type: Number, 
      default: 20,
      min: [0, 'El objetivo no puede ser negativo'],
    },
  },
  totalCapital: { 
    type: Number, 
    default: 0,
    min: [0, 'El capital no puede ser negativo'],
  },
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;