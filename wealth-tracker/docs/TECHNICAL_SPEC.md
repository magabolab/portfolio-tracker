# 🔧 TECHNICAL SPECIFICATION - WEALTH TRACKER

> **Principio guía**: Simplicidad técnica que permite enfoque en features  
> **Stack**: Moderno pero probado, mínima complejidad innecesaria  
> **Deployment**: Vercel (zero-config cuando sea posible)  

---

## 🏗️ STACK TECNOLÓGICO FINAL

### Frontend

```
Next.js 16.x (App Router)
├─ React 19.x
├─ TypeScript (gradual adoption)
├─ Tailwind CSS 4.x
└─ shadcn/ui components
```

**Justificación**:
- ✅ Next.js: SSR + API routes en uno, ideal para este proyecto
- ✅ TypeScript: Empezar JavaScript, migrar gradual a TS
- ✅ Tailwind: Desarrollo rápido, consistencia automática
- ✅ shadcn/ui: Componentes pre-hechos de calidad

### Backend / Database

```
Next.js API Routes
├─ MongoDB Atlas (free tier)
├─ Mongoose ORM
└─ NextAuth.js (autenticación)
```

**Justificación**:
- ✅ API Routes: No necesitamos backend separado
- ✅ MongoDB: Flexible para iterar rápido, free tier generoso
- ✅ NextAuth: Estándar de facto para auth en Next.js

### Hosting & Deploy

```
Vercel
├─ GitHub integration (auto-deploy)
├─ Edge Functions
└─ Analytics integrado
```

**Justificación**:
- ✅ Vercel: Hecho para Next.js, cero configuración
- ✅ Auto-deploy: Push a main → deploy automático
- ✅ Free tier: Suficiente para uso personal

### Librerías Clave

| Categoría | Librería | Por Qué |
|-----------|----------|---------|
| **Charts** | Recharts | Ligera, React-native, suficiente para MVP |
| **Forms** | React Hook Form | Performance + DX excelente |
| **Validación** | Zod | Type-safe, integra con RHF |
| **Fechas** | date-fns | Más ligera que moment.js |
| **State** | Zustand (si necesario) | Simple, no añadir si no es necesario |

---

## 📁 ESTRUCTURA DE PROYECTO

```
wealth-tracker/
├─ app/                          # Next.js App Router
│   ├─ (auth)/                   # Grupo de rutas auth
│   │   ├─ login/
│   │   └─ register/
│   ├─ (dashboard)/              # Grupo de rutas protegidas
│   │   ├─ dashboard/
│   │   ├─ xtb/
│   │   ├─ trade-republic/
│   │   ├─ mintos/
│   │   └─ real-estate/
│   ├─ public/                   # Perfil público
│   │   └─ [username]/
│   ├─ api/                      # API Routes
│   │   ├─ auth/
│   │   ├─ xtb/
│   │   ├─ portfolio/
│   │   └─ analytics/
│   └─ layout.tsx
│
├─ components/                   # Componentes React
│   ├─ ui/                       # shadcn components
│   ├─ dashboard/
│   ├─ xtb/
│   └─ shared/
│
├─ lib/                          # Utilidades
│   ├─ db/
│   │   ├─ mongodb.ts
│   │   └─ models/
│   ├─ auth.ts
│   ├─ utils.ts
│   └─ validations/
│
├─ docs/                         # 📚 Documentación (NUEVO)
│   ├─ PROJECT_OVERVIEW.md
│   ├─ PRODUCT_VISION.md
│   ├─ TECHNICAL_SPEC.md
│   ├─ DEVELOPMENT_PLAN.md
│   ├─ WORKING_AGREEMENT.md
│   ├─ DECISIONS.md              # Log de decisiones técnicas
│   └─ CHANGELOG.md
│
├─ public/                       # Assets estáticos
├─ .env.local                    # Variables de entorno
├─ package.json
├─ tsconfig.json
└─ README.md
```

---

## 🗄️ ARQUITECTURA DE DATOS

### Principios de Diseño de DB

1. **Inmutabilidad**: Operations nunca se editan, solo se cierran
2. **Timestamps**: Todas las entidades tienen createdAt/updatedAt
3. **Soft Deletes**: Nunca borrar data real, marcar como deleted
4. **Auditoría**: Log de acciones importantes

### Schemas Core (MongoDB)

#### **User**

```typescript
{
  _id: ObjectId,
  email: string (unique, lowercase),
  password: string (bcrypt hashed),
  name: string,
  username: string (unique, para URL pública),
  
  settings: {
    publicProfile: boolean,  // Si el perfil es público
    showAmounts: boolean,    // Mostrar montos o solo %
    showOperations: boolean, // Mostrar ops individuales
  },
  
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
}
```

**Índices**:
```javascript
{ email: 1 } unique
{ username: 1 } unique
```

---

#### **XTBOperation**

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  
  // Básicos
  ticker: string,
  companyName: string,
  sector: string,
  
  // Entrada
  entryDate: Date,
  entryPrice: number,
  shares: number,
  capitalInvested: number,
  
  // Risk Management
  stopLoss: number,
  takeProfit1: number,
  takeProfit2: number,
  takeProfit3: number,
  
  // Estado
  status: 'open' | 'closed',
  
  // Salida (si cerrada)
  exitDate?: Date,
  exitPrice?: number,
  plEuros?: number,
  plPercentage?: number,
  closeReason?: 'stop_loss' | 'take_profit' | 'manual',
  
  // Notas
  entryNotes: string,
  exitNotes?: string,
  
  // Meta
  createdAt: Date,
  updatedAt: Date,
  
  // Auditoría
  immutable: boolean (true después de cierre),
}
```

**Índices**:
```javascript
{ userId: 1, status: 1, entryDate: -1 }
{ userId: 1, ticker: 1, entryDate: -1 }
```

**Regla de Inmutabilidad**:
```javascript
// En Mongoose
XTBOperationSchema.pre('save', function(next) {
  if (this.immutable && this.isModified()) {
    throw new Error('Cannot modify immutable operation');
  }
  next();
});
```

---

#### **TradeRepublicPosition**

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  
  ticker: string,
  type: 'etf' | 'crypto' | 'commodity',
  
  // Acumulación DCA
  purchases: [
    {
      date: Date,
      price: number,
      units: number,
      amountEur: number,
    }
  ],
  
  // Calculados
  totalUnits: number,
  averageCost: number,
  totalInvested: number,
  
  // Estado
  status: 'active' | 'sold',
  
  createdAt: Date,
  updatedAt: Date,
}
```

---

#### **PortfolioSnapshot**

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  
  date: Date (siempre fin de mes),
  
  breakdown: {
    xtb: number,
    tradeRepublic: number,
    mintos: number,
    realEstate: number,
    total: number,
  },
  
  // Para gráfico histórico
  createdAt: Date,
}
```

**Cron Job**: Cada fin de mes, crear snapshot automático

---

#### **AuditLog** (Opcional para MVP)

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  action: string,
  
  metadata: {
    operationId?: ObjectId,
    changes?: object,
  },
  
  ipAddress: string,
  userAgent: string,
  timestamp: Date,
}
```

---

## 🔐 SEGURIDAD

### Autenticación

**NextAuth.js Configuration**:

```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Verificar email + password
        // Devolver user object
      }
    })
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 días
  },
  
  pages: {
    signIn: '/login',
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
};
```

### Protección de Rutas

```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/xtb/:path*',
    '/trade-republic/:path*',
    '/mintos/:path*',
    '/real-estate/:path*',
  ],
};
```

### Variables de Entorno

```bash
# .env.local
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Production
MONGODB_URI=mongodb+srv://production...
NEXTAUTH_URL=https://wealthtracker.com
```

**Nunca commitear**: `.env.local` en `.gitignore`

---

## 🚀 DEPLOYMENT

### Vercel Setup

**1. Conectar GitHub**:
- Importar repo desde Vercel dashboard
- Auto-detecta Next.js

**2. Variables de Entorno**:
```
MONGODB_URI → [producción]
NEXTAUTH_SECRET → [generar nuevo]
NEXTAUTH_URL → https://tu-dominio.vercel.app
```

**3. Auto-Deploy**:
```
main branch → Producción automática
develop branch → Preview deployment
```

### MongoDB Atlas Setup

**1. Crear Cluster**:
- Free tier M0 (512MB)
- Región más cercana (EU West)

**2. Configurar IP Whitelist**:
- Permitir conexiones desde Vercel: `0.0.0.0/0` (cualquier IP)

**3. Connection String**:
```
mongodb+srv://username:password@cluster.mongodb.net/wealth-tracker?retryWrites=true&w=majority
```

---

## 📊 ANALYTICS Y MONITORIZACIÓN

### Básicos (Incluido en Vercel)

- **Vercel Analytics**: Visitas, performance
- **Logs**: Errors en consola Vercel
- **Performance**: Core Web Vitals

### Avanzado (Opcional, Futuro)

```typescript
// Sentry para error tracking
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## 🧪 TESTING (Estrategia)

### Fase MVP: Minimal Testing

**Prioridad**: Shipping features > Test coverage

**Mínimo aceptable**:
```typescript
// Solo tests para lógica crítica
// tests/calculations.test.ts

import { calculatePL } from '@/lib/calculations';

test('calcula P/L correctamente', () => {
  const result = calculatePL(100, 110, 10);
  expect(result).toEqual({
    plEuros: 100,
    plPercentage: 10
  });
});
```

### Fase 1.0: Testing Completo

- Unit tests: Funciones de cálculo, validaciones
- Integration tests: API endpoints
- E2E tests: Flujos críticos (login, añadir operación)

**Framework**: Jest + React Testing Library + Playwright

---

## 🔄 GIT WORKFLOW

### Branches

```
main → Producción (siempre deployable)
develop → Desarrollo activo (integración)
feature/xyz → Features nuevas
fix/xyz → Bugfixes
```

### Commit Convention

```bash
# Formato
type(scope): mensaje

# Types
feat     → Nueva feature
fix      → Bugfix
docs     → Documentación
refactor → Refactoring
style    → Formatting
test     → Tests

# Ejemplos
feat(xtb): añadir formulario cerrar operación
fix(dashboard): corregir cálculo patrimonio total
docs(readme): actualizar instrucciones setup
refactor(auth): simplificar lógica session
```

### Pull Request Flow

```
1. Crear feature branch desde develop
2. Desarrollar feature
3. Commit con mensajes descriptivos
4. Push a GitHub
5. Crear PR → develop
6. Review (self-review para MVP)
7. Merge a develop
8. Cuando develop esté estable → PR a main
9. Main → Auto-deploy a Vercel
```

---

## 🎨 COMPONENTES UI (shadcn/ui)

### Instalados

```
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form
npx shadcn@latest add select
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add alert
```

### Customización Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Tema oscuro personalizado
        background: '#0f172a',
        foreground: '#e2e8f0',
        primary: '#3b82f6',
        success: '#10b981',
        danger: '#ef4444',
      }
    }
  }
}
```

---

## 📝 LOGGING STRATEGY

### Development

```typescript
console.log('Simple logs OK en desarrollo');
```

### Production

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: object) => {
    if (process.env.NODE_ENV === 'production') {
      // Enviar a servicio externo (futuro)
    }
    console.log(message, meta);
  },
  
  error: (message: string, error: Error) => {
    console.error(message, error);
    // Sentry.captureException(error); (futuro)
  }
};
```

---

## 🔮 TECH DEBT ACEPTABLE (Para MVP)

### Sí Está OK:

✅ TypeScript parcial (empezar con .js)  
✅ Cero tests en features no-críticas  
✅ Hard-coded configs simples  
✅ Logs básicos con console.log  
✅ Sin optimizaciones de performance  
✅ UI no perfecta en todos los breakpoints  

### NO Aceptable:

❌ Passwords en plain text  
❌ SQL injection / NoSQL injection vulnerabilities  
❌ Datos sensibles en client-side  
❌ Sin validación de inputs  
❌ Deploy roto (main debe ser deployable siempre)  

---

## 🎯 PERFORMANCE TARGETS (Lazy)

**Objetivo**: "Suficientemente rápido"

- Dashboard load: <2 segundos
- API response: <500ms
- Chart rendering: <1 segundo

**Optimizaciones**:
- Solo cuando sean necesarias
- Medir primero, optimizar después

---

## 📚 RECURSOS TÉCNICOS

### Documentación Oficial

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [MongoDB + Mongoose](https://mongoosejs.com/docs/guide.html)
- [NextAuth.js](https://next-auth.js.org)

### Nuestras Referencias

- `PROJECT_OVERVIEW.md` → Visión general
- `PRODUCT_VISION.md` → Features y UX
- `DEVELOPMENT_PLAN.md` → Qué construir y cuándo
- `WORKING_AGREEMENT.md` → Cómo trabajamos

---

**Mantenido por**: Gabriel + Claude  
**Actualización**: Cuando tomemos decisiones técnicas importantes  
**Formato**: Markdown simple, fácil de leer y editar
