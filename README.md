# Reformas HZ — web

Web de Reformas HZ (reformas, albañilería y pintura en Madrid y Guadalajara).
TanStack Start + React + Tailwind CSS v4. Se publica como HTML estático en GitHub Pages
(`.github/workflows/deploy.yml`, dominio `reformashz.com`).

## Ver la web en local

```sh
npm install
npm run dev        # http://localhost:8080
```

Comprobar la versión de producción (HTML estático en `dist/client`):

```sh
npm run build
python -m http.server 4173 -d dist/client   # http://localhost:4173
```

## Dónde se cambia cada cosa

| Qué                                   | Archivo                         |
| ------------------------------------- | ------------------------------- |
| Teléfono, correo, zona, datos legales | `src/content/site.ts`           |
| Servicios (tarjetas y páginas `/servicios/<id>`) | `src/content/services.ts` |
| Ilustraciones animadas de servicios   | `src/components/site/ServiceScene.tsx` |
| Proyectos y fotos                     | `src/content/projects.ts`       |
| Preguntas frecuentes                  | `src/content/faq.ts`            |
| Pasos del método y compromisos        | `src/content/process.ts`        |
| Textos de interfaz (ES / EN)          | `src/lib/i18n.tsx`              |
| Colores, tipografía, botones          | `src/styles.css` (tokens `:root`) |
| Formulario (Formspree)                | `src/lib/contact.ts`            |

### Añadir un proyecto

1. Copiar las fotos a `public/assets/` en `.webp` (ancho ~1448 px) y una copia reducida
   con el mismo nombre terminado en `-sm.webp` (~720 px).
2. Añadir un bloque en `src/content/projects.ts` (hay instrucciones al principio del archivo).

### Páginas nuevas

Las rutas están en `src/routes/`. Cada página nueva (también cada servicio nuevo, `/servicios/<id>`) debe añadirse a la lista de
prerenderizado de `vite.config.ts` y a `public/sitemap.xml`.

## Privacidad

La web no usa cookies, analítica ni recursos de terceros al cargar (tipografía alojada en
la propia web). Si se añade analítica, mapas o vídeos incrustados, habrá que implantar
antes un sistema de consentimiento y actualizar `src/routes/cookies.tsx` y
`src/routes/privacidad.tsx`.
