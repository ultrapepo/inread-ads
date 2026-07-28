# Informe de sincronización configPro

Referencia: `configPro/default_ES_mobile.json`

Fecha: 2026-07-28

Baseline PIP protegida: sí

## Inventario y resultado general

Se localizaron 12 configuraciones GAMExp reales. No se encontraron schemas,
fixtures, backups, snapshots ni JSON de test dentro de `configPro/**/*.json`.
En las doce se añadió exclusivamente `intextSites.default.general.video.pip`,
con los defaults de fase 1 y `enabled: false`.

| Archivo | Cohorte 30 % | Randoms | Loading experiments | Fallback | PNC | PIP config | Particularidades | Resultado |
| ------- | -----------: | ------: | ------------------: | -------: | --: | ---------: | ---------------: | --------- |
| `configPro/default_ES_desktop.json` | Sí, 3 sites | 5–10 | 5/6 + default | Preservado | Desktop | Presente/off | Sin Marca | PIP añadido |
| `configPro/default_ES_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Referencia | Mobile | Presente/off | Canónica | PIP añadido |
| `configPro/default_ES_mundo_desktop.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Desktop | Presente/off | Exclusión premium | PIP añadido |
| `configPro/default_ES_mundo_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Mobile | Presente/off | Exclusión premium | PIP añadido |
| `configPro/default_expansion_ES.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Propio | Presente/off | Aliases propios | PIP añadido |
| `configPro/default_LATAM.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | LATAM | Presente/off | Estructura LATAM | PIP añadido |
| `configPro/pro/default_ES_desktop.json` | Sí, 3 sites | 5–10 | 5/6 + default | Preservado | Desktop | Presente/off | Sin Marca | PIP añadido |
| `configPro/pro/default_ES_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Mobile | Presente/off | Réplica pro | PIP añadido |
| `configPro/pro/default_ES_mundo_desktop.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Desktop | Presente/off | Premium/reload IDs | PIP añadido |
| `configPro/pro/default_ES_mundo_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Mobile | Presente/off | Premium/reload IDs | PIP añadido |
| `configPro/pro/default_expansion_ES.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Propio | Presente/off | Aliases propios | PIP añadido |
| `configPro/pro/default_LATAM.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | LATAM | Presente/off | Estructura LATAM | PIP añadido |

## Mejora común aplicada

- Ruta añadida en todos los archivos:
  `intextSites.default.general.video.pip`.
- El bloque contiene `mode: "floating"`, desktop permitido, móvil desactivado,
  tamaño 360/280, ratios 0.05/0.35, posición inferior derecha, `zIndex:
  100000`, requisitos de primer frame/reveal y cierre por ciclo.
- `enabled` permanece en `false` en los 12 archivos.
- No se añadieron overrides PIP de producción.
- Se conservaron la cohorte exacta `["5", "6", "7", "8", "9", "10"]`,
  randoms, loading experiments, fallback, PNC, vídeo y perfiles particulares.

## Detalle por archivo

### `configPro/default_ES_desktop.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado, para
  materializar los defaults comunes.
- Preservado: dominios e inclusions sin Marca, vídeo desktop, exclusiones,
  refresh y PNC.
- No aplicable: no se añade ningún override activo.

### `configPro/default_ES_mobile.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: referencia canónica, cohorte, perfiles de vídeo, mobile y PNC.
- No aplicable: no se habilita PIP móvil ni global.

### `configPro/default_ES_mundo_desktop.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: exclusión premium, aliases Prebid, vídeo desktop, refresh y PNC.
- No aplicable: no se copian aliases ni overrides de otra red.

### `configPro/default_ES_mundo_mobile.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: exclusión premium, aliases Prebid, vídeo mobile, refresh y PNC.
- No aplicable: no se habilita PIP móvil ni se copian overrides.

### `configPro/default_expansion_ES.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: aliases, vídeo Expansion, refresh y PNC propios.
- No aplicable: no se inventan equivalencias de slots.

### `configPro/default_LATAM.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: `name`, forma propia de `refreshCycle`, vídeo LATAM y PNC.
- No aplicable: no se copian `ext` ni `config_version` de ES.

### `configPro/pro/default_ES_desktop.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: dominios e inclusions sin Marca, vídeo pro desktop y PNC.
- No aplicable: no se añade override activo.

### `configPro/pro/default_ES_mobile.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: réplica pro, cohorte, vídeo mobile y PNC.
- No aplicable: no se habilita PIP móvil ni global.

### `configPro/pro/default_ES_mundo_desktop.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: `reloadLineItemIds`, exclusión premium, vídeo pro desktop y PNC.
- No aplicable: no se copian aliases ni overrides externos.

### `configPro/pro/default_ES_mundo_mobile.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: `reloadLineItemIds`, exclusión premium, vídeo pro mobile y PNC.
- No aplicable: no se habilita PIP móvil.

### `configPro/pro/default_expansion_ES.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: aliases, vídeo pro Expansion, refresh y PNC.
- No aplicable: no se inventan equivalencias de slots.

### `configPro/pro/default_LATAM.json`

- Añadido: `intextSites.default.general.video.pip`, desactivado.
- Preservado: `name`, `refreshCycle`, vídeo pro LATAM y PNC.
- No aplicable: no se copian propiedades exclusivas de ES.

## PIP y overrides

Los doce archivos contienen el mismo bloque base desactivado. No existía un
override PIP particular en los JSON y no se añadió ninguno. El snippet de
activación selectiva para QA o una futura decisión de producto se documenta,
sin aplicarlo, en `docs/intext-pip-phase1-validation.md`.

## Excepciones justificadas

- Los dos `default_ES_desktop.json` siguen sin `marca.com`, de acuerdo con sus
  dominios permitidos.
- Las exclusiones premium y `reloadLineItemIds` de Mundo permanecen intactos.
- Los aliases, rutas publicitarias, network IDs, selectores DOM, tamaños,
  estilos, timeouts, perfiles de vídeo, refresh y PNC no se sincronizaron
  indiscriminadamente.
