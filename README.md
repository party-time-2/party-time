# Reihenfolge bei der Sichtung der Daten

Pfade werden in `inline Code` angegeben. Die Pfade sind relativ zum Stammverzeichnis zu verstehen. 
## ./docs -> Dokumentation

Innerhalb des Ordners `docs` befinden sich die Dokumentationen. Folgende Pfade sind relativ zu `docs` zu verstehen.
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

In den Ordnern `libs` befinden sich die Bibliotheken, welche von den Anwendungen verwendet werden. Folgende Pfade sind relativ zu `libs` zu verstehen.

Anschauen sollten Sie sich in folgender Reihenfolge (Sortierung nach Meilensteine):

1 - Basisfunktionalität der Plattform:

- `register`: implementiert F010
  1. `./register/README.pdf`: Beschreibung der Library
  1. `./register/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `register` zur Verfügung gestellt werden.  
  &#x200B;


- `verify`: implementiert F014
  1. `./verify/README.pdf`: Beschreibung der Library
  1. `./verify/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `verify` zur Verfügung gestellt werden.  
    &#x200B;

- `account`: implementiert F013, F015
  1. `./account/README.pdf`: Beschreibung der Library
  1. `./account/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `account` zur Verfügung gestellt werden.  
  &#x200B;

- `auth`: implementiert F011, F012
  1. `./auth/README.pdf`: Beschreibung der Library
  1. `./auth/src/lib/*`: Implementierung der Library -> Hier finden Sie die Implementierung der Komponenten, den State, die Services und die Routen welche in der Library `auth` zur Verfügung gestellt werden.

2 - Eventfunktionalität (Veranstalter):

3 - Eventfunktionalität (eingeladener Nutzer):
-
4 - Eventfunktionalität (Teilnehmer eines Events):
-

## apps -> Anwendungen

## Sonstiges

1. package.json -> listet die NPM Pakete auf, die das Projekt benötigt
1. nx.json -> Konfiguration für den NX Workspace
1. tsconfig.base.json -> Konfiguration für den Typescript Compiler
1. tsconfig.json -> Konfiguration für den Typescript Compiler
