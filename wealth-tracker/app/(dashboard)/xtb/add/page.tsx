// app/(dashboard)/xtb/add/page.tsx
import OperationForm from '@/components/xtb/OperationForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Nueva Operación | XTB Trading',
  description: 'Añade una nueva operación de trading',
};

export default function AddOperationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Link href="/xtb/positions">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Nueva Operación</h1>
          </div>
          <p className="text-slate-400 mt-1 ml-12">
            Abre una nueva posición en XTB
          </p>
        </div>
      </div>

      {/* Formulario */}
      <OperationForm />
    </div>
  );
}