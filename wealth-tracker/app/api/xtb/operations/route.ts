// app/api/xtb/operations/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db/mongodb';
import XTBOperation from '@/lib/db/models/XTBOperation';
import { validateMaxPositions } from '@/lib/validations/xtb-rules';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    await connectDB();

    // Verificar número de posiciones abiertas
    const openPositions = await XTBOperation.countDocuments({
      userId: session.user.id,
      status: 'open',
    });

    const maxPositionsValidation = validateMaxPositions(openPositions);
    if (!maxPositionsValidation.valid) {
      return NextResponse.json(
        { error: maxPositionsValidation.error },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Crear operación
    const operation = await XTBOperation.create({
      userId: session.user.id,
      ticker: body.ticker,
      companyName: body.companyName,
      entryDate: new Date(body.entryDate),
      entryPrice: parseFloat(body.entryPrice),
      shares: parseFloat(body.shares),
      capitalInvested: parseFloat(body.capitalInvested),
      stopLoss: parseFloat(body.stopLoss),
      riskEuros: parseFloat(body.riskEuros),
      riskPercentage: parseFloat(body.riskPercentage),
      takeProfit1: parseFloat(body.takeProfit1),
      takeProfit2: parseFloat(body.takeProfit2),
      takeProfit3: parseFloat(body.takeProfit3),
      catalyst: body.catalyst,
      technicalSetup: body.technicalSetup,
      sector: body.sector,
      entryNotes: body.entryNotes,
      status: 'open',
    });

    return NextResponse.json(
      {
        message: 'Operación creada correctamente',
        operation: {
          id: operation._id,
          ticker: operation.ticker,
        },
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Error al crear operación:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error al crear operación' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all';

    let query: any = { userId: session.user.id };
    
    if (status !== 'all') {
      query.status = status;
    }

    const operations = await XTBOperation.find(query)
      .sort({ entryDate: -1 })
      .lean();

    return NextResponse.json({
      operations,
      count: operations.length,
    });

  } catch (error: unknown) {
    console.error('Error al obtener operaciones:', error);
    
    return NextResponse.json(
      { error: 'Error al obtener operaciones' },
      { status: 500 }
    );
  }
}