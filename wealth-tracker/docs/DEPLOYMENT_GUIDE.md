# 🚀 DEPLOYMENT GUIDE - WEALTH TRACKER

> **Para Novatos**: Guía paso a paso para desplegar en Vercel con MongoDB  
> **Tiempo Estimado**: 30-45 minutos  
> **Nivel**: Principiante (sin experiencia requerida)

---

## 📋 ÍNDICE

1. [Preparación Initial](#preparación-inicial)
2. [Paso 1: Crear MongoDB Atlas](#paso-1-crear-mongodb-atlas)
3. [Paso 2: Configurar Vercel](#paso-2-configurar-vercel)
4. [Paso 3: Deploy y Pruebas](#paso-3-deploy-y-pruebas)
5. [Solución de Problemas](#solución-de-problemas)
6. [Resumen Final](#resumen-final)

---

## 📋 PREPARACIÓN INICIAL

### ✅ Requisitos Previos (5 minutos)

Asegúrate de tener:

1. **GitHub Account** (Gratuito)
   - ¿Ya tienes? Salta al siguiente
   - ¿No tienes? Ve a https://github.com/signup y crea una cuenta

2. **Git Instalado** en tu computadora
   - En Windows: Descarga desde https://git-scm.com/download/win
   - Instala con opciones por defecto
   - Verifica en terminal: `git --version`

3. **Node.js 18+** 
   - ¿Ya tienes? Verifica: `node --version` (debe ser v18 o superior)
   - ¿No tienes? Ve a https://nodejs.org y descarga LTS
   - Instala y reinicia tu computadora

4. **El Código del Proyecto**
   - Clonado en: `c:\Users\Gabri\wealth-tracker\wealth-tracker`
   - Verificado ✅ durante revisión

### ✅ Verificación Local (5 minutos)

Abre Terminal/PowerShell y ejecuta:

```powershell
cd c:\Users\Gabri\wealth-tracker\wealth-tracker
npm --version        # Debe ser 10+
node --version       # Debe ser 18+
npm run build        # Debe decir "✓ Compiled successfully"
```

Si todo está bien, continúa ✅

---

## 🌍 PASO 1: CREAR MONGODB ATLAS

### Parte 1.1: Crear Cuenta (5 minutos)

1. Abre https://www.mongodb.com/cloud/atlas en tu navegador
2. Click en el botón **"Try Free"** (verde, arriba a la derecha)
3. Se abre un formulario de registro
4. Completa:
   - Email: `tu-email@ejemplo.com`
   - Contraseña: `contraseña-fuerte` (guárdala)
   - First Name: `Gabriel` (o tu nombre)
   - Last Name: `Beneite` (o tu apellido)
   - Company Name: (opcional, escribe `Wealth Tracker` o tu nombre)
5. Marca las checkboxes si aceptas términos
6. Click en **"Create your Atlas account"**
7. Verifica tu email (MongoDB te envía link)
8. Click el link en el email
9. ¡Cuenta creada!

### Parte 1.2: Crear Cluster (5 minutos)

Una vez logueado en MongoDB Atlas:

1. Click en **"Create a Deployment"**
2. Selecciona **"Free Tier"** (el único gratuito)
3. Elige Provider: **AWS** (cualquiera funciona)
4. Elige Region: **Europe (Ireland)** (más cercano a España)
5. Cluster Name: Puedes dejar por defecto o escribir `wealth-tracker`
6. Click en **"Create Deployment"**
7. Espera 2-3 minutos (verás una barra de progreso)
8. ¡Cluster creado!

### Parte 1.3: Crear Usuario de Base de Datos (5 minutos)

En la pantalla principal de Atlas:

1. En el menú izquierdo, haz click en **"Database Access"**
2. Click en el botón **"Add New Database User"**
3. Completa:
   - **Username**: `wealth_tracker`
   - **Password**: Usa el botón "Autogenerate Secure Password"
   - **IMPORTANTE**: Copia la contraseña y guárdala en un lugar seguro (Notepad por ahora)
4. Database User Privileges: Selecciona **"Built-in Role" → "Atlas admin"**
5. Click en **"Add User"**
6. ¡Usuario creado!

### Parte 1.4: Permitir Conexiones (2 minutos)

Todavía en MongoDB Atlas:

1. En el menú izquierdo, haz click en **"Network Access"**
2. Click en **"Add IP Address"**
3. Click en **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click en **"Confirm"**
5. ¡Red configurada!

### Parte 1.5: Obtener Connection String (5 minutos)

1. Vuelve a la pantalla principal (click en "Deployments")
2. Verás tu cluster - click en el botón **"Connect"**
3. Selecciona **"Connect to your application"**
4. Selecciona:
   - Driver: **Node.js**
   - Version: **5.9 or later**
5. Verás una URL similar a:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **IMPORTANTE**: 
   - Reemplaza `<username>` con `wealth_tracker`
   - Reemplaza `<password>` con la contraseña que guardaste
   - Reemplaza el `/?` con `/wealth-tracker?`
   - Resultado final debe ser:
   ```
   mongodb+srv://wealth_tracker:tu-password@cluster0.xxxxx.mongodb.net/wealth-tracker?retryWrites=true&w=majority
   ```
7. Copia esta URL y guárdala (la necesitarás en Vercel)

**✅ MongoDB Setup Completo**

---

## 🚀 PASO 2: CONFIGURAR VERCEL

### Parte 2.1: Conectar GitHub a Vercel (3 minutos)

1. Abre https://vercel.com en tu navegador
2. Click en **"Sign Up"** (esquina superior derecha)
3. Selecciona **"Continue with GitHub"**
4. Click en **"Authorize Vercel"** cuando te lo pida
5. Completa tu perfil si es necesario
6. ¡Logueado en Vercel!

### Parte 2.2: Importar Proyecto (3 minutos)

1. En Vercel dashboard, click en **"New Project"**
2. Bajo "Import Git Repository", busca `wealth-tracker`
3. Deberías ver tu repositorio - click en **"Import"**
4. **IMPORTANTE**: En la siguiente pantalla:
   - **Project Name**: `wealth-tracker` (o el que prefieras)
   - **Framework Preset**: Debe ser `Next.js` (auto-detectado)
   - **Root Directory**: Vacío (está en raíz)
5. Click en **"Import"**
6. Espera a que Vercel haga el análisis (1-2 minutos)

### Parte 2.3: Configurar Variables de Entorno (5 minutos)

Vercel ahora te muestra pantalla de "Configure Project":

1. En la sección **"Environment Variables"**, verás campos vacíos
2. Necesitas añadir 3 variables. Completa:

**Variable 1**:
```
Name: MONGODB_URI
Value: (pega aquí la URL que copiaste de MongoDB Atlas)
Environments: ☑️ Production  ☑️ Preview  ☑️ Development
```

**Variable 2** (Generar Secret):
Abre una terminal nueva y ejecuta:
```powershell
openssl rand -base64 32
```
Copia el resultado (será algo como: `AbCdEfGhIjKlMnOpQrStUvWxYz+123456789=`)

```
Name: NEXTAUTH_SECRET
Value: (pega lo que generaste arriba)
Environments: ☑️ Production  ☑️ Preview  ☑️ Development
```

**Variable 3**:
```
Name: NEXTAUTH_URL
Value: https://wealth-tracker.vercel.app
(Nota: Reemplaza "wealth-tracker" con tu nombre de proyecto si es diferente)
Environments: ☑️ Production  ☑️ Preview  ☑️ Development
```

3. Click en **"Deploy"** (botón grande azul)
4. Vercel comienza a desplegar (verás barra de progreso)
5. Espera a que termine (2-3 minutos)
6. ¡Deploy completado! 🎉

---

## ✅ PASO 3: DEPLOY Y PRUEBAS

### Parte 3.1: Verificar Deployment (1 minuto)

Una vez que Vercel termine de desplegar:

1. Verás un mensaje **"Congratulations! Your project has been successfully deployed"**
2. Click en el link que aparece o ve a tu URL:
   - `https://wealth-tracker.vercel.app` (o la que configuraste)
3. Deberías ver la página de inicio (landing page) ✅

### Parte 3.2: Pruebas Manuales (10 minutos)

Ahora vamos a probar que todo funciona:

#### Test 1: Ver Landing Page
- URL: `https://wealth-tracker.vercel.app`
- Deberías ver: Página de inicio con información del proyecto
- **Status**: ✅ Funcionando

#### Test 2: Ir a Login
- URL: `https://wealth-tracker.vercel.app/login`
- Deberías ver: Formulario de login con email y contraseña
- **Status**: ✅ Funcionando

#### Test 3: Intentar Acceder a Dashboard sin Login
- URL: `https://wealth-tracker.vercel.app/dashboard`
- Deberías: Ser redirigido a `/login` (protección funciona)
- **Status**: ✅ Funcionando

#### Test 4: Registrar Nueva Cuenta
1. Ve a `https://wealth-tracker.vercel.app/register`
2. Completa:
   - Nombre: `Gabriel`
   - Email: `test@ejemplo.com`
   - Contraseña: `password123`
   - Confirmar: `password123`
   - Edad: `24`
3. Click "Registrarse"
4. Si ves mensaje verde "✅ Cuenta creada", ¡funcionó! ✅
5. **Status**: ✅ Funcionando

#### Test 5: Hacer Login
1. Serás redirigido a `/login` automáticamente
2. Completa:
   - Email: `test@ejemplo.com`
   - Contraseña: `password123`
3. Click "Iniciar Sesión"
4. Deberías ser redirigido a `/dashboard`
5. Deberías ver: Dashboard con bienvenida
6. **Status**: ✅ Funcionando

#### Test 6: Acceder a Rutas Protegidas
- URL: `https://wealth-tracker.vercel.app/xtb/positions`
- Deberías ver: Página de posiciones (no redirigido a login)
- **Status**: ✅ Funcionando

### ¿Todos los tests Pasaron? 🎉

**¡FELICIDADES!** Tu aplicación está:
- ✅ Desplegada en Vercel
- ✅ Conectada a MongoDB
- ✅ Con autenticación funcionando
- ✅ Lista para usar

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Problema 1: "Deployment failed"

**Síntomas**: Vercel dice que falló el deploy
**Solución**:

1. Click en "View Error Log" (si aparece)
2. Busca si dice algo sobre `MONGODB_URI`
3. Si es eso:
   - Verifica que tu MONGODB_URI en Vercel es correcta
   - Debe tener formato: `mongodb+srv://user:pass@cluster.mongodb.net/db`
   - Redeploy haciendo click "Redeploy" en Vercel

### Problema 2: "Cannot connect to MongoDB"

**Síntomas**: Login page carga pero registro falla
**Solución**:

1. En MongoDB Atlas, verifica:
   - Cluster está activo (no "paused")
   - Usuario existe (Database Access)
   - IP whitelist permite 0.0.0.0/0 (Network Access)

2. En Vercel, verifica:
   - MONGODB_URI está correctamente configurada
   - No hay espacios extra ni caracteres mal escapados
   - Redeploy haciendo push a GitHub o click "Redeploy"

### Problema 3: "NextAuth error"

**Síntomas**: Página de login se carga pero al iniciar sesión hay error
**Solución**:

1. Verifica en Vercel que:
   - NEXTAUTH_SECRET está configurado
   - NEXTAUTH_URL es correcto (sin trailing slash)
   - Ambos en todos los ambientes (Production, Preview, Development)

2. Redeploy:
   - Haz push a GitHub con cambios dummy
   - Vercel auto-redeploy
   - O click "Redeploy" en Vercel dashboard

### Problema 4: "Page not found" en rutas

**Síntomas**: Obtienes 404 en algunas rutas
**Solución**: Normal durante MVP, solo /login y /register están completamente funcionales

---

## 📊 RESUMEN FINAL

### Lo Que Lograste

✅ **MongoDB Atlas Setup**:
- Cluster creado y funcionando
- Usuario con permisos configurado
- IP whitelist permitiendo conexiones

✅ **Vercel Deployment**:
- Proyecto importado desde GitHub
- Variables de entorno configuradas
- Deploy automático funcionando

✅ **Aplicación Funcional**:
- Landing page visible
- Login funcionando
- Registro de usuarios funcionando
- Protección de rutas funcionando
- MongoDB conectado y guardando datos

### URLs Importantes

| Recurso | URL |
|---------|-----|
| **Tu Aplicación** | `https://wealth-tracker.vercel.app` |
| **Vercel Dashboard** | `https://vercel.com/dashboard` |
| **MongoDB Atlas** | `https://cloud.mongodb.com` |
| **GitHub Repository** | `https://github.com/tu-usuario/wealth-tracker` |

### Próximos Pasos

1. **Hoy**: Tu aplicación está en vivo ✅
2. **Esta Semana**: 
   - Prueba registro/login más exhaustivamente
   - Verifica logs en Vercel (Deployments → View logs)
3. **Próximas Semanas**:
   - Desarrolla módulo XTB (tracking de operaciones)
   - Añade más features según DEVELOPMENT_PLAN.md

### Mantenimiento Regular

Cada semana:
- Ve a Vercel dashboard y verifica "Deployments"
- Ve a MongoDB Atlas y verifica "Performance Advisor"
- Lee los logs si hay errores

Si algo falla:
- Simplemente haz push a GitHub (redeploy automático)
- O click "Redeploy" en Vercel dashboard

---

## 🎓 TIPS PARA DESARROLLADORES NOVATOS

### Git - Cómo Hacer Cambios

Cuando quieras hacer cambios en el código:

```powershell
# 1. Abre Terminal en tu proyecto
cd c:\Users\Gabri\wealth-tracker\wealth-tracker

# 2. Haz cambios en archivos (edita en VS Code)

# 3. Prepara los cambios
git add .

# 4. Crea un "snapshot" de tus cambios
git commit -m "feat: description of what you changed"

# 5. Envía a GitHub
git push

# 6. Vercel automáticamente redeploy (espera 2-3 min)
```

### Environment Variables - Recuerda

- **NUNCA** guardes secretos en el código
- **NUNCA** hagas commit de `.env.local`
- **SIEMPRE** usa variables de entorno en Vercel

### Debugging - Cómo Ver Errores

1. **Local** (en tu computadora):
   ```powershell
   npm run dev
   # Abre http://localhost:3000
   # Abre Console del navegador (F12)
   ```

2. **Vercel** (en producción):
   - Ve a Vercel Dashboard
   - Click en tu proyecto
   - Click en "Deployments"
   - Click en el deployment
   - Tab "Logs"

---

## ✨ ¡FELICIDADES!

Acabas de:
- 🌍 Crear infrastructure en la nube (MongoDB Atlas)
- 🚀 Desplegar una aplicación web (Vercel)
- 🔐 Configurar autenticación real
- 📊 Conectar base de datos a producción
- ✅ Tener una aplicación live en internet

**¡Eso es un logro enorme para alguien empezando con devops!** 🎉

---

**Dudas o Problemas?** Consulta [VERIFICATION_REPORT.md](./VERIFICATION_REPORT.md) para más detalles técnicos.
