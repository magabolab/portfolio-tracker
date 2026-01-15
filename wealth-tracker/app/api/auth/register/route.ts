// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db/mongodb';
import User from '@/lib/db/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, age } = body;

    if (!email || !password || !name || !age) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      );
    }

    if (age < 18) {
      return NextResponse.json(
        { error: 'Debes ser mayor de 18 años' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      profile: {
        age,
        riskTolerance: 'aggressive',
        annualTarget: 20,
      },
      totalCapital: 0,
    });

    return NextResponse.json(
      { 
        message: 'Usuario creado correctamente',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Error en registro:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    );
  }
}