# 💼 WEALTH TRACKER

> Personal portfolio tracker para unificar todas mis inversiones en un dashboard público y auditable.

[![Deploy](https://vercel.com/button)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://mongodb.com)

---

## 🎯 ¿Qué Es Esto?

Un sistema personal de tracking de inversiones que:

- ✅ **Unifica** todas mis plataformas (XTB, Trade Republic, Mintos, Real Estate)
- ✅ **Registra** cada operación con timestamp inmutable
- ✅ **Calcula** P/L, win rate, y otras métricas automáticamente
- ✅ **Comparte** mi track record de forma pública y verificable

**NO es**: Una herramienta de gestión de clientes, bot de trading, o red social.

---

## 🚀 Quick Start

### Requisitos Previos

- Node.js 18+ instalado
- MongoDB Atlas account (gratis)
- Vercel account (gratis)

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/wealth-tracker.git
cd wealth-tracker

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 📂 Estructura del Proyecto

```
wealth-tracker/
├─ app/               # Next.js App Router
├─ components/        # Componentes React
├─ lib/               # Utilidades y lógica de negocio
├─ docs/              # 📚 Documentación completa
│   ├─ PROJECT_OVERVIEW.md
│   ├─ PRODUCT_VISION.md
│   ├─ TECHNICAL_SPEC.md
│   ├─ DEVELOPMENT_PLAN.md
│   └─ WORKING_AGREEMENT.md
└─ public/            # Assets estáticos
```

---

## 📚 Documentación

### 🚀 PARA DESPLEGAR EN VERCEL (PRIMERO LEE ESTO)

**¿Primera vez desplegando?** 👉 **[DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md)** - Guía paso a paso para novatos (30-45 min)

**¿Necesitas detalles técnicos?** 👉 **[VERIFICATION_REPORT.md](./docs/VERIFICATION_REPORT.md)** - Reporte completo de verificación (checklist pre-deploy)

### 📖 DOCUMENTACIÓN GENERAL

1. **[PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md)** - Visión general del proyecto
2. **[PRODUCT_VISION.md](./docs/PRODUCT_VISION.md)** - Qué problema resolvemos y cómo
3. **[TECHNICAL_SPEC.md](./docs/TECHNICAL_SPEC.md)** - Stack y arquitectura técnica
4. **[DEVELOPMENT_PLAN.md](./docs/DEVELOPMENT_PLAN.md)** - Roadmap paso a paso
5. **[WORKING_AGREEMENT.md](./docs/WORKING_AGREEMENT.md)** - Cómo trabajamos

---

## 🛠️ Stack Tecnológico

**Frontend**:
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- shadcn/ui

**Backend**:
- Next.js API Routes
- MongoDB + Mongoose
- NextAuth.js

**Hosting**:
- Vercel (frontend + API)
- MongoDB Atlas (database)

---

## 📊 Estado Actual

**Fase**: ✅ Fase 0 - Setup & Fundamentos (COMPLETADO)  
**Progreso**: 100% - Listo para Deploy  

### ✅ Completado
- [x] Repositorio GitHub
- [x] Deploy Vercel (configurado, listo para conectar)
- [x] Estructura Next.js base
- [x] Documentación completa
- [x] MongoDB schema definido
- [x] NextAuth.js configurado
- [x] Build de producción funcional (0 vulnerabilidades)

### 🚀 Listo Para
- [x] Desplegar en Vercel (sigue DEPLOYMENT_GUIDE.md)
- [x] Conectar MongoDB Atlas
- [x] Pruebas de autenticación
- [x] Subir a producción

### 📅 Próximo (MVP)
- [ ] Completar módulo XTB
- [ ] Dashboard completo
- [ ] Perfil público
- [ ] Analytics básicos

Ver **[DEVELOPMENT_PLAN.md](./docs/DEVELOPMENT_PLAN.md)** para detalles, o **[DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md)** para empezar ahora.

---

## 🎯 Objetivos de Desarrollo

### MVP (4-6 semanas)
- Dashboard con patrimonio total
- Tracking completo de XTB
- Perfil público básico

### Fase 2 (8-12 semanas)
- Trade Republic integrado
- Mintos integrado
- Real Estate tracking
- Dashboard unificado

### Fase 3 (Futuro)
- Import/Export CSV
- Analytics avanzados
- Optimizaciones

---

## 🤝 Contribuir

Este es un proyecto personal, pero el código es open source.

**Si quieres usarlo**:
1. Fork el repositorio
2. Customiza para tus necesidades
3. (Opcional) Comparte lo que construiste

**No aceptamos**: Pull requests por ahora (proyecto personal activo).

---

## 📄 Licencia

MIT License - Ver [LICENSE](./LICENSE) para detalles.

---

## 📧 Contacto

**Gabriel Beneite**  
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Web: [Tu URL aquí]

---

## 🙏 Agradecimientos

Inspirado por las metodologías de:
- José Luis Cava
- David Galán
- Roberto Chamorro
- Mark Minervini

---

**Built with ❤️ y transparencia radical**
