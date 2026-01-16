// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, BarChart3, Users, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header / Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Gabriel Beneite</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Área de Clientes
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Gestión Patrimonial
            <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Profesional y Transparente
            </span>
          </h1>
          <p className="mb-8 text-xl text-slate-300 md:text-2xl">
            Sistema de gestión de inversiones con enfoque en swing trading y estrategias de crecimiento asimétrico.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6">
                <Users className="mr-2 h-5 w-5" />
                Hazte Cliente
              </Button>
            </Link>
            <Link href="#track-record">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-slate-700 hover:bg-slate-800">
                Ver Track Record
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Track Record Section */}
      <section id="track-record" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Track Record</h2>
            <p className="text-xl text-slate-400">Resultados verificables y transparentes</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-400">ROI Anual</span>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-500">+24.3%</p>
                <p className="text-sm text-slate-500 mt-2">Objetivo: +20% anual</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-400">Win Rate</span>
                  <Target className="h-5 w-5 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-500">68%</p>
                <p className="text-sm text-slate-500 mt-2">Operaciones ganadoras</p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-400">Max Drawdown</span>
                  <Shield className="h-5 w-5 text-purple-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-purple-500">-8.2%</p>
                <p className="text-sm text-slate-500 mt-2">Gestión de riesgo disciplinada</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <BarChart3 className="h-12 w-12 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Metodología Probada
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Sistema basado en las estrategias de José Luis Cava, David Galán, Roberto Chamorro y Mark Minervini.
                    Swing trading con enfoque en gestión de riesgo y asimetría de rentabilidades.
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Máximo 4 posiciones simultáneas</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Riesgo 2-3% por operación</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Stop loss técnico + matemático</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Diversificación sectorial</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-900/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">¿Por qué ser mi cliente?</h2>
            <p className="text-xl text-slate-400">Ventajas de la gestión profesional</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur hover:border-blue-500/50 transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-white">Transparencia Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Acceso 24/7 a tu dashboard personal con todas tus operaciones, P/L en tiempo real y análisis detallado.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
                  <Shield className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-white">Gestión de Riesgo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Sistema disciplinado con stops automáticos, máximo 4 posiciones simultáneas y riesgo controlado del 2-3% por operación.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur hover:border-green-500/50 transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 mb-4">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-white">Estrategia Probada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Metodología basada en traders profesionales: José Luis Cava, Mark Minervini, Roberto Chamorro y David Galán.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur hover:border-orange-500/50 transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 mb-4">
                  <Target className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-white">Objetivo Claro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Busco rentabilidad asimétrica de +20% anual sin apalancamiento excesivo. Crecimiento sostenible a largo plazo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <Users className="h-6 w-6 text-cyan-500" />
                </div>
                <CardTitle className="text-white">Portal de Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Dashboard personalizado donde puedes ver tu patrimonio total, operaciones activas, historial y analytics en tiempo real.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/50 backdrop-blur hover:border-pink-500/50 transition-all">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-pink-500" />
                </div>
                <CardTitle className="text-white">Sin Conflictos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Opero mi propio capital con la misma estrategia. Mis intereses están 100% alineados con los tuyos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-slate-800 bg-gradient-to-br from-blue-600 to-purple-600 max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              ¿Listo para hacer crecer tu patrimonio?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Únete al sistema de gestión profesional con total transparencia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-6">
                  <Users className="mr-2 h-5 w-5" />
                  Solicitar Acceso
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Ya soy cliente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Gabriel Beneite</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2026 Wealth Tracker. Sistema profesional de gestión patrimonial.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}