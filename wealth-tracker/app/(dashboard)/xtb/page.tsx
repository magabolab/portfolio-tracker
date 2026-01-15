// app/(dashboard)/xtb/page.tsx
import { redirect } from 'next/navigation';

export default function XTBPage() {
  // Redirigir automáticamente a posiciones
  redirect('/xtb/positions');
}