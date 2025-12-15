# Mi Portfolio Personal

[![Deploy Status](https://img.shields.io/badge/Deploy-Ready-brightgreen)](https://ayusox.github.io/portfolio/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.14-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-cyan)](https://tailwindcss.com/)

Hola! Soy Mario Jurado Ayuso, desarrollador frontend de Córdoba. Este es mi portfolio personal donde muestro mis proyectos y habilidades.

## Lo que encontrarás aquí

He construido este portfolio desde cero usando React y Tailwind CSS. La idea era crear algo que realmente me representara como desarrollador, así que incluí un terminal interactivo en la página principal y un diseño que mezcla lo profesional con lo personal.

**Algunas cosas que me gustan del resultado:**
- El terminal que simula código escribiéndose en tiempo real
- Sistema bilingüe completo (español/inglés) porque trabajo con clientes internacionales
- Integración con la API de GitHub para mostrar mis stats reales
- Un generador de CV que crea PDFs automáticamente
- Carrusel infinito de tecnologías que uso

**En el lado técnico:**
- Bundle final de solo 143KB (comprimido) - me obsesioné un poco con la optimización
- SEO completo porque quiero que me encuentren en Google
- Accesible para lectores de pantalla y navegación por teclado
- Funciona perfecto en móviles (mobile-first approach)

## Cómo está organizado

Intenté mantener el código lo más limpio posible. Aquí está la estructura:

```
src/
├── components/           # Todos los componentes React
│   ├── ui/              # Botones, inputs, etc. reutilizables
│   ├── Hero.jsx         # La sección principal con el terminal
│   ├── Header.jsx       # Navegación (con hamburger menu en móvil)
│   ├── About.jsx        # Mi info + stats de GitHub
│   ├── Skills.jsx       # Mis habilidades con barras animadas
│   ├── Projects.jsx     # Mi metodología de trabajo
│   ├── WebServices.jsx  # Servicios que ofrezco + proyecto SnackGo
│   └── Contact.jsx      # Formulario + carrusel de tecnologías
├── contexts/            
│   └── LanguageContext.jsx  # Para cambiar entre español/inglés
├── hooks/               
│   └── useGitHubStats.js    # Para obtener mis datos de GitHub
├── utils/               
│   └── cvGenerator.js       # Genera el PDF de mi CV
└── assets/              
    ├── technologies/    # Iconos SVG de las tecnologías
    └── cv/             # Mi foto de perfil
```

## Stack tecnológico

**Lo principal:**
- **React 18** - Mi framework favorito para frontend
- **Vite** - Mucho más rápido que Create React App
- **Tailwind CSS** - Para estilos rápidos y consistentes
- **Framer Motion** - Para las animaciones suaves

**Para la UI:**
- **Radix UI** - Componentes accesibles out-of-the-box
- **Lucide React** - Iconos bonitos y ligeros

**Funcionalidades específicas:**
- **jsPDF** - Para generar el CV en PDF
- **FormSubmit.co** - Para el formulario de contacto (sin backend)
- **GitHub API** - Para mostrar mis stats reales

**Build y optimización:**
- **Terser** - Para comprimir el JavaScript
- **PostCSS + Autoprefixer** - Para compatibilidad CSS



**Comandos útiles:**
- `npm run dev` - Desarrollo con hot reload
- `npm run build` - Build para producción
- `npm run preview` - Ver el build localmente

## Las secciones

**Hero** - Lo primero que ves es un terminal simulado que "escribe" información sobre mí. Me gustó la idea porque refleja mi lado más técnico.

**Sobre mí** - Información personal y mis stats de GitHub en tiempo real (repos, commits estimados, lenguajes principales).

**Educación** - Mi formación: desde SMR hasta el máster en ciberseguridad que estoy cursando.

**Habilidades** - Barras de progreso animadas organizadas por categorías. Intenté ser honesto con los porcentajes.

**Mi metodología** - Explico cómo trabajo en mis proyectos, desde la idea inicial hasta el lanzamiento.

**Servicios web** - Aquí muestro mi proyecto SnackGo (una web para un local de comida) dentro de un mockup de navegador.

**Contacto** - Formulario funcional y un carrusel infinito con todas las tecnologías que manejo.

## Bilingüe

Todo el portfolio está en español e inglés. Hay un botón flotante abajo a la derecha con las banderas para cambiar. Traduje cada texto manualmente porque los traductores automáticos no captan el tono que quería.

## Performance

Me obsesioné un poco con que cargara rápido:

- Bundle final: 143KB comprimido (empezó siendo 455KB)
- CSS: 9KB comprimido
- Lazy loading en imágenes
- Code splitting para cargar solo lo necesario
- Usé SVGs locales en lugar de CDNs externos

Los Core Web Vitals están en verde, que era mi objetivo.

## SEO y accesibilidad

**SEO:** Meta tags completos, Open Graph para redes sociales, structured data para que Google me entienda mejor, sitemap, robots.txt... lo típico.

**Accesibilidad:** Skip links, ARIA labels, alt text en imágenes, buen contraste de colores. También respeta la preferencia de "reduced motion" del sistema operativo.

## Seguridad

No hay datos sensibles expuestos, todos los enlaces externos tienen `rel="noopener noreferrer"`, no uso cookies de tracking, y las dependencias están auditadas. Lo básico pero bien hecho.

## Compatibilidad

Funciona en Chrome, Firefox, Safari y Edge modernos. Diseñé mobile-first, así que se ve bien desde móviles pequeños hasta pantallas 4K.

## Deployment

Está hosteado en GitHub Pages. Para deployar:

```bash
npm run build
# Subir el contenido de /dist a la rama gh-pages
```

No necesita variables de entorno ni configuración especial.

## Detalles técnicos interesantes

**GitHub API:** Conecto con la API de GitHub para mostrar mis stats reales (repos, commits estimados, lenguajes principales). Si falla la API, tengo datos de fallback para que no se rompa nada.

**Generador de CV:** Hice un generador que crea PDFs de mi currículum automáticamente usando jsPDF. Incluye mi foto de perfil y toda la info actualizada.

**Carrusel infinito:** El carrusel de tecnologías usa animaciones CSS puras para un scroll infinito súper suave sin JavaScript pesado.


Desarrollado por Mario Jurado Ayuso - Desarrollador Frontend & Ciberseguridad
