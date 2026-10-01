Revisa, este fue el resultado del prompt que se le mando inicialmente hace dos promps: Hotfix completado y commit independiente creado.                                                                                                                
                                                                                                                                                                  
  1. La carrera ocurría en la decisión inicial antes de createIntextPositions() y en onNewArticleDetected() antes de createIntextPositionsScoped(): exclusions se 
     resolvía antes de que PSP expusiera pubadsReady o slots nativos.                                                                                             
                                                                                                                                                                  
  2. Archivos modificados:                                                                                                                                        
      - IntextManager.js:1606                                                                                                                                     
      - gam_kv.js (_gam_kv_.js:3147)                                                                                                                              
      - tests/intext-rule-targeting.audit.test.cjs:407                                                                                                            
      - tests/intext-qa.audit.test.cjs:136                                                                                                                        
                                                                                                                                                                  
  3. Nuevo helper: waitForIntextRuleTargetingReady(context, options) y gate compartido isBlockedByExclusionsAfterTargetingReady().                                
  4. Timeout/poll: 1200 ms / 50 ms, internos a IntextManager.                                                                                                     
  5. Readiness: nativeSlots.length > 0 o api.pubadsReady === true; apiReady no decide readiness.                                                                  
  6. PSP ya ready: resolución inmediata, sin polling.                                                                                                             
  7. Sin PSP: retorno inmediato, sin polling.                                                                                                                     
  8. Premium tardío: espera 400 ms, reevalúa exclusions, bloquea y no evalúa la inclusión random.                                                                 
  9. No-premium: reevalúa, no bloquea y continúa con inclusions.                                                                                                  
  10. Timeout: última reevaluación y fail-open si sigue sin match; 24 polls deterministas, sin promesas pendientes.                                               
  11. Random-only: retorno inmediato, sin polling.                                                                                                                
  12. Navegación continua: mismo gate con context.rootElement; no mezcla slots del artículo A.                                                                    
  13. Un único wait por decisión, incluso con cuatro exclusions.                                                                                                  
  14. resolveIntextRuleTargeting() y la unión P3 quedaron intactos. P0 GPT PSP baseObject, P1 aliases y P2 Prebid/APS realObj mantienen sus regresiones verdes.   
  15. Suite completa: 344 tests, 13 suites, 344 passed.                                                                                                           
  16. node --check IntextManager.js: correcto.                                                                                                                    
     node --check _gam_kv_.js: correcto.                                                                                                                          
                                                                                                                                                                  
  17. git diff --check: correcto. Árbol de trabajo limpio.                                                                                                        
  18. Commit creado:                                                                                                                                              
                                                                                                                                                                  
  3eb0d1f fix(intext): wait for PSP targeting readiness before rule decision  Y este el del ultimo prompt con las optimizaciones y ajsutes: Hotfix optimizado, validado y guardado como commit independiente.
                                                                                                                                                                 
  1. Causa raíz: PSP exponía apiReady antes de materializar pubadsReady, slots nativos y targeting editorial; la decisión se tomaba sobre un snapshot incompleto.  2. Archivos modificados:                                                                                                                                       
      - IntextManager.js:1606                                                                                                                                    
      - gam_kv.js (_gam_kv_.js:3147)                                                                                                                             
      - tests/intext-rule-targeting.audit.test.cjs:407                                                                                                           
                                                                                                                                                                 
  3. Helpers: getIntextRelevantNonRandomRuleKeys(), needsIntextRuleTargetingReadinessWait(), waitForIntextRuleTargetingReady() y el gate compartido              
     isBlockedByExclusionsAfterTargetingReady().                                                                                                                 
                                                                                                                                                                 
  4. Relevant keys: unión sin duplicados de exclusions.keyValues, inclusions.keyValues y exclusions.disableSlots.rules[].ifKeyValues, excluyendo random1..4.     
  5. Solo entra en wait cuando PSP está detectado, existen keys non-random, no hubo exclusión preliminar y faltan slots nativos; en página inicial               
     pubadsReady=true también evita el wait.                                                                                                                     
                                                                                                                                                                 
  6. pollMs: 25 ms.                                                                                                                                              
  7. maxWaitMs: 600 ms, techo absoluto y configurable internamente mediante options.                                                                             
  8. Early exits: exclusión concluyente, slots nativos scoped disponibles, pubadsReady=true en página inicial o timeout.                                         
  9. Missing temporal frente a ausencia real: con PSP incompleto, slots vacíos y reglas relevantes, un valor ausente o no bloqueante no se considera definitivo. 
  10. Early block: reutiliza isBlockedByExclusions() durante polling; DataLayer premium tardío bloquea a 75 ms.                                                  
  11. Native slots: salida inmediata cuando aparece inventario nativo relevante; probado a 175/250 ms.                                                           
  12. pubadsReady: señal válida para página inicial; no permite que slots globales del artículo A declaren ready al artículo B scoped.                           
  13. Caso premium real: bloquea a 400 ms antes de inclusions y con cero nodos/requests.                                                                         
  14. DataLayer-only: ueDataLayer.isPremium=true bloquea sin esperar GPT.                                                                                        
  15. Slot-only: slot premium tardío bloquea a 175 ms.                                                                                                           
  16. Conflicto: false a 50 ms no permite creación; slot ["1"] a 200 ms completa la unión P3 y bloquea.                                                          
  17. Non-premium: DataLayer false a 125 ms, slot ["0"] a 175 ms; no bloquea y después permite inclusión random.                                                 
  18. Sin PSP: cero polling y flujo inmediato.                                                                                                                   
  19. Random-only, incluyendo exclusion random-only: cero polling.                                                                                               
  20. Site sin isPremium: no existe comportamiento especial por site o nombre de clave.                                                                          
  21. Otra key: tag="bloqueo-publi" tardío bloquea a 125 ms con la misma lógica.                                                                                 
  22. Navegación continua: usa exclusivamente context.rootElement; B espera sus propios slots y no consulta A.                                                   
  23. Timeout: a 600 ms ejecuta recheck final y conserva fail-open, sin timers pendientes ni polling infinito.                                                   
  24. Número de waits: uno por decisión de página/artículo, nunca por key, slot o nodo.                                                                          
  25. Paralelismo: no se añadió trabajo especulativo. Network, ad unit, perfiles y snapshot ya se preparan antes del gate; placement/DOM siguen pospuestos para  
     evitar coste inútil.                                                                                                                                        
                                                                                                                                                                 
  26. requestBids, fetchBids, gpt.display, pubads.refresh y vídeo permanecen detrás de exclusions finales, inclusions, creación e inicialización de nodos.       
  27. No se lee, mezcla ni registra sessionStorage ni información de suscriptor.                                                                                 
  28. P0 GPT __ctrl.baseObject, P1 aliases, P2 Prebid/APS __ctrl.realObj y P3 síncrono permanecen funcionalmente intactos.                                       
  29. Validación: 354 tests, 13 suites, todos correctos.                                                                                                         
  30. node --check IntextManager.js y node --check _gam_kv_.js: correctos.                                                                                       
  31. git diff --check: correcto. Worktree limpio.                                                                                                               
  32. Commit creado:                                                                                                                                             
                                                                                                                                                                 
  d056eef fix(intext): optimize PSP rule-targeting readiness gate.