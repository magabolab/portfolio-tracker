# 🎯 SPRINT BOARD - TAREAS INMEDIATAS

**Semana**: 30 Enero - 5 Febrero 2026  
**Objetivo**: Completar Fase 0 y preparar base para Sprint 1.1  
**Tiempo estimado**: 5 días (20-25 horas totales)

---

## 📍 ESTA SEMANA: Fase 0 Completación

```
LUNES 30 Ene     → Revisar documentos (hoy)
MARTES 31 Ene    → MongoDB + Vercel setup
MIÉRCOLES 1 Feb  → Auth testing + API validation
JUEVES 2 Feb     → Deploy + documentar
VIERNES 3 Feb    → Final validation + plan Sprint 1.1
```

---

## 🚀 HOY: Alineamiento Estratégico (COMPLETADO)

✅ DEVELOPMENT_ROADMAP.md creado (visión 14 semanas)  
✅ PHASE_0_VALIDATION.md creado (plan ejecución)  
✅ Build verificado (compila sin errores)  
✅ Modelos validados (User + XTBOperation listos)

**Próximo**: MARTES comenzar MongoDB setup

---

## 📋 PENDIENTES POR PRIORIDAD

### 🔴 CRÍTICOS (Bloquean todo)

#### T1: MongoDB Atlas Setup (MARTES)
**Tiempo**: 30-45 min  
**Blocker**: SÍ - sin MongoDB nada funciona

**Steps**:
1. [ ] Ir a https://www.mongodb.com/cloud/atlas
2. [ ] Login o crear cuenta
3. [ ] Crear cluster free tier ("wealth-tracker")
4. [ ] Crear usuario DB:
   - Username: `wtuser`
   - Password: [generar fuerte, copiar a .env]
5. [ ] Network Access: Whitelist 0.0.0.0/0 (Vercel)
6. [ ] Connection String → `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://wtuser:PASSWORD@cluster.mongodb.net/wealth_tracker?retryWrites=true&w=majority
   ```
7. [ ] Test local: `npm run dev` → ver logs "MongoDB conectado"

---

#### T2: Vercel Environment Setup (MARTES)
**Tiempo**: 10-15 min  
**Blocker**: SÍ - sin vars Vercel no autentica

**Steps**:
1. [ ] Ir a https://vercel.com/dashboard
2. [ ] Proyecto "wealth-tracker" → Settings
3. [ ] Environment Variables, añadir:
   ```
   MONGODB_URI=mongodb+srv://wtuser:PASSWORD@cluster...
   NEXTAUTH_SECRET=[generar: `openssl rand -base64 32`]
   NEXTAUTH_URL=https://wealth-tracker.vercel.app
   ```
4. [ ] Redeploy: Click "Redeploy" en Deployments

---

### 🟠 ALTOS (Necesarios para Fase 1)

#### T3: Auth Flow Complete Testing (MIÉRCOLES)
**Tiempo**: 1-2 horas  
**Blocker**: NO (pero necesario antes Sprint 1)

**Checklist**:
- [ ] `npm run dev` localmente
- [ ] `/register` → crear user: `test@wealth.com / Test123!`
- [ ] Verificar en MongoDB Atlas que usuario existe
- [ ] `/login` → login con mismo user
- [ ] `/dashboard` → carga sin error
- [ ] Refresh página → session persiste
- [ ] Logout → redirige a `/login`
- [ ] `/dashboard` sin login → redirige a `/login`

**Documentar**:
- Screenshots de cada paso (opcional pero útil)
- Copiar error messages si hay

---

#### T4: XTB API Endpoints Testing (MIÉRCOLES)
**Tiempo**: 1-2 horas  
**Blocker**: NO (pero necesario antes Sprint 1.2)

**Checks**:
```bash
# Terminal 1: npm run dev

# Terminal 2: Hacer requests
# GET operaciones (debería devolver [])
curl -X GET http://localhost:3000/api/xtb/operations \
  -H "Authorization: Bearer [tu-session-token]"

# POST nueva operación
curl -X POST http://localhost:3000/api/xtb/operations \
  -H "Content-Type: application/json" \
  -d '{
    "ticker": "NVDA",
    "companyName": "NVIDIA",
    "entryPrice": 120.50,
    "shares": 10,
    "stopLoss": 110,
    "technicalSetup": "breakout",
    "sector": "Technology"
  }'
```

**Resultado esperado**: 
- GET devuelve array (vacío al inicio)
- POST devuelve objeto creado con `_id`

---

### 🟡 MEDIOS (Antes de Sprint 1.1)

#### T5: Seed Datos Mock (JUEVES)
**Tiempo**: 1 hora  
**Blocker**: NO (pero muy útil para visualización)

**Qué hacer**:
1. [ ] Crear script `scripts/seed.ts`:
   ```typescript
   // Crear 5-10 operaciones XTB ficticias
   // Mix de open (50%) y closed (50%)
   // Datos realistas:
   // - Tickers: NVDA, AAPL, TSLA, META, MSFT
   // - Setups: breakout, pullback, reversal
   // - P/Ls variados: algunos +, algunos -
   ```
2. [ ] Ejecutar: `npx ts-node scripts/seed.ts`
3. [ ] Verificar en MongoDB: colección tendrá datos

**Beneficio**: Podremos ver gráficos y listas con datos reales en Sprint 1

---

#### T6: Deploy & Verify Producción (JUEVES)
**Tiempo**: 30 min  
**Blocker**: NO (pero necesario antes dejar en producción)

**Steps**:
```bash
git add docs/DEVELOPMENT_ROADMAP.md docs/PHASE_0_VALIDATION.md
git commit -m "docs: add strategic development roadmap and phase 0 validation plan"
git push origin main
```

**En Vercel**:
- [ ] Esperar deploy automático
- [ ] Test en https://wealth-tracker.vercel.app
- [ ] Register nuevo user
- [ ] Login funciona
- [ ] `/dashboard` accesible (aunque vacío)

---

### 🟢 BAJOS (Nice to have, Sprint 1+)

- Documentación adicional
- Optimizaciones build
- Tests unitarios (no MVPs)

---

## 🎯 META DE LA SEMANA

**Lunes-Martes**: Fase 0 setup (MongoDB + Vercel)  
**Miércoles**: Auth + API testing  
**Jueves**: Seed data + Deploy  
**Viernes**: Validación final + Plan Sprint 1.1

**Resultado esperado**: 
✅ Fase 0 = 100% completo  
✅ Ready para comenzar Sprint 1.1 el próximo lunes  
✅ Base sólida para las 4 semanas siguientes

---

## 📚 REFERENCIAS RÁPIDAS

- Roadmap general: [DEVELOPMENT_ROADMAP.md](docs/DEVELOPMENT_ROADMAP.md)
- Fase 0 detalles: [PHASE_0_VALIDATION.md](docs/PHASE_0_VALIDATION.md)
- Desarrollo plan original: [DEVELOPMENT_PLAN.md](docs/DEVELOPMENT_PLAN.md)
- Producto vision: [PRODUCT_VISION.md](docs/PRODUCT_VISION.md)
- Workflow/commits: [WORKFLOW.md](docs/WORKFLOW.md)

---

## 💬 NOTAS

- Si MongoDB tiene problemas: revisar connection string
- Si Vercel no redeploya: click "Redeploy" manualmente
- Si auth no funciona: revisar `.env.local` tiene NEXTAUTH_SECRET
- Preguntas: revisar docs o hacer debug en dev mode

**Status**: 🚀 LISTO PARA COMENZAR

---

**Última actualización**: 30 Enero 2026  
**Próxima revisión**: Viernes 3 Febrero 2026
