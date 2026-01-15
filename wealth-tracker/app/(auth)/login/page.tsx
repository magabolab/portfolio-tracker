// app/(auth)/login/page.tsx
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Login | Wealth Tracker',
  description: 'Inicia sesión en tu cuenta',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Wealth Tracker</h1>
          <p className="text-slate-400">Gestión patrimonial profesional</p>
        </div>

        {/* Card de Login */}
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Accede a tu dashboard de inversiones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            
            <div className="mt-6 text-center text-sm">
              <span className="text-slate-400">¿No tienes cuenta? </span>
              <Link 
                href="/register" 
                className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
              >
                Regístrate aquí
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Sistema de tracking profesional para traders e inversores
        </p>
      </div>
    </div>
  );
}