# Bold React Dashboard

Una aplicación web moderna para la gestión y visualización de transacciones financieras, construida con React y TypeScript.

## 🚀 Demo

[Ver en vivo](https://pabl10.github.io/bold-react)

## 📋 Características

- **Dashboard interactivo** con métricas de ventas y transacciones
- **Tabla virtualizada** para manejar grandes volúmenes de datos
- **Filtros avanzados** por fecha, método de pago y estado
- **Búsqueda en tiempo real** de transacciones
- **Modal de detalles** para información completa de transacciones
- **Diseño responsive** optimizado para todos los dispositivos
- **Tema moderno** con animaciones suaves

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca de interfaz de usuario
- **TypeScript 5.9.3** - Tipado estático para JavaScript
- **Vite 7.1.10** - Herramienta de build y desarrollo
- **Sass 1.93.2** - Preprocesador CSS

### Estado y Datos
- **Zustand 5.0.8** - Gestión de estado ligera y eficiente
- **@tanstack/react-virtual 3.13.12** - Virtualización para rendimiento

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **GitHub Actions** - CI/CD y deployment automático
- **GitHub Pages** - Hosting estático

## 🏗️ Arquitectura del Proyecto

```
src/
├── features/
│   ├── shared/           # Componentes y utilidades compartidas
│   │   ├── components/   # Header, hooks comunes
│   │   ├── hooks/        # useClickOutside
│   │   └── styles/       # Variables, mixins, animaciones
│   └── transactions/     # Módulo de transacciones
│       ├── components/   # Dashboard, tabla, filtros, modal
│       ├── hooks/        # useTransactions
│       ├── services/     # API calls
│       ├── store/        # Estado global con Zustand
│       ├── types/        # Definiciones TypeScript
│       └── utils/        # Formatters y filtros
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 20.19+ o 22.12+
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Pabl10/bold-react.git
cd bold-react
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Build para producción**
```bash
npm run build
```

5. **Preview del build**
```bash
npm run preview
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 🎨 Características Técnicas

### Virtualización
- Implementación de tabla virtualizada para manejar miles de transacciones
- Renderizado eficiente solo de elementos visibles
- Scroll suave y responsivo

### Estado Global
- Gestión de estado con Zustand para filtros y configuración
- Persistencia de preferencias del usuario
- Estado reactivo y optimizado

### Estilos
- Arquitectura SCSS modular
- Variables CSS para consistencia
- Mixins reutilizables
- Animaciones CSS personalizadas

### Accesibilidad
- Roles ARIA para lectores de pantalla
- Navegación por teclado
- Contraste de colores optimizado

## 🔧 Configuración

### Variables de Entorno
El proyecto está configurado para funcionar sin variables de entorno adicionales. Los datos de transacciones se simulan localmente.

### GitHub Pages
- Configurado para deploy automático en cada push a `main`
- Build optimizado para hosting estático
- Base path configurado para subdirectorio

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Pabl10**
- GitHub: [@Pabl10](https://github.com/Pabl10)

## 🙏 Agradecimientos

- [Vite](https://vitejs.dev/) por la excelente herramienta de build
- [React](https://reactjs.org/) por el framework de UI
- [Zustand](https://github.com/pmndrs/zustand) por la gestión de estado
- [TanStack Virtual](https://tanstack.com/virtual) por la virtualización