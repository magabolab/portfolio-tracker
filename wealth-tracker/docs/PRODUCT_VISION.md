# 🎨 PRODUCT VISION - WEALTH TRACKER

> **Para**: Traders e inversores que valoran la transparencia  
> **Que**: Necesitan un registro auditable de su track record  
> **El producto**: Portfolio tracker personal y público  
> **Que**: Unifica todas las inversiones en un dashboard compartible  

---

## 💡 EL INSIGHT CLAVE

### El Problema Real

**Contexto**: Como trader independiente, constantemente me preguntan "¿cómo te va?"

**Opciones actuales**:
1. **Screenshots de broker** → Fácil de falsificar, no contextual
2. **Excel compartido** → Editable, no profesional
3. **Palabra** → Cero credibilidad
4. **Apps comerciales** → No diseñadas para transparencia pública

**Pain Point**: No existe una forma simple, creíble y profesional de demostrar mi track record real.

### La Solución

**Portfolio público con registro inmutable** que:
- ✅ Muestra cada operación con timestamp
- ✅ Calcula P/L automáticamente
- ✅ No permite editar historial (solo cerrar posiciones)
- ✅ Genera URL compartible con gráficos profesionales
- ✅ Unifica todas mis plataformas en un solo sitio

---

## 🎯 CASOS DE USO PRINCIPALES

### UC1: Demostrar Track Record

**Como** trader buscando validar mi expertise  
**Quiero** compartir un link público con mi historial completo  
**Para** que otros puedan ver resultados verificables, no palabrería  

**Flujo**:
1. Accedo a mi perfil público `/public/@gabriel`
2. Veo URL para compartir: `wealthtracker.com/@gabriel`
3. Decido qué mostrar:
   - [ ] Operaciones individuales (sí/no)
   - [ ] Montos exactos (sí/no, puedo ofuscar)
   - [ ] Solo métricas agregadas
4. Comparto link en LinkedIn, Twitter, conversaciones

**Resultado**:
- Cualquiera puede ver mi win rate, P/L total, mejores setups
- Si muestro operaciones: Timeline completo con fechas
- Todo con timestamps → Verificable

---

### UC2: Tomar Decisiones Informadas

**Como** trader con múltiples cuentas  
**Quiero** ver todo mi patrimonio en un solo lugar  
**Para** optimizar asignación de capital  

**Flujo**:
1. Abro dashboard principal
2. Veo patrimonio total: 53.575€
3. Veo distribución:
   - 93% Inmueble (50K)
   - 3.3% XTB (1.7K)
   - 2% TR (1K)
   - 1.4% Mintos (750)
4. Decido: "Demasiado en inmueble, mover más a trading"

**Resultado**:
- Visión holística clara
- Decisiones basadas en datos
- Sin tener que abrir 4 apps diferentes

---

### UC3: Registro Post-Operación

**Como** trader que acaba de cerrar una posición  
**Quiero** registrarla inmediatamente con todos los detalles  
**Para** tener historial completo y hacer análisis posterior  

**Flujo**:
1. Cierro operación en XTB (ej: NVDA +8%)
2. Voy a Wealth Tracker → XTB → Posiciones Abiertas
3. Click en "Cerrar" en NVDA
4. Formulario pre-llenado:
   - Precio salida: [manual]
   - Fecha salida: [hoy]
   - Motivo: [take_profit]
5. Añado notas: "Salió perfecto, earnings beat"
6. Confirmo → P/L calculado automáticamente

**Resultado**:
- Operación en historial inmutable
- Analytics se actualizan (win rate, P/L total)
- Puedo revisar qué funcionó/falló más tarde

---

### UC4: Análisis de Performance

**Como** trader al final del mes  
**Quiero** ver qué setups funcionaron mejor  
**Para** duplicar lo que funciona y evitar lo que falla  

**Flujo**:
1. Voy a Analytics → XTB
2. Veo métricas del mes:
   - Win rate: 68%
   - P/L: +450€
   - Mejor setup: Breakouts (80% win rate)
   - Peor setup: Reversals (40% win rate)
3. Veo gráfico: Breakouts → Avg win +120€
4. Decisión: "El próximo mes solo Breakouts y Pullbacks"

**Resultado**:
- Mejora continua basada en datos
- Menos emocionalidad, más objetividad
- Track record de aprendizaje visible

---

## 🌟 PROPUESTA DE VALOR ÚNICA

### Para Mí (Usuario Principal)

| Beneficio | Cómo lo Logramos |
|-----------|------------------|
| **Credibilidad** | Timestamps inmutables + Historial completo |
| **Claridad** | Dashboard unificado de todas las plataformas |
| **Mejora** | Analytics detallados de qué funciona |
| **Rapidez** | No más Excel/hojas de cálculo |
| **Profesionalismo** | URL compartible con diseño limpio |

### Para Audiencia Externa

| Beneficio | Cómo lo Logramos |
|-----------|------------------|
| **Transparencia** | Ven operaciones reales, no cherry-picking |
| **Verificable** | Timestamps + Cálculos automáticos |
| **Educativo** | Pueden ver estrategia en acción |
| **Inspirador** | Track record real, alcanzable |

---

## 🎨 PRINCIPIOS DE DISEÑO

### 1. Claridad Brutal

**Malo**: "ROI ajustado por volatilidad: 1.23σ"  
**Bueno**: "+24.3% este año"

→ Métricas simples, directo al grano

### 2. Visual First

**Malo**: Tabla con 50 operaciones  
**Bueno**: Gráfico de equity curve + tabla filtrable debajo

→ Insights visuales primero, detalles después

### 3. Mobile-Friendly (pero no Mobile-First)

**Razón**: La mayoría del uso será en desktop  
**Pero**: Debe verse bien en móvil para compartir  

→ Responsive pero optimizado para pantalla grande

### 4. Dark Mode por Defecto

**Razón**: 
- Menos fatiga visual (paso horas mirando charts)
- Look profesional "trader"
- Ahorro batería

→ Theme oscuro como principal, light mode opcional

### 5. Mínimo Clicks

**Objetivo**: Operaciones frecuentes en <3 clicks

Ejemplos:
- Cerrar posición: 2 clicks (posición → cerrar → confirmar)
- Ver P/L total: 0 clicks (en dashboard siempre visible)
- Añadir operación: 1 click (botón flotante omnipresente)

---

## 🚫 NO-GOALS (Qué NO haremos)

### 1. No es un Curso de Trading

❌ No incluiremos:
- Tutoriales de "cómo hacer swing trading"
- Señales de trading
- Recomendaciones de compra/venta

✅ En su lugar:
- Mostrar mi proceso
- Compartir resultados
- Dejar que otros aprendan observando

### 2. No es una Herramienta de Ejecución

❌ No tendrá:
- Botones para ejecutar trades
- Integración directa con APIs de brokers para trading
- Órdenes automáticas

✅ En su lugar:
- Tracking manual post-ejecución
- Opcionalmente: import CSV desde brokers

### 3. No es una Red Social

❌ No incluirá:
- Sistema de likes/comentarios
- Feeds de otros usuarios
- Mensajería entre traders

✅ En su lugar:
- Perfil público individual
- Opción de fork del código (GitHub)

### 4. No es una Aplicación Empresarial

❌ No tendrá:
- Multi-tenancy complejo
- Roles y permisos granulares
- Facturación por suscripciones

✅ En su lugar:
- Single-user optimizado
- Open source para que otros se auto-hostien

---

## 📊 MÉTRICAS QUE IMPORTAN

### Métricas de Uso (Mías)

| Métrica | Objetivo | Cómo Medirlo |
|---------|----------|--------------|
| **Frecuencia de registro** | Registrar cada operación <24h | Tiempo entre cierre real → registro |
| **Tiempo en dashboard** | <2 min/día para chequeo | Analytics de uso |
| **Decisiones informadas** | 1+ por semana basada en data | Journal/Notas |

### Métricas de Impacto (Público)

| Métrica | Objetivo | Cómo Medirlo |
|---------|----------|--------------|
| **Visitas a perfil público** | 50+/mes en 6 meses | Analytics |
| **Shares en RRSS** | 10+/mes | Tracking UTMs |
| **Forks del repo** | 5+ en 1 año | GitHub stats |

---

## 🎭 PERSONALIDAD DE LA MARCA

### Tono de Voz

**Somos**: Directo, data-driven, sin filtros  
**No somos**: Corporativo, marketero, promesas vacías

**Ejemplos**:

| Situación | ❌ Malo | ✅ Bueno |
|-----------|---------|----------|
| Win Rate bajo | "Optimizar estrategias para mejorar performance" | "Este mes me fue mal. Win rate 40%. A mejorar." |
| Nueva feature | "Revolucionaria herramienta de analytics" | "Añadido gráfico de P/L mensual" |
| Descripción | "Plataforma integral de gestión patrimonial" | "Dashboard para ver dónde está mi dinero" |

### Estética Visual

**Inspiración**:
- Bloomberg Terminal (datos densos pero organizados)
- Stripe Dashboard (limpio, moderno)
- Linear (minimalista, rápido)

**Paleta**:
- Base: Slate oscuro (#0f172a)
- Acentos: Azul eléctrico (#3b82f6), Verde (#10b981), Rojo (#ef4444)
- Tipografía: Sans-serif moderna (Inter, Geist)

---

## 🔮 VISIÓN A 2 AÑOS

### Año 1

**Q1-Q2**: MVP funcional → Usando diariamente  
**Q3**: Multi-plataforma completo  
**Q4**: Perfil público activo, compartiendo regularmente  

### Año 2

**Q1-Q2**: Analytics avanzados, import automático  
**Q3-Q4**: Comunidad pequeña usando el código (5-10 forks activos)  

### Éxito Sería...

1. **Uso personal**: Es mi herramienta principal de tracking (reemplazó Excel)
2. **Credibilidad**: Comparto link en conversaciones profesionales con confianza
3. **Impacto**: Al menos 3 personas me escriben diciendo "usé tu código, gracias"
4. **Aprendizaje**: He mejorado mi win rate 10%+ gracias a los insights

---

## 🤝 OPORTUNIDADES FUTURAS (Post-MVP)

**Si esto funciona bien, podría...**

### Opción A: SaaS Ligero
- Versión hosteada para otros traders
- $5-10/mes para no-técnicos
- Keep código open source

### Opción B: Consultoría
- Implementaciones personalizadas
- Soporte a fondos pequeños
- Auditorías de track record

### Opción C: Contenido
- Blog sobre trading transparente
- YouTube: "Building in public"
- Curso: "Cómo demostrar tu track record"

**Pero eso es futuro lejano. Ahora: construir para mí.**

---

## 📚 REFERENCIAS E INSPIRACIÓN

### Productos Similares (Análisis Competitivo)

| Producto | Qué Hacen Bien | Qué Falta |
|----------|----------------|-----------|
| **TradingView** | Gráficos hermosos | No tracking de portfolio real |
| **Sharesight** | Tracking multi-plataforma | No público, UI anticuada |
| **Notion Finance** | Personalizable | Lento, no inmutable |
| **Excel/GSheets** | Flexible | Cero credibilidad, editable |

### Ninguno hace:
- ✅ Público + Inmutable + Unificado + Profesional

**Ese es nuestro espacio.**

---

## 🎯 DECISIONES DE PRODUCTO (Log)

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 30-Ene-2026 | Pivot a "personal-first" | Alineado con valores (no forzar a otros) |
| 30-Ene-2026 | No validaciones bloqueantes | Advertencias sí, bloqueos no |
| 30-Ene-2026 | Dark mode por defecto | Preferencia personal + profesional |

---

**Mantenido por**: Gabriel + Claude  
**Siguiente revisión**: Fin de cada sprint  
**Feedback**: Cualquier momento, iterar rápido
