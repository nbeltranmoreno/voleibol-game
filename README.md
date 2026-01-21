# 🏐 Voleibol Game

Un juego de voleibol estilo Scratch desarrollado con React + TypeScript + Vite.

![Voleibol Game](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## 🎮 Características

- **3 Modos de Juego:**
  - 📖 **Modo Historia**: 10 niveles progresivos con dificultad creciente
  - 🤖 **1 Jugador vs CPU**: Elige entre 10 niveles de dificultad
  - 👥 **2 Jugadores**: Modo local multijugador

- **Mecánicas de Juego:**
  - Saltar y movimiento fluido
  - Habilidad especial con cooldown
  - Mecánica de tirarse/deslizarse
  - Física realista de la pelota
  - Colisión con red y detección de golpes

- **10 Niveles de Dificultad CPU:**
  - Novato → Aprendiz → Junior → Intermedio → Avanzado → Experto → Maestro → Campeón → Leyenda → JEFE FINAL

## 🎯 Controles

### Jugador 1 (Rojo)
- **W**: Saltar
- **A/D**: Moverse izquierda/derecha
- **E**: Habilidad especial
- **Q**: Tirarse

### Jugador 2 (Azul) - Solo en modo 2 jugadores
- **↑**: Saltar
- **←/→**: Moverse izquierda/derecha
- **-**: Habilidad especial
- **,**: Tirarse

### Otros
- **ESC**: Pausar/Reanudar

## 🚀 Instalación y Desarrollo

### Prerequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalar Dependencias
```bash
npm install
```

### Ejecutar en Modo Desarrollo
```bash
npm run dev
```
El juego estará disponible en `http://localhost:5173`

### Construir para Producción
```bash
npm run build
```

### Preview del Build
```bash
npm run preview
```

## 📦 Deployment en GitHub Pages

### Paso 1: Configurar el Repositorio
1. Crea un repositorio en GitHub (ejemplo: `voleibol-game`)
2. Actualiza el campo `base` en `vite.config.ts` con el nombre de tu repositorio:
   ```typescript
   base: '/nombre-de-tu-repositorio/',
   ```

### Paso 2: Subir el Código
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/voleibol-game.git
git push -u origin main
```

### Paso 3: Desplegar a GitHub Pages
```bash
npm run deploy
```

Tu juego estará disponible en: `https://tu-usuario.github.io/voleibol-game/`

## 📁 Estructura del Proyecto

```
voleibol-game/
├── src/
│   ├── components/          # Componentes React
│   │   ├── MainMenu.tsx     # Menú principal
│   │   ├── Game.tsx         # Componente principal del juego
│   │   ├── GameField.tsx    # Campo de juego
│   │   ├── Player.tsx       # Renderizado de jugadores
│   │   ├── Ball.tsx         # Pelota
│   │   ├── Effects.tsx      # Efectos visuales
│   │   ├── GameOverlay.tsx  # Overlays (pausa, victoria, etc)
│   │   ├── LevelScreen.tsx  # Pantalla de nivel
│   │   └── CPUSelect.tsx    # Selector de dificultad
│   ├── hooks/               # Custom hooks
│   │   └── useGameLoop.ts   # Lógica del game loop
│   ├── types/               # Definiciones TypeScript
│   │   └── index.ts
│   ├── constants/           # Constantes del juego
│   │   └── gameConstants.ts
│   ├── utils/               # Utilidades
│   │   └── gameUtils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Tecnologías Utilizadas

- **React 18.2** - Framework de UI
- **TypeScript 5.2** - Tipado estático
- **Vite 5.0** - Build tool y dev server
- **Tailwind CSS 3.4** - Estilos
- **gh-pages** - Deployment a GitHub Pages

## 🎨 Características Técnicas

- ⚡ Renderizado a 60 FPS
- 🎯 Física personalizada para la pelota
- 🤖 IA adaptativa con 10 niveles de dificultad
- 💾 Guardado de progreso en modo historia (LocalStorage)
- 🎮 Sistema de input responsive
- ✨ Efectos visuales y animaciones

## 📝 Reglas del Juego

1. Primero a **5 puntos** gana
2. La pelota debe pasar por encima de la red
3. Si la pelota toca el suelo en tu lado, el oponente anota
4. Usa las habilidades especiales estratégicamente (tienen cooldown)
5. La mecánica de tirarse te permite alcanzar pelotas bajas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Creado con ❤️ usando React + TypeScript + Vite

---

¡Disfruta jugando! 🏐
