# ⚡ Quick Start Guide

## 🎯 Para Empezar Rápido

### Opción 1: Desarrollo Local

```bash
# 1. Entra a la carpeta
cd voleibol-game

# 2. Instala dependencias (primera vez solamente)
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

### Opción 2: Deploy a GitHub Pages

```bash
# 1. Edita vite.config.ts y cambia el 'base' al nombre de tu repo

# 2. Crea repo en GitHub y ejecuta:
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main

# 3. Deploy
npm run deploy

# 4. Activa GitHub Pages en Settings → Pages → Source: gh-pages
```

---

## 📋 Checklist de Deployment

- [ ] Node.js instalado
- [ ] `npm install` ejecutado exitosamente
- [ ] `npm run dev` funciona localmente
- [ ] Repositorio creado en GitHub
- [ ] `vite.config.ts` actualizado con el nombre correcto del repo
- [ ] Código subido a GitHub (`git push`)
- [ ] `npm run deploy` ejecutado
- [ ] GitHub Pages activado en Settings
- [ ] ✅ Juego disponible en `https://usuario.github.io/repo/`

---

## 🔧 Comandos Importantes

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala todas las dependencias |
| `npm run dev` | Servidor de desarrollo (localhost:5173) |
| `npm run build` | Crea build de producción |
| `npm run preview` | Preview del build localmente |
| `npm run deploy` | Despliega a GitHub Pages |

---

## 📝 Cambiar Nombre del Repo

Si tu repositorio **NO** se llama `voleibol-game`, debes cambiar esta línea en `vite.config.ts`:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/TU-NOMBRE-DE-REPO/',  // ← Cambia esto
})
```

---

## 🆘 Ayuda Rápida

**No tengo Node.js:**
- Descarga desde [nodejs.org](https://nodejs.org)

**La página sale en blanco:**
- Verifica el `base` en `vite.config.ts`
- Asegúrate de que GitHub Pages use la rama `gh-pages`

**No puedo hacer git push:**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

**Quiero actualizar el juego:**
```bash
git add .
git commit -m "Actualización"
git push
npm run deploy
```

---

## 📚 Más Información

- `README.md` - Documentación completa del proyecto
- `DEPLOYMENT.md` - Guía detallada de deployment paso a paso

---

**¡Listo para jugar en 5 minutos!** 🏐
