# 📁 Estructura del Proyecto

```
voleibol-game/
│
├── 📄 Archivos de Configuración
│   ├── package.json           # Dependencias y scripts
│   ├── vite.config.ts         # Configuración de Vite
│   ├── tsconfig.json          # Configuración de TypeScript
│   ├── tsconfig.node.json     # TypeScript para Vite
│   ├── tailwind.config.js     # Configuración de Tailwind
│   ├── postcss.config.js      # PostCSS config
│   └── .gitignore             # Archivos ignorados por Git
│
├── 📚 Documentación
│   ├── README.md              # Documentación principal
│   ├── DEPLOYMENT.md          # Guía de deployment paso a paso
│   ├── QUICK_START.md         # Inicio rápido
│   └── PROJECT_STRUCTURE.md   # Este archivo
│
├── 🌐 Archivos Web
│   └── index.html             # HTML principal
│
├── 📦 src/ - Código Fuente
│   │
│   ├── 🎨 Componentes (components/)
│   │   ├── Game.tsx           # Componente principal con toda la lógica de estado
│   │   ├── MainMenu.tsx       # Menú principal del juego
│   │   ├── GameField.tsx      # Campo de juego con todos los elementos
│   │   ├── Player.tsx         # Renderizado SVG de los jugadores
│   │   ├── Ball.tsx           # Pelota del juego
│   │   ├── Effects.tsx        # Efectos visuales (explosiones, polvo)
│   │   ├── GameOverlay.tsx    # Overlays (pausa, victoria, instrucciones)
│   │   ├── LevelScreen.tsx    # Pantalla de presentación de nivel
│   │   └── CPUSelect.tsx      # Selector de dificultad CPU
│   │
│   ├── 🪝 Hooks Personalizados (hooks/)
│   │   └── useGameLoop.ts     # Hook con toda la lógica del game loop
│   │
│   ├── 📐 Tipos (types/)
│   │   └── index.ts           # Definiciones TypeScript (Ball, Player, etc)
│   │
│   ├── 🎯 Constantes (constants/)
│   │   └── gameConstants.ts   # Constantes del juego (tamaños, velocidades, etc)
│   │
│   ├── 🛠️ Utilidades (utils/)
│   │   └── gameUtils.ts       # Funciones helper (getCPUDifficulty)
│   │
│   ├── 🎨 Estilos
│   │   └── index.css          # Estilos globales + Tailwind
│   │
│   ├── 🚀 Entrada
│   │   ├── App.tsx            # Componente raíz
│   │   ├── main.tsx           # Punto de entrada de React
│   │   └── vite-env.d.ts      # Types de Vite
│   │
│   └── 📁 public/             # Archivos estáticos (vacío por ahora)
│
└── 🌳 .git/                   # Repositorio Git (oculto)
```

## 🔍 Descripción de Carpetas

### `/src/components/`
Todos los componentes React del juego. Cada componente tiene una responsabilidad específica:
- **Game.tsx**: Orquesta todo el juego, maneja el estado global
- **GameField.tsx**: Renderiza el campo, jugadores y pelota
- **MainMenu.tsx**: Pantalla inicial con opciones de juego

### `/src/hooks/`
Custom hooks de React:
- **useGameLoop.ts**: Contiene toda la lógica del game loop (física, colisiones, IA)

### `/src/types/`
Definiciones de TypeScript para type safety

### `/src/constants/`
Valores constantes usados en todo el juego

### `/src/utils/`
Funciones helper y utilidades

## 📊 Flujo de Componentes

```
App
  └── Game
      ├── MainMenu (si no hay gameMode)
      ├── CPUSelect (si gameMode === '1player' && showCpuSelect)
      ├── LevelScreen (si gameMode === 'story' && showLevelScreen)
      └── GameField (durante el juego)
          ├── Player (×2)
          ├── Ball
          ├── Effects
          └── GameOverlay
```

## 🔄 Flujo de Datos

```
Game (estado principal)
  ↓
useGameLoop (lógica del juego)
  ↓
setters de estado (actualizan Game)
  ↓
GameField (renderiza el estado)
  ↓
Componentes visuales (Player, Ball, etc)
```

## 📦 Archivos Generados (no en Git)

Estos archivos se crean automáticamente y están en `.gitignore`:
- `node_modules/` - Dependencias npm
- `dist/` - Build de producción
- `.git/` - Control de versiones

## 🎯 Puntos Clave de Arquitectura

1. **Separación de Responsabilidades**: Cada componente tiene un propósito único
2. **Custom Hook para Lógica**: `useGameLoop` separa la lógica del juego de la UI
3. **TypeScript**: Type safety en todo el proyecto
4. **Componentes Pequeños**: Fáciles de mantener y testear
5. **Constantes Centralizadas**: Fácil ajustar el gameplay

## 🔧 Para Modificar

- **Cambiar velocidad del juego**: Edita `gameConstants.ts`
- **Ajustar dificultad CPU**: Modifica `gameUtils.ts`
- **Cambiar apariencia**: Edita componentes en `components/`
- **Nueva mecánica**: Actualiza `useGameLoop.ts`
