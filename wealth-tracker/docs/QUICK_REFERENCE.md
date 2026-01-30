# 🎯 QUICK REFERENCE - WEALTH TRACKER

> **Hoja de Referencia Rápida** - Copia/Pega y acciones comunes

---

## 🚀 DEPLOY EN 3 PASOS

### Paso 1: MongoDB Atlas
```
1. Ve a: https://www.mongodb.com/cloud/atlas
2. Crea cluster Free Tier + usuario + IP whitelist (0.0.0.0/0)
3. Copia connection string: mongodb+srv://user:pass@cluster.mongodb.net/db
```

### Paso 2: Vercel
```
1. Ve a: https://vercel.com
2. Importa tu repositorio GitHub
3. Añade variables de entorno:
   - MONGODB_URI: [paste from MongoDB]
   - NEXTAUTH_SECRET: [generar: openssl rand -base64 32]
   - NEXTAUTH_URL: https://tu-proyecto.vercel.app
4. Deploy
```

### Paso 3: Verifica
```
1. Abre https://tu-proyecto.vercel.app
2. Intenta /register → crea usuario
3. Intenta /login → inicia sesión
4. Accede a /dashboard → debe funcionar
```

**✅ Listo**: Tu app está viva en internet 🎉

---

## 💻 DESARROLLO LOCAL

### Iniciar servidor
```powershell
cd c:\Users\Gabri\wealth-tracker\wealth-tracker
npm run dev
# http://localhost:3000
```

### Build para producción
```powershell
npm run build
npm start
```

### Linter
```powershell
npm run lint
```

---

## 🐛 DEBUGGING

### Ver logs locales
```powershell
npm run dev
# Abre browser F12 → Console
```

### Ver logs en Vercel
```
1. Dashboard Vercel → Tu proyecto
2. Deployments → Click deployment
3. Logs
```

### Conectar a MongoDB local (testing)
```bash
# Instala MongoDB Community Edition
# Connection string: mongodb://localhost:27017/wealth-tracker
```

---

## 📁 ESTRUCTURA DE ARCHIVOS CLAVE

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── dashboard/page.tsx
│   └── xtb/...
└── api/
    ├── auth/[...nextauth]/route.ts
    └── auth/register/route.ts

lib/
├── auth.ts              # NextAuth config
├── db/mongodb.ts        # Conexión DB
└── db/models/
    ├── User.ts
    └── XTBOperation.ts

components/
├── auth/
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
└── dashboard/...

types/
└── next-auth.d.ts       # TypeScript types
```

---

## 🔐 VARIABLES DE ENTORNO

### .env.local (local development - NUNCA commitear)
```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
NEXTAUTH_SECRET=generado-con-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
```

### Vercel (Settings → Environment Variables)
```
MONGODB_URI: [mongodb connection string]
NEXTAUTH_SECRET: [same secret]
NEXTAUTH_URL: https://tu-proyecto.vercel.app
```

---

## 🔄 WORKFLOW GIT

### Cambios locales
```powershell
git add .
git commit -m "feat: descripción"
git push
# Vercel auto-deploy (2-3 min)
```

### Descargar cambios remotos
```powershell
git pull origin main
```

### Ver status
```powershell
git status
git log --oneline
```

---

## 🧪 TESTING MANUAL

| Feature | URL | Test |
|---------|-----|------|
| **Landing** | `/` | Page carga |
| **Login** | `/login` | Form visible |
| **Register** | `/register` | Form visible |
| **Protected** | `/dashboard` | Redirige a /login sin session |
| **Auth** | `/login` | Email + pass → /dashboard |

---

## 📊 MONITOREO

### Vercel Analytics
```
Dashboard → Tu proyecto → Analytics
(Visitas, performance, Core Web Vitals)
```

### MongoDB Performance
```
Atlas → Cluster → Performance Advisor
(Queries lentas, índices, recursos)
```

### Error Tracking
```
Vercel Deployments → View logs
(Busca "error" o "Error")
```

---

## 🆘 PROBLEMAS COMUNES

### Build falla
```
1. Verifica variables de entorno en Vercel
2. Haz push a GitHub
3. Vercel redeploy automático
4. Si sigue fallando: click "Redeploy" en dashboard
```

### Registro no guarda usuarios
```
1. Verifica MONGODB_URI es correcto
2. MongoDB cluster activo (no paused)
3. IP whitelist: 0.0.0.0/0 (Network Access)
4. Redeploy en Vercel
```

### Login no funciona
```
1. Verifica NEXTAUTH_SECRET configurado
2. Verifica NEXTAUTH_URL correcto (sin /)
3. Intenta en incognito (clear cookies)
4. Verifica logs en Vercel
```

---

## 📚 DOCUMENTOS CLAVE

| Doc | Para Qué |
|-----|----------|
| **DEPLOYMENT_GUIDE.md** | Desplegar en Vercel (paso a paso) |
| **VERIFICATION_REPORT.md** | Detalles técnicos y checklist |
| **TECHNICAL_SPEC.md** | Arquitectura y stack |
| **DEVELOPMENT_PLAN.md** | Roadmap y próximas features |

---

## 🔗 LINKS RÁPIDOS

| Servicio | URL |
|----------|-----|
| **MongoDB Atlas** | https://cloud.mongodb.com |
| **Vercel** | https://vercel.com/dashboard |
| **GitHub** | https://github.com/gabrielbeneite/wealth-tracker |
| **Localhost** | http://localhost:3000 |
| **NextAuth Docs** | https://next-auth.js.org |
| **Next.js Docs** | https://nextjs.org/docs |

---

## ⚡ TIPS PRO

1. **Cambios que requieren rebuild**: .env.local, next.config.ts, middleware.ts
   → Necesitan restart `npm run dev`

2. **Cambios sin rebuild**: Componentes React, páginas
   → Hot reload automático

3. **MongoDB + Vercel**: Pool de conexiones en `lib/db/mongodb.ts`
   → Compatible con funciones serverless

4. **Debugging serverless**: Los logs de Vercel son tu amigo
   → Vercel Deployments → View logs

5. **Forzar rebuild en Vercel**: Push dummy commit o click "Redeploy"

---

## 📞 SOPORTE RÁPIDO

**El servidor no inicia**:
```powershell
npm install
npm run dev
```

**No veo cambios**:
```powershell
# Si es .env.local: reinicia `npm run dev`
# Si es componente: F5 en navegador
```

**Errores raros**:
```powershell
rm -r node_modules .next
npm install
npm run dev
```

---

**Última actualización**: 30 Enero 2026  
**Estado**: ✅ Proyecto listo para deployment
