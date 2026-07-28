# Validación manual PIP Intext — fase 1

## Activación selectiva documentada

Este snippet es únicamente documentación. No está aplicado en ninguno de los
JSON de producción:

```json
{
  "slotOverridesById": {
    "gexp-intext": {
      "video": {
        "pip": {
          "enabled": true
        }
      }
    },
    "gexp-intext-2": {
      "video": {
        "pip": {
          "enabled": false
        }
      }
    },
    "pnc": {
      "video": {
        "pip": {
          "enabled": false
        }
      }
    }
  }
}
```

El override debe fusionarse mediante la resolución de configuración por slot
existente. Sin override, `gexp-intext-pip-enabled` y
`gexp-intext-pip-effective-enabled` deben ser `"false"`.

## Checklist de navegador real

| Caso | Resultado esperado | Evento debugger esperado | Telemetría esperada |
| --- | --- | --- | --- |
| Desktop Chrome | El override desktop permite PIP; el bloque global no lo activa por sí solo. | `video_pip_entry_blocked` sin override o `video_pip_entered` con override. | `pip-enabled` refleja configuración y `pip-effective-enabled` el resultado del nodo/dispositivo. |
| Vídeo MP4 | Tras primer frame, reveal y salida del anchor, el mismo player flota. | `video_pip_entered`. | `pip-entered=true`, `pip-entry-count=1`, porcentaje de entrada. |
| VAST wrapper | STARTED sin primer frame no activa PIP; tras primer frame sí puede hacerlo. | Bloqueo antes del frame y después `video_pip_entered`. | `pip-entered` permanece false hasta el frame confirmado. |
| Player dentro del viewport | Permanece inline y marca el anchor como visto. | Sin entrada PIP. | `pip-entered=false`. |
| Scroll hacia abajo | Con ratio menor o igual a 0.05, pasa a flotante abajo a la derecha. | `video_pip_entered`. | Incremento de `pip-entry-count`. |
| Retorno al slot | Con ratio mayor o igual a 0.35, vuelve inline sin reinicio. | `video_pip_returned_inline`. | `pip-visible-ms` acumulado y razón de salida. |
| Scroll hacia arriba | Al abandonar el anchor por cualquiera de sus bordes, vuelve a entrar sin oscilación. | `video_pip_entered`. | Nuevo incremento de count; misma impresión padre. |
| Cierre mediante aspa | Un click vuelve inline, no llega al anuncio y descarta el resto del token. | `video_pip_returned_inline` y `video_pip_dismissed`. | `pip-dismissed=true`, razón `user-dismissed`. |
| Finalización flotando | Sale inmediatamente del flotante y continúa el final normal. | `video_pip_video_ended` y retorno inline. | `pip-ended-while-active=true`, razón `video-ended`. |
| Error flotando | Limpia clases/botón y continúa el fallback existente inline. | `video_pip_cleanup`. | Razón final `video-error` o `video-timeout`. |
| Fallback display | Display nunca hereda la clase PIP. | `video_pip_cleanup`. | Razón `video-fallback`; PIP final preservado en `slot-cycle-final`. |
| Segundo slot solicita PIP | El nuevo nodo gana; el anterior vuelve inline y continúa reproduciendo. | `video_pip_replaced`, retorno anterior y entrada nueva. | Cada ciclo conserva su parent telemetry ID; nunca dos activos. |
| Navegación continua | El ciclo anterior se limpia con su token antes de crear el siguiente. | `video_pip_cleanup` con token/ciclo anterior. | Ningún delta antiguo usa el nuevo render token. |
| Pestaña oculta | No se produce una entrada nueva mientras `visibilityState` no sea visible. | `video_pip_entry_blocked`. | `pip-entered` no cambia; no hay impresión adicional. |

## Comprobaciones visuales del aspa

- Verificar que el botón está por encima de `.ima-ad-container`, iframes IMA,
  overlays Video.js y controles publicitarios.
- Verificar que una CMP con un z-index superior al player PIP continúa por
  encima del mini-player.
- Confirmar que el click se procesa una sola vez, no pausa ni salta el vídeo,
  no cierra el anuncio y no inicia refresh.
