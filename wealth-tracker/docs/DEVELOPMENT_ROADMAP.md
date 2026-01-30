# 🗺️ ROADMAP ESTRATÉGICO DE DESARROLLO

> **Objetivo**: Guía clara y realista para construir Wealth Tracker de forma sostenible  
> **Metodología**: Sprints de 1-2 semanas, entregas incrementales, validación continua  
> **Horizonte**: 12-14 semanas hasta MVP completo (Fase 1)

---

## 📊 VISTA GENERAL (4 SEMANAS)

```
SEMANA 1-2: FUNDAMENTOS (Fase 0 - Completar)
├─ Validar estado actual
├─ Completar setup MongoDB/Auth
├─ Preparar arquitectura de datos
└─ Documentar patrones de desarrollo

SEMANA 3-6: MVP XTB CORE (Fase 1.1-1.3)
├─ Dashboard principal (layout + componentes)
├─ CRUD operaciones XTB (crear, listar, cerrar)
├─ Analytics básicos (stats, gráficos)
└─ Preparar para multi-plataforma

SEMANA 7-10: EXTENSIÓN (Fase 1.4 + inicio Fase 2)
├─ Perfil público v1
├─ Integración Trade Republic
├─ Dashboard unificado
└─ Pulir UX/UI

SEMANA 11-14: PROFESIONALIZACIÓN (Fase 2.1-3.1)
├─ Analytics avanzados
├─ Import/Export
├─ Optimizaciones y fixes
└─ Ready for beta
```

---

## 🎯 FASE 0: FUNDAMENTOS (SEMANAS 1-2)

**Estado Actual**: ~80% completo  
**Objetivo**: 100% listo para Fase 1

### Sprint 0.1: Validación & Completación (3-4 días)

#### Tareas Críticas

1. **Auditar estado actual**
   - ✅ Build test: `npm run build`
   - ✅ TypeScript errors: 0
   - ✅ MongoDB connection working
   - ✅ NextAuth configured
   - ✅ Vercel deployment status

2. **Completar setup MongoDB**
   - Crear/validar connection en `.env.local`
   - Verificar User model en MongoDB
   - Crear índices necesarios

3. **Completar auth flow**
   - Register funcional (crear 1 user test)
   - Login funcional
   - Session persistence
   - Protected routes funcionando

#### Criterios de Éxito
- [ ] Build compila sin errores
- [ ] Puedo registrar usuario
- [ ] Puedo hacer login
- [ ] Session persiste tras refresh
- [ ] `/dashboard` protegida

**Timeline**: 3-4 días  
**Responsable**: Solo (Gabriel)  
**Blocker conocido**: None

---

### Sprint 0.2: Arquitectura de Datos (2-3 días)

#### Tareas

1. **Diseñar schema XTBOperation**
   ```typescript
   // Campos necesarios:
   - id: ObjectId
   - userId: string (relación User)
   - ticker: string
   - companyName: string
   - entryPrice: number
   - quantity: number
   - entryDate: Date
   - setup: string (breakout, reversal, etc)
   - sector: string
   - thesis: string (texto)
   - stopLoss?: number
   - targetPrices?: number[]
   - status: 'open' | 'closed'
   - exitPrice?: number
   - exitDate?: Date
   - exitReason?: string
   - notes?: string
   - createdAt: Date
   - updatedAt: Date
   ```

2. **Crear modelo Mongoose**
   - Validaciones
   - Índices (userId, status, createdAt)
   - Métodos helpers (calcularPL, etc)

3. **Crear datos mock**
   - 5-10 operaciones XTB ficticias
   - Mezcla de open/closed
   - Datos realistas para testing

#### Entregables
- [ ] `lib/db/models/XTBOperation.ts` finalizado
- [ ] Script seed con datos mock
- [ ] Documentación del schema
- [ ] Test conexión + CRUD básico

**Timeline**: 2-3 días  
**Blocker**: Schema debe estar 100% definido antes de Sprint 1.1

---

### Sprint 0.3: Base de Código (2 días)

#### Tareas

1. **Estructura de carpetas**
   ```
   components/
   ├─ dashboard/      # NEW
   │  ├─ DashboardLayout.tsx
   │  ├─ Sidebar.tsx
   │  ├─ Header.tsx
   │  └─ [otros...]
   ├─ xtb/            # NEW para componentes XTB
   ├─ ui/             # ya existe
   └─ [otros...]
   
   app/
   ├─ api/xtb/        # rutas API
   └─ [otros...]
   ```

2. **Crear constantes y utils**
   - `lib/constants.ts` (sectores, setups, etc)
   - `lib/calculations.ts` (P/L, win rate, etc)
   - `lib/formatting.ts` (fechas, moneda, etc)

3. **Documentar patrones**
   - Cómo estructurar componentes
   - Cómo hacer llamadas API
   - Naming conventions
   - Git workflow para features

#### Entregables
- [ ] Carpetas creadas
- [ ] Archivos utils con funciones base
- [ ] README en `components/` con guías

**Timeline**: 2 días

---

## ⚡ FASE 1: MVP CORE (SEMANAS 3-6)

**Objetivo**: Sistema XTB completo y usable

### Sprint 1.1: Dashboard Layout (SEMANA 3)

**Duración**: 5 días  
**Objetivo**: Estructura visual lista para agregar contenido

#### Componentes a Crear

1. **Sidebar** (`components/dashboard/Sidebar.tsx`)
   - Links a: Dashboard, XTB, Perfil
   - Estados: Desktop/Mobile
   - Responsive: Hamburger en mobile
   - Highlight active route

2. **Header** (`components/dashboard/Header.tsx`)
   - Logo/Nombre app
   - Nombre usuario actual
   - Logout button
   - Avatar (opcional)

3. **DashboardLayout** (wrapper principal)
   - Grid: Sidebar + Main
   - Responsive
   - Dark theme

4. **Páginas base**
   - `app/(dashboard)/layout.tsx` (usa DashboardLayout)
   - `app/(dashboard)/dashboard/page.tsx` (home)
   - `app/(dashboard)/xtb/page.tsx` (contenedor XTB)

#### Testing
- [ ] Desktop view: Sidebar a la izq, main a la dcha
- [ ] Mobile view: Hamburger menu funcional
- [ ] Dark theme aplicado
- [ ] Navegación entre rutas funciona
- [ ] Build sin errores

**Timeline**: 5 días  
**Blocker**: None (parallelizable con 0.2)

---

### Sprint 1.2: CRUD XTB (SEMANA 4-5)

**Duración**: 10 días  
**Objetivo**: Sistema completo crear/leer/cerrar operaciones

#### Task 1.2.1: API Endpoints (2 días)

Crear rutas en `app/api/xtb/operations/`:

```typescript
// GET /api/xtb/operations?status=open|closed
// - Fetch operaciones del usuario logueado
// - Filtrar por status

// POST /api/xtb/operations
// - Crear nueva operación
// - Validar campos
// - Calcular derivados

// PATCH /api/xtb/operations/:id
// - Actualizar operación (cerrar)
// - Validar status = closed
```

Criterios:
- [ ] Endpoints devuelven JSON correcto
- [ ] Validación de auth (solo usuario logueado)
- [ ] Error handling apropiado

---

#### Task 1.2.2: Vista Posiciones Abiertas (2 días)

`app/(dashboard)/xtb/positions/page.tsx`

Componentes:
- `PositionCard.tsx`: Muestra ticker, P/L, botón cerrar
- Grid responsivo de cards
- Empty state
- Loading state

Funcionalidad:
- [ ] Fetch `/api/xtb/operations?status=open`
- [ ] Render PositionCard por cada una
- [ ] Click "Cerrar" → Modal

---

#### Task 1.2.3: Modal Cerrar Posición (1.5 días)

`components/xtb/ClosePositionModal.tsx`

Formulario:
- Exit price (required)
- Exit date (default hoy)
- Exit reason (dropdown)
- Notes (textarea)

Funcionalidad:
- [ ] Cálculo automático P/L
- [ ] Submit a PATCH `/api/xtb/operations/:id`
- [ ] Redirección a historial tras éxito
- [ ] Error handling

---

#### Task 1.2.4: Formulario Nueva Operación (3 días)

`components/xtb/OperationForm.tsx` (Multi-step)

Paso 1: Básicos
- Ticker, CompanyName
- Entry price, Entry date
- Stock quantity

Paso 2: Risk
- Stop loss
- (Auto-calcula: Capital, Risk %)
- Validación: ⚠️ si risk > 3%

Paso 3: Tesis
- Sector (dropdown)
- Setup (dropdown: breakout, reversal, etc)
- Thesis (textarea)

Paso 4: Review
- Resumen de datos
- Botón Confirmar

Funcionalidad:
- [ ] Validación en tiempo real
- [ ] POST a `/api/xtb/operations`
- [ ] Redirección a posiciones tras éxito
- [ ] Cálculos automáticos

---

#### Task 1.2.5: Vista Historial (2 días)

`app/(dashboard)/xtb/history/page.tsx`

`components/xtb/HistoryTable.tsx`:
- Tabla con operaciones cerradas
- Columnas: Ticker, EntryDate, ExitDate, P/L (€ y %), Motivo
- Ordenado: Más reciente primero
- Paginación: 20 items por página

Funcionalidad:
- [ ] Fetch `/api/xtb/operations?status=closed`
- [ ] Render con formato dinámico
- [ ] Colores: Verde (+), Rojo (-)

---

### Sprint 1.3: Analytics XTB (SEMANA 5-6)

**Duración**: 8 días  
**Objetivo**: Métricas visuales del trading

#### Task 1.3.1: Stats Cards (2 días)

`app/(dashboard)/xtb/page.tsx` (nueva versión con stats)

Componentes `QuickStatsCard.tsx`:
1. P/L Total: Suma de P/L cerrados
2. Win Rate: (Wins / Total) * 100
3. Avg Win / Avg Loss
4. Avg Duration: Días promedio

Funcionalidad:
- [ ] Cálculos en backend (nuevo endpoint GET `/api/xtb/stats`)
- [ ] Cards render con números grandes
- [ ] Formato: Moneda, porcentajes, días

---

#### Task 1.3.2: Gráfico P/L Mensual (2.5 días)

`components/xtb/MonthlyPLChart.tsx`

BarChart (Recharts):
- Eje X: Meses (últimos 6 meses)
- Eje Y: P/L acumulado
- Colores: Verde (+), Rojo (-)

Funcionalidad:
- [ ] Agregación mensual en backend
- [ ] Tooltip con detalles
- [ ] Responsive

---

#### Task 1.3.3: Equity Curve (1.5 días)

`components/xtb/EquityCurveChart.tsx`

LineChart mostrando evolución del patrimonio XTB:
- Eje X: Fechas (histórico)
- Eje Y: Balance acumulado
- Línea suave

Funcionalidad:
- [ ] Cálculo: Sum(P/L) por fecha
- [ ] LineChart
- [ ] Responsive

---

#### Task 1.3.4: Win Rate Histórico (1.5 días)

`components/xtb/WinRateChart.tsx`

LineChart:
- Eje X: Meses
- Eje Y: Win rate %
- Línea de referencia a 60%

Funcionalidad:
- [ ] Cálculo win rate acumulado por mes
- [ ] Línea de referencia
- [ ] Responsive

---

## 🌐 FASE 1.4: PERFIL PÚBLICO (SEMANA 7-8)

**Duración**: 8 días  
**Objetivo**: Link público compartible con stats

### Sprint 2.1: Página Pública (6 días)

`app/public/@[username]/page.tsx`

Contenido:
- Nombre usuario
- Avatar
- P/L Total
- Win Rate
- Número de operaciones
- Equity curve (gráfico)

Privacy controls:
- Toggle: Mostrar montos exactos (sí/no)
- Default: Mostrar, pero permitir ofuscar

Funcionalidad:
- [ ] Ruta dinámica funciona
- [ ] Fetch datos usuario público
- [ ] Cálculos correctos
- [ ] Responsive design

---

## 📈 FASE 2: MULTI-PLATAFORMA (SEMANA 9-12)

**Objetivo**: Sistema para Trade Republic, Mintos, Real Estate

### Sprint 2.2: Trade Republic (4 días)

Análogo a XTB pero:
- Operaciones de acciones/ETFs (menos frequent)
- Mismo schema (reutilizable)
- API endpoint: `/api/tr/operations`

---

### Sprint 2.3: Mintos (3 días)

Sistema más simple:
- Monto invertido
- Tasa rendimiento
- Ganancias acumuladas
- No es operación-based, es inversión

---

### Sprint 2.4: Dashboard Unificado (3 días)

`app/(dashboard)/dashboard/page.tsx` mejorado:

Widgets:
- Total patrimonio (suma todas plataformas)
- Pie chart distribución
- Tablas de las 3 plataformas
- Rendimiento total

---

## 🔧 FASE 3: PROFESIONALIZACIÓN (SEMANA 13-14)

**Objetivo**: Polish, optimizaciones, features premium

### Mejoras Críticas

1. **Import/Export**
   - CSV upload XTB
   - Export historial
   - Backup datos

2. **Analytics Avanzados**
   - Filtros por periodo
   - Comparativas mes/año
   - Setup performance
   - Sector analysis

3. **Optimizaciones**
   - Caching DB
   - Infinite scroll en tablas
   - Búsqueda/filtros avanzados

4. **Fixes y Polish**
   - UX refinements
   - Mobile optimizations
   - Performance audit
   - Crash fixes

---

## 📋 CHECKLIST DE DEPENDENCIAS

```
Fase 0 (Sem 1-2)
├─ Schema finalizado ✓
├─ Auth funcionando ✓
├─ MongoDB conectado ✓
└─ Estructura base ✓

Fase 1.1 (Sem 3) [Depende: Fase 0]
├─ Layout dashboard
└─ → Prerequisito para 1.2

Fase 1.2 (Sem 4-5) [Depende: 1.1]
├─ API endpoints
├─ CRUD componentes
└─ → Prerequisito para 1.3

Fase 1.3 (Sem 5-6) [Depende: 1.2]
├─ Stats calculados
├─ Gráficos
└─ → Prerequisito para 1.4

Fase 1.4 (Sem 7-8) [Depende: 1.3]
├─ Página pública
└─ → Opcional para 2.x

Fase 2 (Sem 9-12) [Depende: 1.4]
├─ Multi-plataforma
└─ → Puedo hacerlo paralelo con 1.3

Fase 3 (Sem 13-14) [Depende: 2.x]
├─ Polish
└─ → Final touches
```

---

## ⚠️ RIESGOS IDENTIFICADOS

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------|-----------|
| Schema cambios en medio | Media | Alto | Finalizar schema en Sem 1 |
| Recharts learning curve | Baja | Medio | Usar ejemplos, documentar |
| Vercel deploy issues | Baja | Bajo | Test local primero |
| MongoDB queries lentas | Baja | Medio | Índices desde el inicio |
| Scope creep | Alta | Alto | Mantener enfoque MVP |
| Motivation drop | Media | Medio | Entregas incrementales |

---

## 🎯 CRITERIOS DE ÉXITO POR FASE

### Fase 0: 100% Setup
- [ ] Build sin errores
- [ ] Auth completo
- [ ] MongoDB funcionando
- [ ] Deploy actualizado

### Fase 1.1: Layout Ready
- [ ] Dashboard responsive
- [ ] Sidebar + Header funcionales
- [ ] Navegación entre rutas

### Fase 1.2: CRUD Completo
- [ ] Crear operación ✓
- [ ] Listar (open/closed) ✓
- [ ] Cerrar operación ✓
- [ ] Datos persisten en DB

### Fase 1.3: Analytics Visible
- [ ] Stats cards
- [ ] Gráficos renderizados
- [ ] Cálculos correctos

### Fase 1.4: Público Funcional
- [ ] URL pública accesible
- [ ] Stats correctas
- [ ] Shareable

### Fase 2: Multi-Plataforma
- [ ] TR + Mintos + Real Estate integrados
- [ ] Dashboard unificado
- [ ] Todos los datos en un lugar

### Fase 3: MVP Final
- [ ] Import/Export funcionando
- [ ] Analytics avanzados
- [ ] Performance optimizado
- [ ] Ready para beta

---

## 📅 TIMELINE REALISTA

```
Hoy (Día 0)        → Fase 0 completar
Semana 1           → Sprint 0.1, 0.2
Semana 2           → Sprint 0.3 finish
Semana 3-6         → Sprint 1.1-1.3 (4 semanas)
Semana 7-8         → Sprint 1.4 (2 semanas)
Semana 9-12        → Fase 2 (4 semanas)
Semana 13-14       → Fase 3 (2 semanas)

Total: 14 semanas = ~3.5 meses desde hoy
```

---

## 🚀 CÓMO USAR ESTE ROADMAP

1. **Cada lunes**: Revisar tareas de la semana
2. **Daily**: 1-2h coding, documentar progreso
3. **Cada viernes**: Review, actualizar checklist, plan siguiente semana
4. **Si hay cambios**: Comunicar en esta sección

---

## 📝 NOTAS

- **Tiempo estimado** es conservador (asume 1-2h/día)
- **Parallelizable**: Pueden hacerse sprints en paralelo (ej: 0.2 + 1.1)
- **MVP vs Final**: MVP es Fase 1, Fase 2-3 es extensión
- **Flexibilidad**: Si algo toma más tiempo, mover siguiente semana
- **Priority**: CRUD > Analytics > Public > Multi-plataforma

---

**Última actualización**: 30 Enero 2026  
**Estado**: 🚀 Listo para comenzar Fase 0
