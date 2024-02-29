# Party-Time Testerstellung Design-Prinzipien

## Allgemein

- Kotlin `data class` wird nicht ge-mockt.
  - Mocking `data class` würde die eingebauten copy/equals/toString Methoden stören https://github.com/mockk/mockk/issues/508#issuecomment-716763259
  - Mocking sollte das Ziel haben Verhalten zu prüfen, nicht ob `data class` funktioniert, wenn man die Standard-Implementierung stört 
    
## Unit Tests

- Müssen ohne `SpringContext` auskommen.
- Alle Verhalten-liefernden Grenzen der zu testenden Klasse müssen ge-mockt werden.
- Testen granular Funktion-für-Funktion, Verzweigung für Verzweigung. (White-Box-Test)

## MockMVC Controller Routen-Tests

- Liegen zwischen Unit und Integration-Tests
- Nutzen `MockMVC` und limitierten `SpringContext` für Tests, ob ein Controller für Route erwartetes Ergebnis liefert.
- `ControllerAdvice` und Spring-Security sind Teile des limitierten `SpringContext`
- Restlicher Server-Code der hierarchisch "weiter entfernt" als der zu testende Controller liegt wird ge-mockt.

## Integration Tests

- Müssen mit vollständigem `SpringContext` durchgeführt werden
- Routen werden angesprochen und Ergebnis wird überprüft (Black-Box-Test)

