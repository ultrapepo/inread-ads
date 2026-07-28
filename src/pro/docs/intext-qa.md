# QA Intext mediante cookies

Las cookies QA se interpretan una sola vez en `IntextManager`. No modifican
`GAMExp.enabled`, los randoms canónicos, los slots normales ni la configuración
PIP. Los valores booleanos aceptados son `1`, `true` y `yes`.

## Alcance

- `gexp_intext_force` supera exclusivamente `inclusions`,
  `domainFilter.allowedDomains` y el gate local `gexp.isEnabled()` de
  `IntextManager`.
- No supera `allowedContentTypes`, ausencia de article body o placements,
  `slots.enabled`, `maxSlots`, dependencias, errores GPT/IMA ni
  `gexp_intext_teads_block`.
- `gexp_intext_force_random1` acepta `5`, `6`, `7`, `8`, `9`, `10` y
  `default`. El valor solo afecta a la resolución QA de Intext; no reescribe
  `GAMExp.random1` ni `intextRandomSnapshot`.
- `default` omite la variante de `loadingExperiments` y usa su configuración
  base.
- `gexp_intext_force_exclusions` solo se activa junto con
  `gexp_intext_force`.

## Decisión sobre `disableSlots`

Se aplica la opción A: el bypass de exclusiones también supera `disableSlots`.
El historial Git (`e2956dc`) confirma que esta era la conducta anterior de la
herramienta QA. Cada aplicación se registra con una fuente explícita
(`disableSlots` o `navcontinua-disableSlots`); sin la cookie principal,
`disableSlots` permanece protegido.

## Comandos

### Forzar aparición del Intext

```js
document.cookie =
  "gexp_intext_force=1; path=/; SameSite=Lax";

location.reload();
```

### Forzar una variante concreta

```js
document.cookie =
  "gexp_intext_force=1; path=/; SameSite=Lax";

document.cookie =
  "gexp_intext_force_random1=5; path=/; SameSite=Lax";

location.reload();
```

### Forzar configuración default

```js
document.cookie =
  "gexp_intext_force=1; path=/; SameSite=Lax";

document.cookie =
  "gexp_intext_force_random1=default; path=/; SameSite=Lax";

location.reload();
```

### Forzar exclusiones

```js
document.cookie =
  "gexp_intext_force=1; path=/; SameSite=Lax";

document.cookie =
  "gexp_intext_force_exclusions=1; path=/; SameSite=Lax";

location.reload();
```

### Forzado completo con debugger

```js
document.cookie =
  "gexp_intext_force=1; path=/; SameSite=Lax";

document.cookie =
  "gexp_intext_force_random1=5; path=/; SameSite=Lax";

document.cookie =
  "gexp_intext_force_exclusions=1; path=/; SameSite=Lax";

localStorage.setItem("gexpIntextDebug", "true");

location.reload();
```

### Eliminar bloqueo por blancos manualmente

```js
document.cookie =
  "gexp_intext_teads_block=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";

localStorage.removeItem(
  "gexp_intext_fallback_blank_count"
);

location.reload();
```

### Limpiar QA

```js
[
  "gexp_intext_force",
  "gexp_intext_force_random1",
  "gexp_intext_force_exclusions"
].forEach((name) => {
  document.cookie =
    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
});

localStorage.removeItem("gexpIntextDebug");

location.reload();
```

## Debugger y telemetría

El debugger registra:

- `intext_qa_cookie_override_detected`
- `intext_qa_cookie_force_allow_applied`
- `intext_qa_cookie_random1_applied`
- `intext_qa_cookie_default_applied`
- `intext_qa_cookie_exclusions_bypass_detected`
- `intext_qa_cookie_exclusions_bypass_applied`
- `intext_qa_cookie_override_invalid`

La telemetría del ciclo conserva `gexp-intext-random1-effective` como valor
canónico y añade:

- `gexp-intext-qa-cookie-enabled`
- `gexp-intext-qa-cookie-random1`
- `gexp-intext-qa-cookie-applied`
- `gexp-intext-qa-inclusion-forced`
- `gexp-intext-qa-original-random1`
- `gexp-intext-qa-cookie-force-exclusions`
- `gexp-intext-qa-cookie-exclusions-bypassed`
- `gexp-intext-qa-cookie-exclusions-bypass-source`

Activar QA no crea impresiones.
