# 🤝 WORKING AGREEMENT - WEALTH TRACKER

> **Filosofía**: Colaboración eficiente, transparente y productiva  
> **Objetivo**: Construir juntos sin fricciones innecesarias  
> **Principio**: Pragmatismo > Perfección  

---

## 👥 ROLES Y RESPONSABILIDADES

### Gabriel (Product Owner & Developer)

**Responsabilidades**:
- ✅ Tomar decisiones finales de producto
- ✅ Definir prioridades
- ✅ Escribir código (con asistencia de Claude)
- ✅ Probar features con data real
- ✅ Deploy y mantenimiento

**Compromisos**:
- Comunicar claramente qué quiere construir
- Dar feedback honesto sobre propuestas
- Actualizar documentación cuando tome decisiones
- Ser paciente consigo mismo (aprendizaje continuo)

---

### Claude (AI Technical Assistant)

**Responsabilidades**:
- ✅ Proponer soluciones técnicas con pros/contras
- ✅ Generar código limpio y comentado
- ✅ Explicar conceptos cuando sea necesario
- ✅ Ayudar a debuggear problemas
- ✅ Mantener documentación actualizada

**Limitaciones**:
- ❌ No tengo acceso directo a tu código (debes compartirlo)
- ❌ No puedo ejecutar comandos en tu máquina
- ❌ No recuerdo conversaciones anteriores (usa los docs como contexto)
- ❌ Puedo cometer errores (revisar código antes de aplicar)

**Compromisos**:
- Explicar el "por qué", no solo el "cómo"
- Ofrecer alternativas cuando existan
- Admitir cuando no sé algo
- Priorizar simplicidad sobre complejidad

---

## 🔄 WORKFLOW DE DESARROLLO

### Proceso Típico para Nueva Feature

```
1. DEFINIR (en docs)
   ├─ ¿Qué problema resuelve?
   ├─ ¿Cómo se ve el éxito?
   └─ Añadir a DEVELOPMENT_PLAN.md

2. DISEÑAR (si necesario)
   ├─ Wireframes/Mockups (opcional)
   ├─ Decidir approach técnico
   └─ Identificar dependencias

3. IMPLEMENTAR
   ├─ Gabriel: Compartir contexto del código actual
   ├─ Claude: Proponer implementación
   ├─ Gabriel: Revisar, ajustar, aplicar
   └─ Iterar hasta funcionar

4. DEPLOY
   ├─ Commit con mensaje descriptivo
   ├─ Push a GitHub
   └─ Verificar deploy en Vercel

5. PROBAR
   ├─ Gabriel: Usar feature con data real
   ├─ Identificar bugs o mejoras
   └─ Iterar si necesario

6. DOCUMENTAR
   ├─ Actualizar CHANGELOG.md
   ├─ Marcar tarea como completada
   └─ Notas de lo aprendido (si aplica)
```

---

## 💬 COMUNICACIÓN

### Cómo Empezar una Sesión de Trabajo

**Formato recomendado**:

```
Hola Claude,

Vamos a trabajar en [feature/bugfix].

Contexto:
- [Qué estoy intentando hacer]
- [Dónde estoy bloqueado / qué necesito]
- [Archivos relevantes: ruta/al/archivo.tsx]

Adjunto: [código relevante si es necesario]

Documentos de referencia:
- /docs/PROJECT_OVERVIEW.md
- /docs/TECHNICAL_SPEC.md
```

**Ejemplo**:
```
Hola Claude,

Vamos a implementar el formulario de nueva operación XTB.

Contexto:
- Necesito crear un wizard multi-step
- Debe calcular automáticamente el riesgo
- Estoy en /app/(dashboard)/xtb/add/page.tsx

¿Puedes revisar DEVELOPMENT_PLAN.md (T1.2.2) y ayudarme
a implementar el primer paso del formulario?
```

---

### Cuando Compartir Código

**Siempre incluir**:
1. Ruta del archivo (`/components/xtb/OperationForm.tsx`)
2. Qué hace el código actualmente
3. Qué quieres que haga
4. Errores que estás viendo (si los hay)

**Formato**:
```typescript
// components/xtb/OperationForm.tsx
// Actualmente: Muestra un formulario básico
// Problema: No valida el stop loss
// Necesito: Añadir validación que el stop < precio entrada

export default function OperationForm() {
  // ... código actual ...
}
```

---

### Cuando Pedir Explicaciones

**Está OK preguntar**:
- "¿Qué hace exactamente este hook?"
- "¿Por qué usamos async/await aquí?"
- "¿Cuál es la diferencia entre X y Y?"

**Claude explicará**:
- Concepto técnico
- Analogía si es complejo
- Ejemplo de código
- Links a docs oficiales

---

## 📚 DOCUMENTACIÓN

### Documentos Vivos (Actualizar frecuentemente)

**DEVELOPMENT_PLAN.md**:
- Marcar tareas completadas: `- [x] Tarea`
- Añadir notas si algo cambió
- Actualizar timelines si necesario

**CHANGELOG.md**:
- Después de cada deploy importante
- Formato: Fecha, Feature/Fix, Descripción breve

**PROJECT_OVERVIEW.md**:
- Cuando el scope cambia
- Cuando tomamos decisiones estratégicas

---

### Documentos de Referencia (Leer, no editar frecuentemente)

**PRODUCT_VISION.md**:
- Consultar cuando no estamos seguros si una feature aplica

**TECHNICAL_SPEC.md**:
- Consultar para decisiones técnicas

---

### Cómo Documentar Decisiones

**Formato** (añadir a docs relevante):

```markdown
## Decisión: [Título]

**Fecha**: [DD-Mes-YYYY]
**Contexto**: [Por qué necesitamos decidir]
**Opciones**:
1. Opción A - [pros/contras]
2. Opción B - [pros/contras]

**Decisión**: Opción [A/B]
**Razón**: [Por qué elegimos esta]
**Implicaciones**: [Qué cambia con esto]
```

**Ejemplo**:
```markdown
## Decisión: TypeScript vs JavaScript

**Fecha**: 30-Ene-2026
**Contexto**: Necesitamos decidir el lenguaje del proyecto

**Opciones**:
1. TypeScript - Type safety, mejor DX, curva aprendizaje
2. JavaScript - Más rápido al principio, menos overhead

**Decisión**: JavaScript primero, migrar gradual a TypeScript
**Razón**: Priorizar shipping features sobre type safety inicial
**Implicaciones**: Algunos archivos .js, otros .ts (está OK)
```

---

## 🐛 DEBUGGING COLABORATIVO

### Cuando Algo No Funciona

**Gabriel comparte**:
1. **Qué esperaba**: "Debería calcular el P/L automáticamente"
2. **Qué pasa**: "Siempre muestra 0"
3. **Código relevante**: [snippet]
4. **Error (si hay)**: [mensaje de error completo]
5. **Pasos para reproducir**: "Abro formulario → Lleno campos → Submit"

**Claude ayuda**:
1. Identificar posible causa
2. Proponer solución
3. Explicar por qué ocurrió (para aprender)

---

### Errores Comunes y Soluciones

**"No compila"**:
```bash
# Ver error exacto
npm run build

# Compartir output completo con Claude
```

**"No se conecta a la DB"**:
```bash
# Verificar env vars
cat .env.local | grep MONGODB

# Test de conexión
node scripts/test-db.js
```

**"Deploy falla en Vercel"**:
```bash
# Ver logs en Vercel dashboard
# Compartir error específico con Claude
```

---

## ⏰ TIME MANAGEMENT

### Estimaciones

**Claude proporcionará**:
- Tiempo estimado por tarea
- Marcado con 🕐 emoji

**Ejemplo**:
```markdown
T1.2.1: Vista Posiciones Abiertas
🕐 Estimación: 3-4 horas
```

**Gabriel ajusta**:
- Basado en experiencia real
- Sin presión de cumplir estimaciones exactas
- Foco en calidad > velocidad

---

### Sesiones de Trabajo

**Recomendado**:
- Sesiones de 2-4 horas concentradas
- Breaks cada hora
- Mejor calidad que cantidad

**No hacer**:
- Maratones de 8+ horas (burnout)
- Multitasking (enfocarse en 1 tarea)
- Trabajar con presión de "terminar ya"

---

## 🎯 DEFINICIÓN DE "DONE"

### Una Tarea Está Completa Cuando:

- [ ] Código implementado y funciona
- [ ] Sin errores de compilación
- [ ] Probado con data real (no solo mock)
- [ ] Deploy a Vercel exitoso
- [ ] Documentación actualizada (si aplica)
- [ ] Commit con mensaje descriptivo

**NO requiere**:
- Tests unitarios (por ahora)
- Perfección visual
- Funcionar en todos los edge cases

---

## 🚨 CUANDO ESTAMOS BLOQUEADOS

### Señales de Bloqueo

- Más de 2 horas en el mismo problema sin progreso
- No entiendo qué hacer next
- Error que no sé cómo resolver

### Proceso de Desbloqueo

**1. Pausa** (5-10 min)
   - Alejarse del código
   - Refrescar mente

**2. Simplificar**
   - ¿Puedo hacer una versión más simple?
   - ¿Puedo dividir en sub-problemas?

**3. Pedir Ayuda**
   - Compartir contexto completo con Claude
   - Explicar qué he intentado

**4. Pivot (si necesario)**
   - Trabajar en otra tarea
   - Volver a esto más tarde

---

## 📅 RITMO DE TRABAJO

### Weekly Rhythm

**Lunes**:
- Review plan de la semana
- Identificar 3-5 tareas objetivo

**Martes-Jueves**:
- Ejecución
- Daily micro-updates (opcional)

**Viernes**:
- Weekly review
- Update DEVELOPMENT_PLAN.md
- Plan próxima semana

---

### Monthly Rhythm

**Fin de mes**:
- Sprint review mayor
- Deploy de features completadas
- Retrospectiva
- Ajustar roadmap si necesario

---

## 🎨 ESTÁNDARES DE CÓDIGO

### Código Limpio

**Preferencias**:
- ✅ Nombres descriptivos de variables
- ✅ Funciones pequeñas (<50 líneas)
- ✅ Comentarios para lógica compleja
- ✅ Consistencia en el proyecto

**Evitar**:
- ❌ Magic numbers sin explicación
- ❌ Funciones de 200+ líneas
- ❌ Nombres crípticos (x, temp, data)

---

### Comentarios

**Cuándo comentar**:
```typescript
// ✅ BIEN: Explicar "por qué"
// Usamos bcrypt porque es más seguro que MD5
const hash = bcrypt.hash(password, 12);

// ❌ MAL: Explicar "qué" (el código ya lo dice)
// Crear un hash
const hash = bcrypt.hash(password, 12);
```

---

## 🔄 VERSIONADO Y GIT

### Commits

**Formato**:
```bash
type(scope): mensaje breve

# Ejemplo
feat(xtb): añadir formulario nueva operación
fix(dashboard): corregir cálculo patrimonio
docs(readme): actualizar instrucciones
```

**Types**:
- `feat` - Nueva feature
- `fix` - Bugfix
- `docs` - Documentación
- `refactor` - Refactoring
- `style` - Formatting
- `test` - Tests

---

### Branches

**Strategy**: Simple Git Flow

```
main → Producción (siempre deployable)
develop → Trabajo en progreso
feature/nombre → Features grandes (opcional)
```

**Workflow básico**:
```bash
# Trabajar en develop
git checkout develop

# Hacer cambios
git add .
git commit -m "feat(xtb): nueva feature"

# Push a develop
git push origin develop

# Cuando está listo
git checkout main
git merge develop
git push origin main
# → Auto-deploy a Vercel
```

---

## 🎓 APRENDIZAJE CONTINUO

### Cuando No Entiendo Algo

**Gabriel puede**:
1. Preguntar a Claude directamente
2. Pedir analogías o ejemplos
3. Pedir links a documentación
4. Solicitar explicación paso a paso

**Claude se compromete**:
- Explicar sin asumir conocimiento previo
- Usar analogías del mundo real
- Proporcionar ejemplos prácticos
- No usar jerga innecesaria

---

### Recursos de Aprendizaje

**Cuando Claude menciona un concepto nuevo**:
- Link a docs oficiales
- Ejemplo de código
- Analogía explicativa

**Gabriel puede**:
- Tomar tiempo para leer y entender
- Pedir re-explicación si no queda claro
- Implementar primero versión simple

---

## 🤝 EXPECTATIVAS MUTUAS

### Gabriel Espera de Claude

- ✅ Soluciones que funcionen
- ✅ Explicaciones claras
- ✅ Código bien comentado
- ✅ Advertencias sobre posibles problemas
- ✅ Honestidad cuando algo es complejo

### Claude Espera de Gabriel

- ✅ Contexto claro cuando pide ayuda
- ✅ Feedback sobre qué funciona/no funciona
- ✅ Paciencia en el proceso de aprendizaje
- ✅ Actualizar docs cuando toma decisiones
- ✅ Comunicar bloqueos pronto

---

## 🔮 EVOLUCIÓN DE ESTE ACUERDO

**Este documento es vivo**

- Añadir secciones si identificamos gaps
- Ajustar procesos que no funcionan
- Celebrar lo que sí funciona

**Revisión**: Mensual o cuando sea necesario

---

## 📝 NOTAS FINALES

### Principios Guía

1. **Progreso > Perfección**
   - Mejor código funcional que código perfecto sin hacer

2. **Aprender Haciendo**
   - Errores son oportunidades de aprendizaje

3. **Documentar Decisiones**
   - Futuro Gabriel agradecerá el contexto

4. **Comunicar Pronto**
   - Bloqueos temprano = soluciones rápidas

5. **Celebrar Wins**
   - Cada feature funcional es un logro

---

**Firmado** (metafóricamente):

✅ **Gabriel Beneite** - Product Owner & Developer  
✅ **Claude** - AI Technical Assistant  

**Fecha**: 30 Enero 2026  
**Próxima revisión**: Fin Febrero 2026

---

**Let's build something great together!** 🚀
