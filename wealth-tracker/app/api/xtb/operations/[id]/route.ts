// app/api/xtb/operations/[id]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db/mongodb';
import XTBOperation from '@/lib/db/models/XTBOperation';

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    await connectDB();

    const body = await req.json();
    const { id } = await context.params;

    // Buscar operación
    const operation = await XTBOperation.findOne({
      _id: id,
      userId: userId,
    });

    if (!operation) {
      return NextResponse.json(
        { error: 'Operación no encontrada' },
        { status: 404 }
      );
    }

    // Si es cierre de operación
    if (body.action === 'close') {
      const exitPrice = parseFloat(body.exitPrice);
      const exitDate = new Date(body.exitDate);
      
      // Calcular P/L
      const plEuros = (exitPrice - operation.entryPrice) * operation.shares;
      const plPercentage = ((exitPrice / operation.entryPrice) - 1) * 100;
      
      // Calcular duración
      const durationDays = Math.floor(
        (exitDate.getTime() - new Date(operation.entryDate).getTime()) / 
        (1000 * 60 * 60 * 24)
      );

      operation.status = 'closed';
      operation.exitDate = exitDate;
      operation.exitPrice = exitPrice;
      operation.plEuros = plEuros;
      operation.plPercentage = plPercentage;
      operation.durationDays = durationDays;
      operation.closeReason = body.closeReason;
      operation.exitNotes = body.exitNotes;
      operation.whatWorked = body.whatWorked;
      operation.whatToImprove = body.whatToImprove;
      operation.setupRating = body.setupRating;

      await operation.save();

      return NextResponse.json({
        message: 'Operación cerrada correctamente',
        operation: {
          id: operation._id,
          ticker: operation.ticker,
          plEuros,
          plPercentage,
        },
      });
    }

    // Si es actualización de stop loss
    if (body.action === 'updateStop') {
      operation.stopLoss = parseFloat(body.stopLoss);
      await operation.save();

      return NextResponse.json({
        message: 'Stop loss actualizado',
      });
    }

    return NextResponse.json(
      { error: 'Acción no válida' },
      { status: 400 }
    );

  } catch (error: unknown) {
    console.error('Error al actualizar operación:', error);
    
    return NextResponse.json(
      { error: 'Error al actualizar operación' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    await connectDB();

    const { id } = await context.params;

    const result = await XTBOperation.deleteOne({
      _id: id,
      userId: userId,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Operación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Operación eliminada correctamente',
    });

  } catch (error: unknown) {
    console.error('Error al eliminar operación:', error);
    
    return NextResponse.json(
      { error: 'Error al eliminar operación' },
      { status: 500 }
    );
  }
}