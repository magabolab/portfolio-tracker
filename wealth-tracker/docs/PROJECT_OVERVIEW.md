# 🌟 WEALTH TRACKER - VISIÓN DEL PROYECTO

> **Última actualización**: 30 Enero 2026  
> **Versión**: 2.0 (Post-Pivot)  
> **Estado**: En desarrollo activo

---

## 🎯 MISIÓN

**Crear un portfolio tracker personal, público y auditable que demuestre mi track record como trader e inversor de forma transparente e inmutable.**

### El Problema que Resolvemos

**Para**: Gabriel Beneite (y cualquiera que quiera transparencia en sus inversiones)

**Que necesita**: 
- Ver todas sus inversiones en un solo lugar
- Demostrar su track record de forma verificable
- Compartir sus resultados públicamente (sin restricciones)
- Tener un registro histórico inmutable de cada operación

**El producto es**: 
Un dashboard personal de inversiones con tracking completo y capacidad de compartir públicamente

**Que permite**:
- Unificar exposición de múltiples plataformas (XTB, Trade Republic, Mintos, Real Estate)
- Registro automático de P/L y métricas
- Timeline auditable (cada operación con timestamp, nunca modificable)
- Perfil público mostrando track record real

**A diferencia de**:
- Excel/Google Sheets → No inmutable, no compartible profesionalmente
- Portfolio trackers comerciales → No personalizables, no auditables, cerrados
- Apps de brókers → Información fragmentada, no unificada

**Nuestra ventaja**:
- Open source y autohosteado → Control total
- Diseñado para transparencia → Share by default
- Inmutable por diseño → Confianza verificable
- Sin restricciones → Libertad total para operar como quieras

---

## 🚫 QUÉ NO ES ESTE PROYECTO

Para mantener el foco, dejamos claro qué **NO** vamos a hacer:

❌ **NO es una herramienta de gestión de clientes**  
→ Es mi portfolio personal (con opción de compartir)

❌ **NO impone restricciones en mi trading**  
→ No hay validaciones que bloqueen operaciones
→ Solo advertencias informativas (puedo ignorarlas)

❌ **NO ejecuta trades automáticamente**  
→ Es solo tracking, no bot de trading

❌ **NO almacena credenciales de brokers**  
→ Entrada manual o import CSV

❌ **NO es una red social de traders**  
→ Es un showcase personal, no comunidad

---

## 🎨 FILOSOFÍA DE DISEÑO

### 1. **Transparencia Radical**
- Cada operación visible con timestamps
- P/L real, sin manipulación
- Errores también visibles (aprender de ellos)

### 2. **Simplicidad > Complejidad**
- Si una feature no aporta al objetivo core → roadmap futuro
- UI limpia, información clara
- Menos clicks para acciones frecuentes

### 3. **Inmutabilidad**
- Las operaciones una vez creadas no se editan
- Solo se pueden cerrar
- Historial completo siempre visible

### 4. **Libertad de Operativa**
- No forzar "buenas prácticas"
- Advertir, no bloquear
- El usuario (yo) decide

---

## 👤 USUARIO PRINCIPAL

**Nombre**: Gabriel Beneite  
**Edad**: 24 años  
**Situación**: Trader independiente, desempleado actualmente  
**Experiencia**: Formado con José Luis Cava, David Galán, Roberto Chamorro, Mark Minervini  
**Capital**: ~3.5K€ líquido + 50K€ inmueble  
**Estilo**: Swing trading agresivo pero disciplinado  

### Jobs to be Done

**When** tengo varias plataformas de inversión  
**I want to** ver todo mi patrimonio en un dashboard unificado  
**So I can** tomar decisiones informadas rápidamente

**When** cierro una operación  
**I want to** registrarla inmediatamente con todos los detalles  
**So I can** hacer análisis posterior y demostrar mi track record

**When** alguien pregunta "¿cómo te va en trading?"  
**I want to** compartir un link a mi portfolio público  
**So I can** demostrar resultados reales, no palabrería

**When** reviso mi mes/año  
**I want to** ver métricas claras (P/L, win rate, mejor setup, etc.)  
**So I can** mejorar mi estrategia basándome en datos

---

## 🏗️ ARQUITECTURA CONCEPTUAL

### Módulos Core (MVP)

```
WEALTH TRACKER
│
├─ 🔐 AUTH
│   └─ Login/Registro simple (solo yo inicialmente)
│
├─ 📊 DASHBOARD
│   ├─ Patrimonio total
│   ├─ Distribución por activo
│   └─ Evolución temporal
│
├─ 💼 XTB (Trading Activo)
│   ├─ Posiciones abiertas
│   ├─ Historial operaciones
│   ├─ Analytics (P/L, win rate)
│   └─ Añadir/Cerrar operaciones
│
├─ 🏦 TRADE REPUBLIC (Pasivo)
│   ├─ Posiciones actuales
│   └─ Historial compras DCA
│
├─ 💰 MINTOS
│   └─ Balance actual
│
├─ 🏠 REAL ESTATE
│   └─ Valoración + Cashflow
│
└─ 🌐 PERFIL PÚBLICO
    ├─ Track record visible
    ├─ Gráficos principales
    └─ Timeline de operaciones (opcionalmente anónimo)
```

### Módulos Futuros (Roadmap)

```
FASE 2+
│
├─ 📈 ANALYTICS AVANZADO
│   ├─ Heatmaps rendimiento
│   ├─ Correlaciones entre assets
│   └─ Backtesting básico
│
├─ 📥 IMPORT/EXPORT
│   ├─ CSV desde brokers
│   ├─ Export datos (GDPR)
│   └─ Backups automáticos
│
├─ 🔔 ALERTAS
│   ├─ Email/Telegram notificaciones
│   └─ Webhooks para automatización
│
└─ 🤖 INTEGRACIONES
    ├─ APIs de precios real-time
    └─ Conectores con brokers
```

---

## 📐 PRINCIPIOS TÉCNICOS

### 1. **Inmutabilidad de Datos**

Operaciones nunca se modifican, solo se cierran:

```typescript
// ❌ MAL
operation.entryPrice = newPrice; // NUNCA editar histórico
operation.save();

// ✅ BIEN
// Si me equivoqué → Cerrar operación errónea + crear nueva correcta
await operation.close({ reason: 'data_error', notes: 'Precio mal ingresado' });
const correctOperation = await Operation.create({ ... });
```

### 2. **Timestamps en Todo**

Cada acción tiene timestamp inmutable:

```typescript
{
  createdAt: Date,      // Cuándo se creó
  updatedAt: Date,      // Última modificación (solo cerrar)
  closedAt?: Date,      // Cuándo se cerró (si aplica)
}
```

### 3. **Auditoría Completa**

Registro de quién hizo qué y cuándo:

```typescript
{
  action: 'position_created',
  userId: 'gabriel',
  timestamp: Date,
  ipAddress: '...',
  data: { ticker: 'NVDA', ... }
}
```

### 4. **Compartible por Defecto**

Diseñar pensando en que todo podría ser público:

- No almacenar datos ultra-sensibles innecesarios
- Permitir ofuscar montos (mostrar solo %)
- URL pública tipo: `wealthtracker.com/@gabriel`

---

## 🎯 MÉTRICAS DE ÉXITO

### Fase MVP (2 meses)

- [ ] Puedo registrar todas mis operaciones actuales
- [ ] Dashboard muestra patrimonio total correcto
- [ ] Historial de XTB completo visible
- [ ] Puedo compartir link público con track record

### Fase 1.0 (4-6 meses)

- [ ] Integración completa de todas las plataformas
- [ ] Analytics avanzados funcionando
- [ ] Import CSV desde brokers
- [ ] Perfil público con branding personal

### Largo Plazo (1+ año)

- [ ] Otras personas usan mi código (fork/adaptación)
- [ ] APIs públicas para integraciones
- [ ] Portfolio tracker de referencia en la comunidad

---

## 🔄 PROCESO DE DESARROLLO

### Metodología

**Iterativo y Ágil**:
- Ciclos de 1-2 semanas
- Features pequeñas, deployables
- Feedback continuo (yo mismo)

### Workflow

```
1. DEFINIR → Qué vamos a construir (en docs)
2. DISEÑAR → Cómo lo vamos a construir (wireframes si necesario)
3. DESARROLLAR → Código + Tests
4. DEPLOY → Vercel automático
5. PROBAR → Uso real con mis operaciones
6. ITERAR → Ajustes basados en feedback
```

### Reglas de Oro

1. **Documenta primero, codea después**
2. **Deploy temprano, deploy frecuente**
3. **Si no lo uso yo, no lo construimos**
4. **MVP > Perfección**

---

## 📝 CONVENCIONES DE CÓDIGO

(A definir colaborativamente durante desarrollo)

### Commits

```bash
# Formato
type(scope): mensaje breve

# Ejemplos
feat(xtb): añadir formulario nueva operación
fix(dashboard): corregir cálculo patrimonio total
docs(readme): actualizar instrucciones de deploy
```

### Branches

```
main → Producción (siempre deployable)
develop → Desarrollo activo
feature/nombre → Features nuevas
fix/nombre → Bugfixes
```

---

## 🗺️ ROADMAP DE ALTO NIVEL

### ✅ FASE 0: Setup (1 semana)
- [x] Repositorio GitHub
- [x] Deploy Vercel configurado
- [ ] Documentación base
- [ ] Estructura proyecto definida

### 🚧 FASE 1: MVP Core (4-6 semanas)
- [ ] Autenticación básica
- [ ] Dashboard principal
- [ ] Módulo XTB completo
- [ ] Perfil público básico

### 🔮 FASE 2: Multi-Plataforma (4-6 semanas)
- [ ] Trade Republic
- [ ] Mintos
- [ ] Real Estate
- [ ] Analytics unificados

### 🚀 FASE 3: Profesionalización (8+ semanas)
- [ ] Import/Export CSV
- [ ] APIs de precios
- [ ] Optimizaciones performance
- [ ] SEO y branding

---

## 📞 CONTACTO Y DECISIONES

**Product Owner**: Gabriel Beneite  
**Tech Lead**: Claude (AI Assistant)  
**Decisiones finales**: Gabriel  
**Código y arquitectura**: Colaborativo  

### Proceso de Decisión

1. **Claude propone** opciones con pros/contras
2. **Gabriel decide** qué camino tomar
3. **Documentamos** decisión y razón
4. **Ejecutamos** juntos

---

## 🔗 DOCUMENTOS RELACIONADOS

- [PRODUCT_VISION.md](./PRODUCT_VISION.md) → Detalle del producto
- [TECHNICAL_SPEC.md](./TECHNICAL_SPEC.md) → Especificaciones técnicas
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) → Plan de trabajo detallado
- [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) → Cómo trabajamos juntos
- [CHANGELOG.md](./CHANGELOG.md) → Historial de cambios

---

**Versión viva**: Este documento evoluciona con el proyecto.  
**Última revisión**: Cada sprint/fase.  
**Repositorio**: [GitHub URL aquí]
