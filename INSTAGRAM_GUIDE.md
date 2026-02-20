Análisis y guía rápida para Instagram — reve_stidas

Nota: Instagram impide extraer contenido sin iniciar sesión desde la web pública. Sin embargo, con la imagen de portada (`assets/reve.jpg`) y el estilo del proyecto, propongo las siguientes mejoras, copys y pasos técnicos.

1) Bio sugerida (máxima claridad, emojis mínimos):
"Revestidas — moda circular ✨
Silvi & Lau • Prendas de marcas top
Inspección manual • Envíos rápidos • Pago seguro
📩 Pedidos: hola@silvylau.example"

2) CTA destacada (link en bio):
- Enlace a la landing principal (tu `index.html`) o a un enlace de Linktree.
- Texto breve: "Tienda & Novedades →"

3) Hashtags recomendados (rotar 6-10 por post):
- #ModaCircular #Revestidas #SecondHandFashion #SustainableStyle #RopaDeMarca #SegundaMano #ModaResponsable #VintageFinds #SlowFashion

4) Ejemplos de captions cortos (usar 1-2 líneas + CTA):
- "Vestido ZARA en perfecto estado ✨ Talle M. Link en bio para comprar. #ModaCircular"
- "Selección semanal: 5 prendas nuevas. ¿Cuál querés ver primero? Comenta abajo 👇"

5) Destacados (Instagram Highlights) recomendados:
- "Novedades": fotos de las últimas piezas
- "Cómo Comprar": pasos rápidos y políticas
- "Envíos": tiempos y tracking
- "Opiniones": testimonios cortos

6) Integración técnica — Mailchimp
- En Mailchimp, crear una Audience > Signup forms > Embedded forms.
- Copiar el `form action` y reemplazar `MAILCHIMP_FORM_ACTION_URL` en `index.html`.
- Asegurarse de incluir el input `name="EMAIL"` (ya presente).

7) Integración técnica — WhatsApp
- Reemplazar `549XXXXXXXXX` en el enlace `https://api.whatsapp.com/send?phone=549XXXXXXXXX&text=...` por el número real (formato internacional, sin +).
- El botón abre WhatsApp Web / app con mensaje predefinido.

8) Imágenes reales y optimización (macOS):
- Guardar fotos en `assets/` con nombres descriptivos (p.ej. `vestido_zara.jpg`).
- Generar tamaños optimizados con `sips` o `imagemagick`.
  Ejemplo (macOS `sips`):

```bash
mkdir -p assets/optimized
sips -Z 1200 assets/reve.jpg --out assets/optimized/reve-1200.jpg
sips -Z 800 assets/reve.jpg --out assets/optimized/reve-800.jpg
sips -Z 400 assets/reve.jpg --out assets/optimized/reve-400.jpg
```
- En `index.html` usar `srcset` y `loading="lazy"` para mejorar carga.

9) Extracción de imagen de portada desde Instagram (si necesitás la original):
- Desde la app/PC: abrir post > compartir > copiar enlace > pegar en navegador o descargar desde la app.
- Alternativa: usar la función "Guardar" o pedir a quien administra el IG que comparta el archivo original.

10) Siguiente pasos que puedo hacer por vos:
- Reemplazar las imágenes de muestra por las fotos reales que subas a `assets/`.
- Configurar el `form action` con la URL real de Mailchimp si me la pasás.
- Poner el número real en el botón de WhatsApp.
- Generar las versiones optimizadas de cada imagen localmente (necesito los archivos originales).

Si querés, realizo cualquiera de los pasos técnicos ahora: pegar el action de Mailchimp, el número de WhatsApp o subir las fotos y las optimizo.
