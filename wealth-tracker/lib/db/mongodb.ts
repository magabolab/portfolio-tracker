// lib/db/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('⚠️ Por favor define MONGODB_URI en tu archivo .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached!.conn) {
    console.log('✅ Usando conexión existente de MongoDB');
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('🔄 Conectando a MongoDB...');
    cached!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached!.conn = await cached!.promise;
    console.log('✅ MongoDB conectado correctamente');
  } catch (e) {
    cached!.promise = null;
    console.error('❌ Error al conectar MongoDB:', e);
    throw e;
  }

  return cached!.conn;
}

export default connectDB;