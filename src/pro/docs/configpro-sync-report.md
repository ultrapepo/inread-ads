# Informe de sincronización configPro

Referencia: `configPro/default_ES_mobile.json`

Fecha: 2026-07-28

Baseline PIP protegida: sí

## Inventario y resultado general

Se localizaron 12 configuraciones GAMExp reales. No se encontraron schemas,
fixtures, backups, snapshots ni JSON de test dentro de `configPro/**/*.json`.
La comparación recursiva confirma que las mejoras comunes solicitadas ya
estaban sincronizadas; por ello no se modificó ningún JSON de producción.

| Archivo | Cohorte 30 % | Randoms | Loading experiments | Fallback | PNC | PIP config | Particularidades | Resultado |
| ------- | -----------: | ------: | ------------------: | -------: | --: | ---------: | ---------------: | --------- |
| `configPro/default_ES_desktop.json` | Sí, 3 sites | 5–10 | 5/6 + default | Preservado | Desktop | Runtime off | Sin Marca | Sin cambios |
| `configPro/default_ES_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Referencia | Mobile | Runtime off | Canónica | Sin cambios |
| `configPro/default_ES_mundo_desktop.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Desktop | Runtime off | Exclusión premium | Sin cambios |
| `configPro/default_ES_mundo_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Mobile | Runtime off | Exclusión premium | Sin cambios |
| `configPro/default_expansion_ES.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Propio | Runtime off | Aliases propios | Sin cambios |
| `configPro/default_LATAM.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | LATAM | Runtime off | Estructura LATAM | Sin cambios |
| `configPro/pro/default_ES_desktop.json` | Sí, 3 sites | 5–10 | 5/6 + default | Preservado | Desktop | Runtime off | Sin Marca | Sin cambios |
| `configPro/pro/default_ES_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Mobile | Runtime off | Réplica pro | Sin cambios |
| `configPro/pro/default_ES_mundo_desktop.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Desktop | Runtime off | Premium/reload IDs | Sin cambios |
| `configPro/pro/default_ES_mundo_mobile.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Mobile | Runtime off | Premium/reload IDs | Sin cambios |
| `configPro/pro/default_expansion_ES.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | Propio | Runtime off | Aliases propios | Sin cambios |
| `configPro/pro/default_LATAM.json` | Sí, 4 sites | 5–10 | 5/6 + default | Preservado | LATAM | Runtime off | Estructura LATAM | Sin cambios |

## Hallazgos comunes

- La cohorte común exacta es `["5", "6", "7", "8", "9", "10"]`: seis
  valores únicos de veinte, equivalentes al 30 %.
- `video.variantSelection.map` contiene los seis valores y los mapea a los
  perfiles existentes `instream`/`outstream`.
- `loadingExperiments` mantiene las variantes explícitas `5` (`test-b`) y `6`
  (`control`). Los valores 7–10 conservan el fallback de loading definido por
  la referencia; no se inventaron variantes ausentes.
- Todos los archivos mantienen los slots normalizados `gexp-intext`,
  `gexp-intext-2`, `gexp-intext-3` y `pnc`.
- Están presentes los bloques comunes `fallbackBlankControl`, `loading`,
  `loadingExperiments`, `decision`, `video`, `display`, `refreshCycle`,
  `slots`, `infiniteScroll`, `telemetry`, `contentTypes`, `networks`, `rules`
  y `dom`.
- Ningún JSON materializa `video.pip` ni overrides PIP. La referencia tampoco
  los contiene. No se añadió una estructura nueva: el default runtime de la
  fase PIP sigue siendo `enabled: false`.
- No se copiaron dominios, ad units, network IDs, selectores, exclusiones,
  tamaños, estilos, timeouts ni bloques PNC entre archivos.

## configPro/default_ES_desktop.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `domainFilter.allowedDomains`: `telva`, `expansion`, `elmundo`.
- `inclusions.sites`: las mismas tres propiedades; Marca queda fuera.
- Configuración desktop, exclusiones, refresh y PNC.

### No aplicable

- `inclusions.sites.marca.com`: no corresponde al dominio permitido.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/default_ES_mobile.json

### Añadido

- Nada.

### Actualizado

- Nada; es la referencia canónica.

### Preservado

- Cohorte 30 %, randoms, loading, fallback, mobile y PNC completos.

### No aplicable

- Sin sincronización contra sí mismo.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/default_ES_mundo_desktop.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `exclusions.keyValues.isPremium = ["1", "true"]`.
- Aliases Prebid, desktop, refresh y PNC propios.

### No aplicable

- Aliases de la referencia no copiados por ser específicos de red.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/default_ES_mundo_mobile.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `exclusions.keyValues.isPremium = ["1", "true"]`.
- Aliases Prebid, mobile, refresh y PNC propios.

### No aplicable

- Aliases de la referencia no copiados por ser específicos de red.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/default_expansion_ES.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- Aliases Prebid, configuración Expansion, refresh y PNC.

### No aplicable

- Aliases de la referencia no copiados por ser específicos de red.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/default_LATAM.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `name`, forma propia de `refreshCycle`, configuración LATAM y PNC.

### No aplicable

- `ext` y `config_version` exclusivos de configuraciones ES.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/pro/default_ES_desktop.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `domainFilter.allowedDomains` e `inclusions.sites` sin Marca.
- Configuración pro desktop, exclusiones, refresh y PNC.

### No aplicable

- `inclusions.sites.marca.com`: no corresponde al dominio permitido.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/pro/default_ES_mobile.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- Réplica pro de cohorte, randoms, loading, mobile y PNC.

### No aplicable

- No faltan mejoras comunes respecto a la referencia.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/pro/default_ES_mundo_desktop.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `reloadLineItemIds`.
- `exclusions.keyValues.isPremium = ["1", "true"]`.
- Aliases Prebid, pro desktop y PNC propios.

### No aplicable

- Aliases de la referencia no copiados por ser específicos de red.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/pro/default_ES_mundo_mobile.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `reloadLineItemIds`.
- `exclusions.keyValues.isPremium = ["1", "true"]`.
- Aliases Prebid, pro mobile y PNC propios.

### No aplicable

- Aliases de la referencia no copiados por ser específicos de red.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/pro/default_expansion_ES.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- Aliases Prebid, configuración pro Expansion, refresh y PNC.

### No aplicable

- Aliases de la referencia no copiados por ser específicos de red.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## configPro/pro/default_LATAM.json

### Añadido

- Nada.

### Actualizado

- Nada.

### Preservado

- `name`, forma propia de `refreshCycle`, configuración pro LATAM y PNC.

### No aplicable

- `ext` y `config_version` exclusivos de configuraciones ES.

### PIP

- `video.pip` ausente; default runtime desactivado; sin overrides.

## Excepciones justificadas

- Los dos `default_ES_desktop.json` no reciben `marca.com` porque sus
  `allowedDomains` excluyen Marca. No es una cohorte distinta: es alcance de
  site distinto.
- Los aliases Prebid ausentes en Mundo/Expansion se preservan tal como están;
  pertenecen a configuración de red y quedan fuera de esta sincronización.
- Las exclusiones premium de Mundo y `reloadLineItemIds` de los JSON pro Mundo
  son particularidades protegidas.
- No se añade `video.pip` a ningún JSON porque tampoco existe en la referencia.
  Materializarlo habría creado un diff no respaldado y potencialmente habría
  alterado overrides de la baseline PIP.
