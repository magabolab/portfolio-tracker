# 📅 DEVELOPMENT PLAN - WEALTH TRACKER

> **Metodología**: Iterativa, features pequeñas, deploy frecuente  
> **Ciclos**: Sprints de 1-2 semanas  
> **Principio**: Construir → Probar con data real → Iterar  

---

## 🎯 ROADMAP DE ALTO NIVEL

```
FASE 0: Setup & Fundamentos (1-2 semanas)
├─ Documentación base
├─ Estructura proyecto
├─ Deploy pipeline
└─ Auth básica

FASE 1: MVP Core (4-6 semanas)
├─ Dashboard principal
├─ Módulo XTB completo
├─ Analytics básicos
└─ Perfil público v1

FASE 2: Multi-Plataforma (4-6 semanas)
├─ Trade Republic
├─ Mintos
├─ Real Estate
└─ Dashboard unificado avanzado

FASE 3: Profesionalización (8+ semanas)
├─ Import/Export
├─ Analytics avanzados
├─ Optimizaciones
└─ Features "nice to have"
```

---

## 📋 FASE 0: SETUP & FUNDAMENTOS

**Duración**: 1-2 semanas  
**Objetivo**: Tener base sólida para construir sobre ella  
**Estado Actual**: 🚧 En progreso  

### ✅ Tareas Completadas

- [x] Repositorio GitHub creado
- [x] Deploy Vercel configurado
- [x] Estructura Next.js base

### 🚧 Tareas Pendientes

#### T0.1: Documentación Base (Esta semana)

**Subtareas**:
- [x] PROJECT_OVERVIEW.md
- [x] PRODUCT_VISION.md
- [x] TECHNICAL_SPEC.md
- [ ] DEVELOPMENT_PLAN.md (este archivo)
- [ ] WORKING_AGREEMENT.md
- [ ] README.md actualizado

**Entregable**: `/docs` folder completo

---

#### T0.2: Limpieza Código Base (2-3 días)

**Contexto**: Tenemos código del briefing original que necesita ajuste

**Subtareas**:
1. Revisar componentes existentes
2. Eliminar features que NO necesitamos (validaciones bloqueantes)
3. Simplificar estructura si es necesario
4. Verificar que compile sin errores

**Checklist**:
- [ ] Compilación limpia (`npm run build`)
- [ ] No errores TypeScript
- [ ] Componentes UI básicos funcionan
- [ ] Deploy a Vercel exitoso

---

#### T0.3: MongoDB Atlas Setup (1 día)

**Subtareas**:
1. Crear cuenta MongoDB Atlas
2. Crear cluster free tier
3. Configurar usuario DB
4. Whitelist IP (0.0.0.0/0 para Vercel)
5. Obtener connection string
6. Añadir a Vercel env vars

**Checklist**:
- [ ] Cluster creado y activo
- [ ] Connection string en `.env.local`
- [ ] Connection string en Vercel
- [ ] Test de conexión exitoso

**Test**:
```typescript
// test-db-connection.ts
import connectDB from '@/lib/db/mongodb';

async function testConnection() {
  try {
    await connectDB();
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}
```

---

#### T0.4: Autenticación Básica (2-3 días)

**Objetivo**: Login/Logout funcional con un usuario (yo)

**Subtareas**:
1. Verificar NextAuth.js configurado
2. Crear schema User en MongoDB
3. Implementar registro (solo 1 vez)
4. Implementar login
5. Proteger rutas dashboard

**Checklist**:
- [ ] Puedo registrarme en `/register`
- [ ] Puedo hacer login en `/login`
- [ ] Session persiste (no me desloguea al refrescar)
- [ ] `/dashboard` solo accesible si estoy logueado
- [ ] Logout funciona

**Criterio de éxito**: Puedo hacer login → Ver dashboard vacío → Logout

---

### 📊 Métricas Fase 0

- **Tiempo estimado**: 7-10 días
- **Blocker crítico**: MongoDB connection
- **Success criteria**: Deploy con auth funcional

---

## 🚀 FASE 1: MVP CORE

**Duración**: 4-6 semanas  
**Objetivo**: Sistema usable para tracking diario de XTB  
**Estado**: ⏳ No iniciado  

### Sprint 1.1: Dashboard Principal (1 semana)

#### T1.1.1: Layout Dashboard

**Objetivo**: Estructura visual básica

**Componentes**:
```
DashboardLayout
├─ Sidebar (navegación)
├─ Header (usuario, logout)
└─ Main content area
```

**Checklist**:
- [ ] Sidebar con links a módulos
- [ ] Header con nombre usuario
- [ ] Responsive (mobile menu)
- [ ] Dark theme aplicado

---

#### T1.1.2: Widget Patrimonio Total

**Objetivo**: Número grande mostrando total assets

**Cálculo**:
```typescript
const totalWealth = 
  xtbBalance + 
  trBalance + 
  mintosBalance + 
  realEstateEquity;
```

**Checklist**:
- [ ] Card con número grande
- [ ] Formato moneda (€)
- [ ] Cambio mensual (mock data inicialmente)
- [ ] Loading state

---

#### T1.1.3: Gráfico Distribución

**Objetivo**: Pie chart mostrando % por plataforma

**Librería**: Recharts

**Checklist**:
- [ ] Pie chart con 4 segmentos
- [ ] Colores diferenciados por plataforma
- [ ] Labels con porcentajes
- [ ] Responsive

---

### Sprint 1.2: Módulo XTB - CRUD Básico (1.5 semanas)

#### T1.2.1: Vista Posiciones Abiertas

**Objetivo**: Ver lista de posiciones activas

**Componente**: `PositionCard`

**Datos mostrados**:
- Ticker + Nombre empresa
- Precio entrada vs. actual (mock)
- P/L (€ y %)
- Días en posición
- Botón "Cerrar"

**Checklist**:
- [ ] Fetch desde API `/api/xtb/operations?status=open`
- [ ] Mapeo a PositionCard
- [ ] Loading state
- [ ] Empty state (si no hay posiciones)
- [ ] Responsive grid

---

#### T1.2.2: Formulario Nueva Operación

**Objetivo**: Añadir operación manualmente

**Campos**:
1. **Paso 1: Básicos**
   - Ticker
   - Nombre empresa
   - Precio entrada
   - Fecha entrada

2. **Paso 2: Risk**
   - Stop loss
   - Número de acciones
   - (Cálculos automáticos: capital invertido, riesgo)

3. **Paso 3: Tesis**
   - Sector
   - Setup técnico
   - Catalizador (texto)

4. **Paso 4: Review**
   - Confirmar datos

**Validaciones** (advertencias, no bloqueantes):
- ⚠️ Si stop loss > 6% distancia
- ⚠️ Si ya tienes 4+ posiciones
- ⚠️ Si riesgo > 3%

**Checklist**:
- [ ] Wizard multi-step funcional
- [ ] Validaciones en tiempo real
- [ ] Cálculos automáticos (P, R, TPs)
- [ ] POST a `/api/xtb/operations`
- [ ] Redirect a posiciones después de crear
- [ ] Loading states

---

#### T1.2.3: Cerrar Operación

**Objetivo**: Marcar posición como cerrada

**Flujo**:
1. Click "Cerrar" en PositionCard
2. Modal/Página con formulario:
   - Precio salida
   - Fecha salida
   - Motivo (dropdown)
   - Notas (textarea)
3. Cálculo automático P/L
4. Confirmar → PATCH a `/api/xtb/operations/:id`

**Checklist**:
- [ ] Modal de cierre
- [ ] Cálculo P/L automático
- [ ] Validación (precio salida > 0)
- [ ] API endpoint PATCH funcional
- [ ] Operación pasa a status='closed'
- [ ] Redirect a historial

---

#### T1.2.4: Vista Historial

**Objetivo**: Ver operaciones cerradas

**Similar a posiciones abiertas pero**:
- Mostrar P/L final
- Mostrar duración
- Mostrar motivo cierre
- No mostrar botón "Cerrar"

**Filtros** (opcional para MVP):
- Por mes
- Por ticker
- Winners vs Losers

**Checklist**:
- [ ] Fetch desde `/api/xtb/operations?status=closed`
- [ ] HistoryCard component
- [ ] Ordenado por fecha (más reciente primero)
- [ ] Paginación básica (20 items)

---

### Sprint 1.3: Analytics XTB (1 semana)

#### T1.3.1: Stats Cards

**Objetivo**: Métricas rápidas de un vistazo

**Cards**:
1. **P/L Total**
   - Suma de todos los P/L cerrados
   - % vs capital inicial (mock)
   
2. **Win Rate**
   - (Operaciones positivas / Total operaciones) * 100
   
3. **Avg Win vs Avg Loss**
   - Promedio de ganancias
   - Promedio de pérdidas
   
4. **Duración Promedio**
   - Días promedio en posición

**Checklist**:
- [ ] Cálculos en backend (API route)
- [ ] Cards renderizadas
- [ ] Actualización al cerrar operación

---

#### T1.3.2: Gráfico P/L Mensual

**Objetivo**: Barras mostrando P/L por mes

**Librería**: Recharts BarChart

**Datos**:
```typescript
[
  { month: 'Sep', pl: 145.50 },
  { month: 'Oct', pl: -85.20 },
  { month: 'Nov', pl: 220.80 },
  ...
]
```

**Checklist**:
- [ ] Agregación mensual en backend
- [ ] BarChart con colores (verde/rojo)
- [ ] Tooltip con detalles
- [ ] Responsive

---

#### T1.3.3: Gráfico Win Rate Histórico

**Objetivo**: Línea mostrando evolución del win rate

**Checklist**:
- [ ] Cálculo win rate acumulado por mes
- [ ] LineChart
- [ ] Línea de referencia (60% objetivo)

---

### Sprint 1.4: Perfil Público v1 (1 semana)

#### T1.4.1: Ruta Pública

**Objetivo**: `/public/@gabriel` accesible sin login

**Contenido inicial**:
- Nombre
- Foto perfil (opcional)
- Métricas agregadas:
  - P/L total
  - Win rate
  - Número de operaciones
- Gráfico equity curve (línea)

**Privacy Settings**:
- Toggle: Mostrar montos exactos (sí/no)
- Toggle: Mostrar operaciones individuales (sí/no)

**Checklist**:
- [ ] Route `/public/[username]`
- [ ] Fetch datos desde API pública
- [ ] No require authentication
- [ ] Settings de privacy en User schema
- [ ] Aplicar settings al renderizar

---

#### T1.4.2: Share Button

**Objetivo**: Botón para copiar URL pública

**Implementación**:
```typescript
const shareUrl = `${window.location.origin}/public/@${username}`;
navigator.clipboard.writeText(shareUrl);
```

**Checklist**:
- [ ] Botón en dashboard
- [ ] Copy to clipboard
- [ ] Toast notification ("Link copiado!")

---

### 📊 Métricas Fase 1 (MVP)

**Success Criteria**:
- [ ] Puedo añadir una operación en <2 minutos
- [ ] Puedo cerrar una operación en <1 minuto
- [ ] Dashboard carga en <2 segundos
- [ ] Puedo compartir mi perfil público
- [ ] Estoy usando la app diariamente

**KPIs**:
- Operaciones registradas: 10+ en primera semana de uso
- Tiempo en app: <5 min/día (eficiente)
- Deploy exitosos: 100% (no romper main)

---

## 🏦 FASE 2: MULTI-PLATAFORMA

**Duración**: 4-6 semanas  
**Objetivo**: Tracking completo de todas las inversiones  
**Estado**: 📅 Planificado  

### Sprint 2.1: Trade Republic (1.5 semanas)

#### T2.1.1: Schema + API

**Schema**: `TradeRepublicPosition`

**Endpoints**:
- `GET /api/trade-republic/positions`
- `POST /api/trade-republic/positions` (nueva posición)
- `PATCH /api/trade-republic/positions/:id` (añadir compra DCA)

---

#### T2.1.2: UI

**Vistas**:
- Lista de posiciones actuales
- Formulario nueva posición
- Formulario registrar compra DCA
- Historial de compras

**Cálculos**:
- Coste medio
- P/L no realizado (si tenemos precio actual)

---

### Sprint 2.2: Mintos (3-5 días)

**Objetivo**: Balance actual + Tracking yield

**Simplificado**:
- Solo 1 registro por mes (snapshot)
- Input manual de saldo total
- Cálculo yield mensual automático

---

### Sprint 2.3: Real Estate (1 semana)

#### Ficha Técnica

**Datos fijos**:
- Dirección
- Valor tasación
- Hipoteca inicial
- Tipo interés
- Plazo

**Datos dinámicos** (mensuales):
- Deuda actual
- Cashflow mensual (renta - gastos)

#### Calculadora Amortización

**Tabla francesa**:
- Cuota mensual
- Capital + Intereses desglosados
- Deuda pendiente

---

### Sprint 2.4: Dashboard Unificado (1 semana)

**Objetivo**: Integrar todas las plataformas

**Widgets**:
- Patrimonio total (suma real de todas)
- Distribución actualizada
- Gráfico histórico (stacked area)
- Resumen por plataforma (cards)

**API Endpoint**:
```typescript
GET /api/portfolio/summary

Response:
{
  total: 53575.31,
  breakdown: {
    xtb: { value: 1766.82, pl: -58, plPct: -3.2 },
    tradeRepublic: { value: 1056.23, pl: 112, plPct: 11.8 },
    mintos: { value: 752.26, yield: 9.2 },
    realEstate: { equity: 50000, cashflow: 450 },
  },
  change30d: { euros: 500, pct: 0.9 },
}
```

---

### 📊 Métricas Fase 2

**Success Criteria**:
- [ ] Dashboard muestra patrimonio total real y correcto
- [ ] Todas las plataformas integradas
- [ ] Actualización mensual <10 minutos total

---

## 🚀 FASE 3: PROFESIONALIZACIÓN

**Duración**: 8+ semanas (flexibly)  
**Objetivo**: Producto pulido y optimizado  
**Estado**: 🔮 Futuro  

### Features Planificadas

**1. Import/Export** (2 semanas)
- Import CSV desde XTB
- Import CSV desde Trade Republic
- Export portfolio completo (JSON/CSV)

**2. Analytics Avanzados** (2 semanas)
- Heatmap de rendimiento
- Análisis por sector
- Correlaciones entre assets
- Comparativa vs benchmarks (SPY, etc.)

**3. Optimizaciones** (1-2 semanas)
- Caching
- Paginación
- Image optimization
- Code splitting

**4. APIs de Precios** (1 semana)
- Integración Alpha Vantage / Yahoo Finance
- Actualización automática posiciones abiertas
- Alertas por email (opcional)

**5. Branding & SEO** (1 semana)
- Dominio personalizado
- Logo/Favicon
- Meta tags
- Open Graph para shares

---

## 📈 TRACKING DE PROGRESO

### Weekly Check-ins

**Cada Viernes**:
1. Review de la semana:
   - ¿Qué se completó?
   - ¿Qué bloqueó?
2. Plan próxima semana:
   - 3-5 tareas específicas
3. Update documentación:
   - Marcar tasks como completadas
   - Actualizar timelines si necesario

### Sprint Reviews

**Cada 2 semanas**:
- Demo de features nuevas
- Deploy a producción
- Retrospectiva:
  - ¿Qué fue bien?
  - ¿Qué mejorar?
  - Ajustes al plan

---

## 🎯 PRIORIZACIÓN

### Framework: MoSCoW

**MUST Have** (MVP):
- Auth
- Dashboard
- XTB CRUD
- Perfil público básico

**SHOULD Have** (Fase 2):
- Trade Republic
- Mintos
- Real Estate
- Dashboard unificado

**COULD Have** (Fase 3):
- Import CSV
- APIs de precios
- Analytics avanzados

**WON'T Have** (Por ahora):
- Multi-user
- Mobile app nativa
- Backtesting
- Bot trading

---

## 🔄 PROCESO ITERATIVO

```
PLAN → BUILD → DEPLOY → USE → LEARN → AJUSTAR

Ejemplo:
1. Plan: "Añadir formulario nueva operación"
2. Build: Implementar en 2-3 días
3. Deploy: Push a main → Vercel
4. Use: Registrar 3-5 operaciones reales
5. Learn: "El formulario es muy largo, cansa"
6. Ajustar: Simplificar a 2 pasos en vez de 4
```

**Ciclo rápido**: 1-2 semanas por feature

---

## 📝 CHANGELOG

| Fecha | Cambio | Razón |
|-------|--------|-------|
| 30-Ene-2026 | Plan inicial creado | Definir roadmap claro |

---

**Next Steps**:
1. Completar documentación (WORKING_AGREEMENT.md)
2. Kickoff Fase 0: Setup
3. Primera weekly check-in el próximo Viernes

**¿Listo para empezar?** 🚀
