# Reihenfolge bei der Sichtung der Daten

Pfade werden in `inline Code` angegeben. Die Pfade sind relativ zum Stammverzeichnis zu verstehen.

## ./docs -> Dokumentation

Innerhalb des Ordners `docs` befindet sich die Dokumentation der Anforderungen. Folgende Pfade sind relativ zu `docs` zu verstehen.

Alle Bilder im Order `PNG` sind ...

- Exporte aus der `.plantuml`-Dateien, welche in `F**` Ordnern gefunden werden können
- Screenshots welche im Verlauf von Cypress E2E-Tests erzeugt wurden. (Die Tests sind vom Stammverzeichnis aus in `./apps/party-time-frontend-e2e/src/e2e/` zu finden)

Sowohl die PlantUML Quellen als auch die Cypress Tests wurden im Rahmen des Praxisprojekts II von uns erstellt.

Anschauen sollten Sie sich in folgender Reihenfolge:

1. `./Anforderungen/anforderungen.pdf` -> umzusetzende Anforderungen
1. `./Design-Entscheidungen/design-entscheidungen.pdf` & `./Glossar/glossar.pdf` -> getroffene Designentscheidungen und Begründungen (kursive Begriffe können im Glossar nachgeschlagen werden)
1. `./PNG/Er-Modell/er-modell.png` -> ER-Modell der Datenbank

In den Ordnern `./PNG/F**` werden an anderer Stelle referenzierte Bilder gesammelt.
Das Sichten dieser Ordner an ist redundant.

## ./libs -> Bibliotheken

In dem Ordner `./libs` befinden sich die Dokumentation und Implementierung der Bibliotheken des Frontends. Folgende Pfade sind relativ zu `./libs` zu verstehen.

Anschauen sollten Sie sich in folgender Reihenfolge (Sortierung nach Meilensteine):

1 - Basisfunktionalität der Plattform:

- `./register`: implementiert F010
  1. `./register/README.pdf`: Beschreibung der Library
  1. `./register/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `./register` zur Verfügung gestellt werden.  
  &#x200B;

- `./verify`: implementiert F014
  1. `./verify/README.pdf`: Beschreibung der Library
  1. `./verify/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `./verify` zur Verfügung gestellt werden.  
    &#x200B;

- `./account`: implementiert F013, F015
  1. `./account/README.pdf`: Beschreibung der Library
  1. `./account/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `./account` zur Verfügung gestellt werden.  
  &#x200B;

- `./auth`: implementiert F011, F012
  1. `./auth/README.pdf`: Beschreibung der Library
  1. `./auth/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `./auth` zur Verfügung gestellt werden.
  &#x200B;

2 - Eventfunktionalität (Veranstalter):

- `./event`: implementiert F001, F002, F003, F004, F005, F006, F016
  1. `./event/README.pdf`: Beschreibung der Library
  1. `./event/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `./event` zur Verfügung gestellt werden.
  &#x200B;

3 - Eventfunktionalität (eingeladener Nutzer):

- `./invitation`: implementiert F008, F009
  1. `./invitation/README.pdf`: Beschreibung der Library
  1. `./invitation/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `./invitation` zur Verfügung gestellt werden.
  &#x200B;

4 - Eventfunktionalität (Teilnehmer eines Events):

- `./event`: implementiert F018
  1. `./event/README.pdf`: Beschreibung der Library
  1. `./event/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `./event` zur Verfügung gestellt werden.
  &#x200B;

## apps -> Anwendungen

- `./party-time-frontend-e2e`
  1. `./party-time-frontend-e2e/src/fixtures/*`: Statische Daten für die E2E-Tests
  1. `./party-time-frontend-e2e/src/support/*`: Hilfsfunktionen für die E2E-Tests
  1. `./party-time-frontend-e2e/src/e2e/*`: Implementierung der E2E-Tests
  &#x200B;

- `./party-time-frontend`
  1. `./party-time-frontend/src/app/app.routes.*`: Haupt-Routen der Anwendung
  1. `./party-time-frontend/src/app/app.component.*`: Hauptkomponente der Anwendung
  1. `./party-time-frontend/src/main/`: Startpunkt der Anwendung
  1. `./party-time-frontend/src/styles.*`: Styling der Anwendung
  1. `./party-time-frontend/src/assets/*`: Statische Bilder oder Icons der Anwendung
  1. `./party-time-frontend/src/index.html`: Root-HTML der Anwendung
  1. `./party-time-frontend/src/favicon.ico`: Favicon der Anwendung
  &#x200B;


## Sonstiges

1. package.json -> listet die NPM Pakete auf, die das Projekt benötigt
1. nx.json -> Konfiguration für den NX Workspace
1. tsconfig.base.json -> Konfiguration für den Typescript Compiler
1. tsconfig.json -> Konfiguration für den Typescript Compiler

## Anmerkungen

Folgende Anmerkungen sind zu beachten:

- F007, F017, F019 haben keinen Frontend-Teil
- `./event` implementiert Anforderungen aus dem Meilenstein 2 - Eventfunktionalität (Veranstalter) & 4 - Eventfunktionalität (Teilnehmer eines Events)
- jede Datei die sich einer Anforderung zuordnen lässt, ist mit der entsprechenden Anforderungsnummer versehen
  - .html -> `<!-- implements FXXX -->`
  - .ts -> `// implements FXXX`
- Folgende Daten, welche sich keinen Anforderungen direkt zuordnen lassen, haben weder Anforderungsnummer noch Kommentar:
  - generierte Dateien
  - config Dateien
  - Basisdaten für die Anwendungen
  - Testdaten für die Anwendungen
  - Daten für die Dokumentation
  - Model Klassen
  - Interfaces
  - Typen