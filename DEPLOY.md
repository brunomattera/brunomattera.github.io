# Deploy to GitHub Pages

## Paso 1 — Agregar tu foto
Guardá tu foto profesional como:
```
portfolio/images/bruno.jpg
```

## Paso 2 — Subir a GitHub
1. Creá un repositorio nuevo en github.com (ej: `portfolio`)
2. Abrí una terminal en la carpeta `portfolio/` y ejecutá:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git push -u origin main
```

## Paso 3 — Activar GitHub Pages
1. En GitHub, entrá a tu repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Guardá — en unos minutos tu sitio está en:
   `https://TU_USUARIO.github.io/portfolio`

## Paso 4 — Actualizar links sociales
En `index.html` y en cada página de proyecto, actualizá:
- `https://www.behance.net/brunomattera` → tu URL real de Behance
- `https://linkedin.com/in/brunomattera` → tu URL real de LinkedIn

## Estructura de archivos
```
portfolio/
├── index.html              ← Página principal
├── images/
│   └── bruno.jpg           ← Tu foto (agregar manualmente)
├── css/
│   └── style.css           ← Todo el CSS
└── projects/
    ├── flex.html
    ├── abitab.html
    ├── creative-juice.html
    ├── ahead.html
    └── heliflite.html
```
