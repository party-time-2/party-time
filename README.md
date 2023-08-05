# Reihenfolge bei der Sichtung der Daten

Pfade werden in `inline Code` angegeben. Die Pfade sind relativ zum Stammverzeichnis zu verstehen.

## /docs -> Dokumentation

Innerhalb des Ordners `/docs` befindet sich die Dokumentation der Anforderungen.

Alle Bilder im Order `/docs/PNG` sind ...

- Exporte aus der `*.plantuml`-Dateien, welche in `/docs/F**` Ordnern gefunden werden können
- Screenshots welche im Verlauf von Cypress E2E-Tests erzeugt wurden. (Die Tests sind vom Stammverzeichnis aus in `/apps/party-time-frontend-e2e/src/e2e/` zu finden)

Sowohl die PlantUML Quellen als auch die Cypress Tests wurden im Rahmen des Praxisprojekts II von uns erstellt.

Anschauen sollten Sie sich in folgender Reihenfolge:

1. `/docs/Anforderungen/anforderungen.pdf` -> umzusetzende Anforderungen
1. `/docs/Design-Entscheidungen/design-entscheidungen.pdf` & `/docs/Glossar/glossar.pdf` -> getroffene Designentscheidungen und Begründungen (kursive Begriffe können im Glossar nachgeschlagen werden)
1. `/docs/PNG/Er-Modell/er-modell.png` -> ER-Modell der Datenbank
1. `/docs/PNG/OpenAPI-Spec/api-docs.json` -> OpenAPI-Spezifikation der REST-API

In den Ordnern `/docs/PNG/F**` werden an anderer Stelle referenzierte Bilder gesammelt.
Das Sichten dieser Ordner wäre redundant.

## /libs -> Bibliotheken

In dem Ordner `/libs` befinden sich die Dokumentation und Implementierung der Bibliotheken des Frontends.

Anschauen sollten Sie sich in folgender Reihenfolge (Sortierung nach Meilensteine):

1 - Basisfunktionalität der Plattform:

- `/libs/register`: implementiert F010

  1. `/libs/register/README.pdf`: Beschreibung der Library
  1. `/libs/register/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `/libs/register` zur Verfügung gestellt werden.  
     &#x200B;

- `/libs/verify`: implementiert F014

  1. `/libs/verify/README.pdf`: Beschreibung der Library
  1. `/libs/verify/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `/libs/verify` zur Verfügung gestellt werden.  
     &#x200B;

- `/libs/account`: implementiert F013, F015

  1. `/libs/account/README.pdf`: Beschreibung der Library
  1. `/libs/account/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `/libs/account` zur Verfügung gestellt werden.  
     &#x200B;

- `/libs/auth`: implementiert F011, F012
  1. `/libs/auth/README.pdf`: Beschreibung der Library
  1. `/libs/auth/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `/libs/auth` zur Verfügung gestellt werden.
     &#x200B;

2 - Eventfunktionalität (Veranstalter):

- `/libs/event`: implementiert F001, F002, F003, F004, F005, F006, F016
  1. `/libs/event/README.pdf`: Beschreibung der Library
  1. `/libs/event/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `/libs/event` zur Verfügung gestellt werden.
     &#x200B;

3 - Eventfunktionalität (eingeladener Nutzer):

- `/libs/invitation`: implementiert F008, F009
  1. `/libs/invitation/README.pdf`: Beschreibung der Library
  1. `/libs/invitation/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `/libs/invitation` zur Verfügung gestellt werden.
     &#x200B;

4 - Eventfunktionalität (Teilnehmer eines Events):

- `/libs/event`: implementiert F018
  1. `/libs/event/README.pdf`: Beschreibung der Library
  1. `/libs/event/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `/libs/event` zur Verfügung gestellt werden.
     &#x200B;

## /apps -> Anwendungen

- `/apps/party-time-frontend`: Die Libraries werden dynamisch an den benötigten Stellen in die Anwendungen eingebunden. Die Anwendung party-time-frontend ist das eigentliche Frontend.

  1. `/apps/party-time-frontend/src/app/app.routes.*`: Haupt-Routen der Anwendung
  1. `/apps/party-time-frontend/src/app/app.component.*`: Hauptkomponente der Anwendung
  1. `/apps/party-time-frontend/src/main/`: Startpunkt der Anwendung
  1. `/apps/party-time-frontend/src/styles.*`: Styling der Anwendung
  1. `/apps/party-time-frontend/src/assets/*`: Statische Bilder oder Icons der Anwendung
  1. `/apps/party-time-frontend/src/index.html`: Root-HTML der Anwendung
  1. `/apps/party-time-frontend/src/favicon.ico`: Favicon der Anwendung
     &#x200B;

- `/apps/party-time-frontend-e2e`: Testet die Anwendung auf der Oberfläche

  1. `/apps/party-time-frontend-e2e/src/fixtures/*`: Statische Daten für die E2E-Tests
  1. `/apps/party-time-frontend-e2e/src/support/*`: Hilfsfunktionen für die E2E-Tests
  1. `/apps/party-time-frontend-e2e/src/e2e/*`: Implementierung der E2E-Tests

  &#x200B;

## Sonstiges

1. `/package.json` -> listet die NPM Pakete auf, die das Projekt benötigt
1. `/nx.json` -> Konfiguration für den NX Workspace
1. `/tsconfig.base.json` -> Konfiguration für den Typescript Compiler
1. `/tailwind.config.ts` -> Konfiguration für TailwindCSS

## Anmerkungen

Folgende Anmerkungen sind zu beachten:

- F007 (Einladung erhalten), F017 (Benachrichtigung zum Event), F019 (Kalendereintrag exportieren) haben keinen Frontend-Teil. Die entsprechenden Ablauf- und Sequenzdiagramme werden der Vollständigkeit halber trotzdem mit ausgeliefert in
  - `/docs/PNG/F07/*`
  - `/docs/PNG/F17/*`
  - `/docs/PNG/F19/*`
- `/libs/event` implementiert Anforderungen aus dem Meilenstein 2 - Eventfunktionalität (Veranstalter) & 4 - Eventfunktionalität (Teilnehmer eines Events)
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
- Code-nahe Dokumentation / Datenbankmodell ist in englisch gehalten
- Diagramme welche sich auf die Anforderungen beziehen sind in deutsch gehalten
