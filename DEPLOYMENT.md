# 🚀 Guía de Deployment

## Pasos para Subir el Juego a GitHub Pages

### 1. Instalar Node.js (si no lo tienes)
1. Ve a [nodejs.org](https://nodejs.org)
2. Descarga la versión LTS
3. Instala siguiendo el asistente
4. Verifica la instalación abriendo una terminal:
   ```bash
   node --version
   npm --version
   ```

### 2. Preparar el Proyecto

#### Abrir terminal en la carpeta del proyecto:
```bash
cd voleibol-game
```

#### Instalar todas las dependencias:
```bash
npm install
```

Esto instalará:
- React y React DOM
- TypeScript
- Vite
- Tailwind CSS
- gh-pages (para deployment)
- Todas las demás dependencias

### 3. Probar Localmente (Opcional pero Recomendado)

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173` para probar el juego.
Presiona `Ctrl+C` en la terminal para detener el servidor.

### 4. Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Inicia sesión
3. Click en el botón "+" arriba a la derecha → "New repository"
4. Nombre: `voleibol-game` (o el que prefieras)
5. Descripción: "Juego de voleibol hecho con React"
6. Deja en público (Public)
7. **NO marques** "Add a README file"
8. Click en "Create repository"

### 5. Configurar el Base Path

**IMPORTANTE**: Edita el archivo `vite.config.ts` y cambia la línea:

```typescript
base: '/voleibol-game/',
```

Por el nombre de tu repositorio. Por ejemplo, si tu repo se llama `mi-juego`:
```typescript
base: '/mi-juego/',
```

### 6. Conectar tu Proyecto con GitHub

En la terminal, ejecuta estos comandos **uno por uno**:

```bash
# Asegúrate de estar en la carpeta voleibol-game
cd voleibol-game

# Agrega todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit: Voleibol Game"

# Asegúrate de que la rama principal se llame main
git branch -M main

# Conecta con tu repositorio de GitHub (CAMBIA tu-usuario y tu-repo)
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Sube el código
git push -u origin main
```

**Reemplaza `tu-usuario` y `tu-repo`** con tu usuario de GitHub y el nombre de tu repositorio.

### 7. Hacer el Deploy a GitHub Pages

```bash
npm run deploy
```

Este comando:
1. Construye el proyecto optimizado
2. Crea una rama `gh-pages`
3. Sube el build a esa rama

### 8. Configurar GitHub Pages en el Repositorio

1. Ve a tu repositorio en GitHub
2. Click en "Settings" (arriba)
3. En el menú izquierdo, click en "Pages"
4. En "Source", selecciona la rama `gh-pages`
5. Deja la carpeta como `/ (root)`
6. Click en "Save"

### 9. ¡Listo! 🎉

Tu juego estará disponible en:
```
https://tu-usuario.github.io/tu-repo/
```

Por ejemplo: `https://juanperez.github.io/voleibol-game/`

**Nota**: Puede tomar 1-2 minutos en aparecer la primera vez.

---

## Comandos Útiles

### Desarrollo local
```bash
npm run dev          # Inicia el servidor de desarrollo
```

### Build
```bash
npm run build        # Crea el build de producción
npm run preview      # Preview del build localmente
```

### Deployment
```bash
npm run deploy       # Despliega a GitHub Pages
```

### Git
```bash
git status           # Ver el estado de los archivos
git add .            # Agregar todos los cambios
git commit -m "msg"  # Crear un commit
git push             # Subir cambios a GitHub
```

---

## Actualizar el Juego Después

Si haces cambios al juego y quieres actualizarlo en GitHub Pages:

```bash
# 1. Guarda los cambios
git add .
git commit -m "Descripción de los cambios"
git push

# 2. Despliega la nueva versión
npm run deploy
```

---

## Solución de Problemas Comunes

### Error: "npm: command not found"
- Necesitas instalar Node.js primero

### Error: "gh-pages not found"
```bash
npm install gh-pages --save-dev
```

### La página muestra en blanco
- Verifica que el `base` en `vite.config.ts` coincida con el nombre de tu repositorio
- Asegúrate de que en GitHub Pages esté configurado para usar la rama `gh-pages`

### Error de permisos en Git
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@example.com"
```

---

## Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de React](https://react.dev/)
- [GitHub Pages Docs](https://pages.github.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
