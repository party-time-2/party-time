# Reihenfolge bei der Sichtung der Daten

Pfade werden in `inline Code` angegeben. Die Pfade sind relativ zum Stammverzeichnis zu verstehen.

## /docs -> Dokumentation

Innerhalb des Ordners `/docs` befindet sich die Dokumentation der Anforderungen.

Alle Bilder im Order `/docs/requiremnts-src/F**` sind ...

- Exporte aus der `*.plantuml`-Dateien, welche in `/docs/requirements-src/F**` Ordnern gefunden werden können
- Screenshots welche im Verlauf von Cypress E2E-Tests erzeugt wurden. (Die Tests sind vom Stammverzeichnis aus in `/apps/party-time-frontend-17/-e2e/src/e2e/` zu finden)

Sowohl die PlantUML Quellen als auch die Cypress Tests wurden im Rahmen des Praxisprojekts II & III von uns erstellt.

Anschauen sollten Sie sich in folgender Reihenfolge:

1. `/docs/_Anforderungen/anforderungen.pdf` -> umzusetzende Anforderungen
1. `/docs/other/design-entscheidungen.md` & `/docs/other/glossar.md` -> getroffene Designentscheidungen und Begründungen (kursive Begriffe können im Glossar nachgeschlagen werden)
1. `/docs/other/er-modell.plantuml` -> ER-Modell der Datenbank
1. jeden Ordner und den Inhalt`/docs/requirements-src/F**` -> Quell- Anforderungen und Diagramme zu den Anforderungen
1. jeden Ordner `/docs/.requirements/F**` -> Generierte Anforderungen und Diagramme zu den Anforderungen

In den Ordnern `/docs/requirements-src/F**` werden Bilder, Anforderungen als JSON und plantuml Diagramme gesammelt, welche mit den Tools im Ordner `/tools` zu den .requirements generiert wurden.
Das Sichten dieser Ordner wäre redundant.

## /apps -> Anwendungen

### /apps/party-time-frontend-17

In dem Ordner befinden sich Unit-Test, E2E-Test und die Implementierung des Frontends.

1. `/apps/party-time-frontend-17/src/app` -> Implementierung des Frontends
1. `/apps/party-time-frontend-17/src/models` -> Interfaces und Typen 
1. `/apps/party-time-frontend-17/src/services` -> Services & Tests für Service für die Kommunikation mit dem Backend (die Dokumentation wird vom Interface vererbt und wird in der Implementierung nicht aufgeführt da redundant; die Test erreichen 100% Code Coverage; alle Pfade wurden getestet; spiegeln Swagger Dokumentation wieder)
1. `/apps/party-time-frontend-17/src/components` -> Globale Komponenten (Komponenten welche von jedem verwendet werden können)
1. `/apps/party-time-frontend-17/src/pages` -> Seitenkomponenten (Komponenten welche von den Routern verwendet werden; werden nur bei Bedarf geladen)
1. `/apps/party-time-frontend-17/src/validators` -> Validatoren für Formulare (Testet die Passwörter auf einhaltung der Regeln)

#### Anmerkungen zum Fornend

- es wurde auf eine Lazy Loading Strategie gesetzt, um die Ladezeiten zu minimieren
- die Anwendung ist vollständig responsive
- die Anwendung wurde mit TailwindCSS gestaltet
- die Anwendung wurde mit Angular 17 erstellt
- eine Seite kann lokale Komponenten verwenden, welche von anderen Seiten nicht verwendet werden

### /apps/party-time-backend-kotlin

<!-- TODO Kay -->

## Sonstiges

1. `/package.json` -> listet die NPM Pakete auf, die das Projekt benötigt
1. `/nx.json` -> Konfiguration für den NX Workspace
1. `/tsconfig.base.json` -> Konfiguration für den Typescript Compiler
1. `/tailwind.config.ts` -> Konfiguration für TailwindCSS

## Anmerkungen

Folgende Anmerkungen sind zu beachten:

- F007 (Einladung erhalten), F017 (Benachrichtigung zum Event), F019 (Kalendereintrag exportieren) haben keinen Frontend-Teil und können nicht E2E getestet werden
- Folgende Daten, welche sich keinen Anforderungen direkt zuordnen lassen, haben weder Anforderungsnummer noch Kommentar:
  - generierte Dateien
  - config Dateien
  - Basisdaten für die Anwendungen
  - Testdaten für die Anwendungen
  - Daten für die Dokumentation
  - Model Klassen
  - Interfaces
  - Typen
- Code-nahe Dokumentation / Datenbankmodell ist in englisch gehalten
- Diagramme welche sich auf die Anforderungen beziehen sind in deutsch gehalten
