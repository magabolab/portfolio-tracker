// app/(dashboard)/xtb/positions/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import PositionCard from '@/components/xtb/PositionCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import XTBTabs from '@/components/xtb/XTBTabs';

export default function XTBPositionsPage() {
  const router = useRouter();
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPositions = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/xtb/operations?status=open');
      
      if (!response.ok) {
        throw new Error('Error al cargar posiciones');
      }

      const data = await response.json();
      setPositions(data.operations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar posiciones');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">XTB Trading</h1>
          <p className="text-slate-400">
            {positions.length} / 4 posiciones activas
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={fetchPositions}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
          <Button
            onClick={() => router.push('/xtb/add')}
            disabled={positions.length >= 4}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Operación
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <XTBTabs />

      {/* Alertas */}
      {positions.length >= 4 && (
        <Alert variant="destructive">
          <AlertDescription>
            Has alcanzado el límite de 4 posiciones simultáneas. Cierra una posición antes de abrir otra.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Lista de posiciones */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : positions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-slate-800 p-6 mb-4">
            <Plus className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No tienes posiciones abiertas
          </h3>
          <p className="text-slate-400 mb-6">
            Abre tu primera operación para empezar a trackear
          </p>
          <Button onClick={() => router.push('/xtb/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Operación
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {positions.map((position: any) => (
            <PositionCard key={position._id} position={position} />
          ))}
        </div>
      )}
    </div>
  );
}