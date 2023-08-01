# Design Entscheidungen

## Verwendung von NX

Das Projekt verwendet das _NX_-Entwicklungs-Framework für die Verwaltung des _Monorepo_, der Codegenerierung und der Build- und Test-Workflows.

**Begründung**:
Die Verwendung von _NX_ bietet mehrere Vorteile für das Projekt, einschließlich:

- _Monorepo_-Verwaltung: _NX_ erleichtert die Verwaltung von Code in einem _Monorepo_, da es eine konsistente Struktur für die Organisation von Code bietet und es einfach macht, Abhängigkeiten zwischen Projekten innerhalb des _Monorepo_ zu verwalten.
- Codegenerierung: _NX_ bietet leistungsfähige Tools für die automatisierte Generierung von Code, einschließlich der Generierung von _Scaffold_s_ für neue _Komponenten_, _Services_ und _Module_.
- Build- und Test-Workflows: _NX_ vereinfacht die Konfiguration von Build- und Test-Workflows für das gesamte _Monorepo_, einschließlich der Integration von Tools wie _Jest_ und _Cypress_ für Tests und der Bereitstellung von Artefakten für die Verwendung in einer Continuous-Integration/Continuous-Delivery-Pipeline (_CI/CD_).
- Skalierbarkeit: _NX_ ist für die Entwicklung großer Anwendungen ausgelegt und ermöglicht es, ein Projekt in einer _monolithischen Architektur_ zu skalieren, indem es eine klare Struktur für die Organisation von Code und Abhängigkeiten bietet. Im Rahmen unseres Projekts beinhaltet das _Monorepo_ sowohl das _Frontend_ als auch das _Backend_ der _Anwendung_, sowie _E2E-Frontend Tests_.

## Verwendung von Client Server

Die _Client-Server-Architektur_ wird für die Implementierung der _Anwendung_ verwendet.

**Begründung**:
Die Verwendung der _Client-Server-Architektur_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Skalierbarkeit: Durch die Trennung der _Anwendung_ in Frontend- und Backend-Komponenten kann jeder Teil der _Anwendung_ unabhängig skaliert werden, um eine höhere Last zu bewältigen, ohne die Leistung des anderen Teils zu beeinträchtigen.
- Sicherheit: Die Verwendung einer _Client-Server-Architektur_ ermöglicht es, Sicherheitsmaßnahmen wie Zugriffskontrolle und Verschlüsselung an der Serverseite zu implementieren, um die _Anwendung_ vor Angriffen zu schützen. Wir können somit beispielsweise dem Veranstalter eines Events mehr Rechte geben als einem Teilnehmer.
- Wiederverwendbarkeit: Die Trennung der _Anwendung_ in _Frontend_- und _Backend_-Komponenten ermöglicht es, die Wiederverwendung von Komponenten besser zu organisieren. In unserem Projekt werden _Frontend_-Komponenten nur im _Frontend_ wiederverwendet und _Backend_-Komponenten nur im _Backend_ wiederverwendet.

## Verwendung eines RESTful-Webservices

Die _Anwendung_ verwendet _RESTful-Webservices_ zur Kommunikation zwischen dem Frontend-Client und dem Back-End-Server.

**Begründung**:
Die Verwendung eines _RESTful-Webservices_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Interoperabilität: _RESTful-Webservices_ verwenden standardisierte HTTP-Methoden und Datenformate, was es verschiedenen Systemen und Programmiersprachen ermöglicht, miteinander zu kommunizieren. In unserem Projekt muss ein Angular Frontend (geschrieben hauptsächlich in TypeScript) mit einem Java Backend kommunizieren.
- Skalierbarkeit: _RESTful-Webservices_ ermöglichen die Skalierung der _Anwendung_, indem sie den Client und den Server entkoppeln und es dem Server ermöglichen, mehrere Anfragen gleichzeitig zu verarbeiten. Unabhängig davon wie viele Clients das _Frontend_ der Party-Time _Anwendung_ verwenden, kann das _Backend_ die Anfragen verarbeiten.
- Einfachheit: _RESTful-Webservices_ sind einfach zu implementieren und zu nutzen, da sie auf standardisierten Methoden und Datenformaten basieren.

## Verwendung von Java

Die _Anwendung_ verwendet Java als Programmiersprache für die Implementierung des Back-End-Servers.

**Begründung**:

Die Verwendung von Java bietet mehrere Vorteile für das Projekt, einschließlich:

- Interoperabilität: Java ist eine weit verbreitete Programmiersprache, die es ermöglicht, mit einer Vielzahl von Bibliotheken und Frameworks zu arbeiten. In unserem Projekt verwenden wir beispielsweise das Spring Boot Framework für die Implementierung des Back-End-Servers.
- Sicherheit: Java Bibliotheken werden regelmäßig von vielen Experten der Open-Source-Community auf sicherheitsrelevante Schwachstellen geprüft, wodurch sich die Sicherheit unserer Anwendung insgesammt erhöht.
- Wiederverwendbarkeit: Java ist eine objektorientierte Programmiersprache, die die Wiederverwendung von Code und Komponenten fördert. Authentifizierung ist beispielsweise ein Baustein vieler unserer Anforderungen, die nur einmal zentral im Java-_Backend_ implementiert werden muss.

## Verwendung von Spring Boot

Die _Anwendung_ verwendet das _Spring Boot_-Framework als Basis für die Implementierung des Back-End-Servers.

**Begründung**:
Die Verwendung von _Spring Boot_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Schnelle Entwicklung: _Spring Boot_ bietet eine umfangreiche Bibliothek von vorgefertigten Modulen und Konfigurationen, welche die Implementierung von Anwendungen beschleunigen können.
- Einfache Konfiguration: _Spring Boot_ verwendet Konventionen und automatisierte Konfigurationen für die einfache konfiguration verschiedener Aspekte der _Anwendung_, ohne dass manuelle Eingriffe erforderlich sind.
- Erweiterbarkeit: _Spring Boot_ ist einfach zu erweitern und bietet eine Vielzahl von Erweiterungen und Plugins, welche die Implementierung von zusätzlichen Funktionen erleichtern.
- Standardisierung: _Spring Boot_ ist ein etabliertes Framework, das eine Standardisierung in der Java-Entwicklung fördert und somit eine erhöhte Wiederverwendbarkeit von Code und Komponenten ermöglicht.

## Verwendung von Maven

Das Projekt verwendet Apache _Maven_ als Build-Management-Tool des _Java_-_Backends_, um den Build-Prozess zu automatisieren, die Abhängigkeiten zu verwalten und die Bereitstellung der Server-Anwendung zu erleichtern.

**Begründung**:
Die Verwendung von _Maven_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Automatisierung: _Maven_ automatisiert den Build-Prozess und ermöglicht eine schnelle, zuverlässige und wiederholbare Erstellung der _Anwendung_.
- Abhängigkeitsverwaltung: _Maven_ verwaltet die Abhängigkeiten der _Anwendung_ automatisch und stellt sicher, dass die richtigen Versionen von Bibliotheken und Frameworks verwendet werden.
- Erweiterbarkeit: _Maven_ bietet eine Vielzahl von Plugins, die es einfach machen, zusätzliche Funktionalitäten zu integrieren, z.B. zur Code-Qualitätsprüfung, Testausführung oder Dokumentation.
- Standardisierung: _Maven_ ist ein etabliertes Tool, das eine Standardisierung in der Java-Entwicklung fördert und somit eine erhöhte Wiederverwendbarkeit von Code und Komponenten ermöglicht.

## Verwendung von H2

Das Projekt verwendet eine integrierte _H2_-Datenbank für die lokale Entwicklung und Tests. _H2_ ist eine leichte, schnelle und plattformunabhängige Datenbank, welche in Java geschrieben wurde und eine einfache Vergleichbarkeit mit anderen JDBC-Datenbanken ermöglicht.

**Begründung**:

Die Verwendung einer _H2_ Datenbank bietet mehrere Vorteile für das Projekt, einschließlich:

- Einfache Einrichtung: _H2_ kann als eingebettete Datenbank direkt im Projekt verwendet werden, was eine schnelle Einrichtung und Konfiguration ermöglicht.
- Schnelligkeit: _H2_ ist eine schnelle Datenbank, die keine langen Initialisierungszeiten benötigt und schnell auf Anfragen reagiert.
- Plattformunabhängigkeit: _H2_ ist in Java geschrieben und somit plattformunabhängig. Es kann auf verschiedenen Betriebssystemen und Architekturen eingesetzt werden.
- Kompatibilität: _H2_ ist vergleichbar mit anderen JDBC-Datenbanken und ermöglicht so eine einfache Migration zu anderen, evtl. für den Betrieb besser geeigneten Datenbanken.
- Testfähigkeit: _H2_ eignet sich besonders gut für Integrationstests und automatisierte Tests, da die eingebettete Datenbank leicht in Testumgebungen gestartet werden kann.

## Verwendung von Single-Page-Anwendung

Das Projekt implementiert eine Single-Page-Anwendungen (_SPA_)-Architektur für das Frontend.

**Begründung**:
Die Verwendung von einer _SPA_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Trennung des Frontends vom Backend, was die Wartbarkeit erhöht und die Entwicklung erleichtert. Die _SPA_ kann unabhängig vom Backend entwickelt werden, solange die Schnittstellen zwischen Frontend und Backend definiert sind. In diesem Projekt werden die Schnittstellen mit _Swagger_ definiert.
- Verbesserte Benutzererfahrung, da das Laden und Navigieren zwischen den Seiten nicht zu vollständigen Neuladungen führt, ist die Anwendung reaktionsschneller und bietet eine flüssige Benutzererfahrung.

## Verwendung von Angular

Das Projekt verwendet das _Angular_-Framework für die Implementierung des Frontends.

**Begründung**:
Die Verwendung von _Angular_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Struktur: _Angular_ bietet eine klare Struktur für die Organisation von Code, die es einfach macht, den Überblick über komplexe Anwendungen zu behalten.
- Templates: _Angular_ bietet eine leistungsfähige Vorlagen-Engine für die Erstellung von dynamischen und reaktiven Benutzeroberflächen.
- Komponenten: _Angular_ arbeitet mit Komponenten, die unabhängig voneinander entwickelt werden können und wiederverwendbar sind, was die Entwicklung von komplexen Anwendungen erleichtert.
- TypeScript: _Angular_ ist in TypeScript geschrieben, was zu einer besseren Codequalität und -wartbarkeit führt und die Entwicklung insgesamt effizienter macht.
- Ökosystem: _Angular_ verfügt über ein großes Ökosystem von Bibliotheken und Tools, welche die Entwicklung und Wartung von unserer _Anwendung_ erleichtert

## Verwendung von NPM (Node Package Manager)

Das Projekt verwendet den Node Package Manager (_NPM_) als zentrales Tool zur Verwaltung von Abhängigkeiten und zur Automatisierung von Abläufen im Frontend-Entwicklungsprozess.

**Begründung**:
Die Verwendung von _NPM_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Verwaltung von Abhängigkeiten: _NPM_ erleichtert die Verwaltung von Abhängigkeiten im Projekt und sorgt dafür, dass alle für das Frontend benötigten Bibliotheken und Tools auf dem neuesten Stand sind und gleiche Versionen konsistent verwendet werden.

- Automatisierung von Prozessen: _NPM_ ermöglicht es Entwicklern, wiederholende Aufgaben im Entwicklungsprozess zu automatisieren, wie z.B. die Ausführung von Tests oder die Bereitstellung von Builds.

- Ökosystem: _NPM_ verfügt über ein großes Ökosystem von Bibliotheken und Tools, die die Entwicklung und Wartung von Anwendungen erleichtern.

- Skalierbarkeit: _NPM_ ist skalierbar und kann mit der Größe und Komplexität des Projekts wachsen, wodurch eine einfache Verwaltung und Entwicklung des Projekts möglich wird.

## Verwendung von NGRX

Das Projekt verwendet das _NGRX_-Framework zur Implementierung eines zentralen Stores und zur Verwaltung des Anwendungsstatus in der _Angular_-Applikation. _NGRX_ ist eine Bibliothek, die Redux-Architekturprinzipien in _Angular_-Anwendungen implementiert.

**Begründung**:
Die Verwendung von _NGRX_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Zentralisierung des Anwendungsstatus: Durch die Verwendung von _NGRX_ können alle Komponenten der Anwendung auf einen zentralen Store zugreifen, der den gesamten Anwendungsstatus verwaltet. Dadurch wird die Komplexität der Anwendung reduziert und die Wartbarkeit erhöht.

- Vorhersehbarkeit: _NGRX_ basiert auf dem Redux-Muster, das eine klare Trennung von Anwendungsstatus und Benutzerinteraktion ermöglicht. Dadurch wird die Vorhersehbarkeit des Verhaltens der Anwendung verbessert und die Testbarkeit erleichtert.

## Verwendung von Cypress

Das Projekt verwendet das _Cypress_-Testing-Framework für die Automatisierung von End-to-End-Tests im Frontend.

**Begründung**:
Die Verwendung von _Cypress_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Integration: _Cypress_ lässt sich nahtlos in die Continuous-Integration/Continuous-Delivery-Pipeline des Projekts integrieren und ermöglicht es dem Team, automatisierte Tests zu erstellen und auszuführen, bevor Code in die Produktion übernommen wird.

## Verwendung von Tailwind CSS

Das Projekt verwendet das _Tailwind_ CSS Framework für die Gestaltung des Frontends. _Tailwind_ ist ein Utility-First CSS-Framework, das es Entwicklern ermöglicht, schnell und einfach responsive Benutzeroberflächen zu erstellen.

**Begründung**:
Die Verwendung von _Tailwind_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Effizienz: _Tailwind_ bietet eine Vielzahl von vordefinierten Utility-Klassen um schneller und effizienter zu arbeiten.

- Flexibilität: _Tailwind_ ist sehr flexibel und erlaubt es Designs zu erstellen, ohne aufwendige CSS-Regeln schreiben zu müssen.

- Responsivität: _Tailwind_ verfolgt den Mobile-First Ansatz und erleichtert die Erstellung von responsiven Designs für verschiedene Geräte.

## Verwendung von GitHub

Das Projekt verwendet _GitHub_ als Code-Repository und Kollaborationsplattform. _GitHub_ ist eine Cloud-basierte Plattform, die es Entwicklern ermöglicht, Code zu teilen, zu speichern und zusammenzuarbeiten.

**Begründung**:
Die Verwendung von _GitHub_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Kollaboration: _GitHub_ bietet eine benutzerfreundliche und intuitive Plattform für die Zusammenarbeit zwischen Entwicklern, die es einfach macht, Code zu teilen, zu kommentieren und zusammenzuarbeiten.

- Versionskontrolle: _GitHub_ bietet eine leistungsfähige Versionskontrollfunktion, die es ermöglicht, verschiedene Versionen des Codes zu speichern und bei Bedarf wiederherzustellen.

- Code-Review: _GitHub_ bietet eine integrierte Code-Review-Funktion, die es Entwicklern ermöglicht, den Code zu überprüfen und Feedback zu geben.

- Integrationen: _GitHub_ bietet Integrationen mit einer Vielzahl von Tools und Services, die die Entwicklung und Wartung von Anwendungen erleichtern, wie z.B. Continuous Integration/Continuous Deployment (CI/CD) Tools.

## Verwendung von PlantUML

Das Projekt verwendet _PlantUML_ als Werkzeug für die Erstellung von UML-Diagrammen. _PlantUML_ ist ein Open-Source-Tool, das es einfach macht, UML-Diagramme in verschiedenen Formaten zu erstellen und zu exportieren.

**Begründung**:
Die Verwendung von _PlantUML_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Einfache Syntax: _PlantUML_ verwendet eine einfache, textbasierte Syntax, um UML-Diagramme zu erstellen.

- Flexibilität: _PlantUML_ unterstützt verschiedene Arten von UML-Diagrammen, einschließlich Klassendiagrammen, Sequenzdiagrammen und Zustandsdiagrammen, sowie benutzerdefinierte Diagrammtypen.

- Integration: _PlantUML_ kann leicht in andere Tools und Workflows integriert werden, z.B. in IDEs, CI/CD-Pipelines oder Dokumentationsprozesse.

- Open Source: _PlantUML_ ist ein Open-Source-Tool und bietet daher eine breite Community-Unterstützung und regelmäßige Updates.

- Export: _PlantUML_ bietet eine Vielzahl von Exportoptionen, um die erstellten Diagramme in verschiedenen Formaten zu exportieren, z.B. als Bild-, PDF- oder ASCII-Art-Datei.

## Verwendung von Google-Maps

Das Projekt verwendet die _Google-Maps_ API zur Integration von interaktiven Karten und Geodaten in die Anwendung. Die Google Maps API ist eine verbreitete API, die es ermöglicht, Karten, Standorte, Wegbeschreibungen und geografische Daten in die Anwendung zu integrieren.

**Begründung**:
Die Verwendung von _Google-Maps_ bietet mehrere Vorteile für das Projekt, einschließlich:

- Umfangreiche Funktionen: Die _Google-Maps_ API bietet die Darstellung von Karten und Standortmarkierungen

- Die Google Maps API bietet Zugriff auf aktuelle Karten- und Geodaten um genaue und aktuelle Informationen bereitzustellen

## Erforderliche persönliche Daten von Benutzern

Für die Authentifizierung von Benutzern sowie für soziale Komponenten der Party Time Plattform werden pro Nutzer einen Anzeigenamen, eine E-Mail Adresse sowie ein Passwort erhoben.

**Begründung**:

- [Anzeigename](#anzeigename-richtlinien): Ein frei vom Nutzer gewählter Anzeigename, der anderen Nutzern beispielsweise in Party-Teilnehmerlisten gezeigt wird. Dieser ist frei wählbar und nicht etwa mit einem Echter-Name-Zwang verbunden, da letztendlich Nutzer selbst dafür verantwortlich sind, dass andere Party-Gäste einem Anzeigenamen einer Person zuordnen können. Wird beispielsweise ein Nickname als Anzeigename verwendet, stellt dies für andere Partygäste grundsätzlich kein Problem dar.
- [E-Mail Adresse](#e-mail-adresse-richtlinien): Da Anzeigenamen frei wählbar sind und daher eventuell auch mehrere Nutzer den gleichen Anzeigenamen verwenden können, benötigt der Anmelde-Vorgang eine E-Mail Adresse von Nutzern. Bei einzigartigen E-Mail Adressen besteht Sicherheit, dass mehrere Nutzer nicht dieselbe E-Mail Adresse verwenden.
- [Passwort](#passwort-richtlinien-für-benutzer): Um davor zu schützen, dass sich dritte Personen mit E-Mail Adressen anderer Nutzer anmelden, erfolgt eine personalisierte Anmeldung an der Party Time Platform ausschließlich durch die Eingabe von E-Mail Adresse und vom Nutzer gewählten Passwort.

### Anzeigename-Richtlinien

Für Anzeigenamen gelten die folgenden Richtlinien:

- Ein Anzeigename hat eine Länge zwischen 5 und 20 Zeichen
- Alle Zeichen sind zulässig

**Begründung**:

5 - 20 Zeichen bieten Nutzern eine ausreichende Länge ihres Anzeigename, um einen ihren Wünschen entsprechenden Anzeigename zu wählen.

Für einen "Echte-Welt" Einsatz würden wir Zeichen wie ASCII- und UTF-Kontrollsequenzen, führende und folgende Leerzeichen, sowie mehrfach aufeinander folgende Leerzeichen verbieten. Die Entwicklung eines Algorithmus für die Prüfung dieser Regeln (insbesondere der Ausschluss aller nicht erlaubten Zeichen) würde allerdings den Umfang der Anwendung in seiner ersten Ausbaustufe sprengen.

### E-Mail-Adresse Richtlinien

E-Mail Adressen müssen dem HTML Standard für Valide E-Mail Adressen entsprechen und vom _Angular_ Framework als valide empfunden werden.

**Begründung**:

Das verwendete _Angular_ Framework hat einen [email Validator](https://angular.io/api/forms/Validators#email) für diesen Einsatzzweck, der zur Validierung von E-Mail-Adressen in Formularen mit geringem Entwickleraufwand eingesetzt werden kann.

### Passwort-Richtlinien für Benutzer

Passwörter für Benutzer müssen die folgenden Anforderungen erfüllen:

- Mindestens 8 Zeichen lang sein
- Maximal 30 Zeichen lang sein
- 4 Zeichenarten verwenden (je min. 1 Großbuchstaben, Kleinbuchstaben, Ziffer und Sonderzeichen)
- Die 1 benötigte Ziffer und das 1 benötigte Sonderzeichen dürfen nicht am Anfang oder Ende des Passworts stehen. Auch eine Folge von Sonderzeichen und Ziffern am Anfang und Ende erfüllen die Regel nicht.
- Als Sonderzeichen anerkannt werden: ,!"§$%&/()=?{}[]\ und Leerzeichen

**Begründung**:

Einhaltung der [Bundesamt für Sicherheit in der Informationstechnik (BSI): Sichere Passwörter erstellen](https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Sichere-Passwoerter-erstellen/sichere-passwoerter-erstellen_node.html) Empfehlung

### Löschen eines Accounts

Beim Löschen eines Accounts werden alle damit verbundenen Daten gelöscht, einschließlich der Absage und Löschung von Events, bei denen der Nutzer als Organisator fungiert.

**Begründung**:

Schutz der Privatsphäre, der Datensicherheit und einer konsistenten Benutzererfahrung.

## Event-Richtlinien

Für die Veranstaltung eines Events muss ein verifizierter Nutzer die folgenden Informationen bereitstellen:

- Einen 5 - 50 Zeichen langen _Event-Namen_
- Eine 4 - 25 Zeichen lange _Adresszeile für Straße und Hausnummer_. Diese kann Buchstaben, Leerzeichen, Punkte, Bindestriche und Zahlen beinhalten.
- Eine 5-stellige _Postleitzahl_. Diese darf nur Ziffern beinhalten, wird aber letztendlich als String interpretiert um führende Nullen nicht zu verlieren.
- Einen 3 - 20 stelligen _Ort_. Darf Groß- und Kleinbuchstaben, Leerzeichen, Punkte und Bindestriche enthalten.
- Ein 3 - 20 stelliges _Land_. Darf Groß- und Kleinbuchstaben sowie Leerzeichen und Bindestriche enthalten.
- Eine _Uhrzeit_ im 24h Format. Stunden von 00 - 23, Minuten von 00 - 59.
- Ein _Datum_ im Format zwei Ziffern für den Tag, zwei Ziffern für den Monat, 4 Ziffern fürs Jahr

Die Plattform bietet außerdem eine optionale, bis zu 25 Zeichen lange _Adresszusatz_ Zeile unter der Zeile für Straße und Hausnummer, für die eingabe von zusätzlichen Infos wie z. B. ein Stockwerk oder eine Wohnungs-Nummer.

**Begründung**:

- 5 - 50 Zeichen für den _Event-Namen_ werden als angemessen angesehen. Dies sind weder zu wenig Zeichen (was zur Verwirrung der eingeladenen Gäste führen könnte), noch sind des zu viele Zeichen (es soll nur ein Event-Name, keine Event-Beschreibung eingegeben werden).
- 4 - 25 Zeichen für die Straße und Hausnummer _Adresszeile_ werden als ausreichend angesehen.
- 5-stellige _Postleitzahl_ restriktiert den Einsatz der Plattform auf Länder, in denen Postleitzahlen 5 Zeichen lang sind. Dies wird für die erste Version der Plattform als akzeptabel angesehen und kann in weiteren Ausbaustufen erweitert werden.
- 3 - 20 stelliger _Ort_ und Land mit Groß- und Kleinbuchstaben sowie Bindestrichen sind akzeptabel für die erste Version der Plattform. Es ist bekannt, dass die Plattform für den Einsatz in fremden Ländern mehr Zeichen-Typen unterstützten sollte. Dies kann in einer späteren Ausbaustufe erweitert werden.
- Für die _Uhrzeit_ und das _Datum_ wird die _Angular_ Standard-Funktionalität namens [DatePipe](https://angular.io/api/common/DatePipe) verwendet. Das Datums-Format richtet sich zunächst nach dem deutschen Zeit-Standard, der in DIN 5008 (z.B. TT.MM.YYYY) definiert ist. In einer späteren Ausbaustufe können im Rahmen einer spezialisten Lokalisierung noch weitere Zeit- und Datums-Formate integriert werden.
- Die optionale, bis zu 25 Zeichen lange _Adresszusatzzeile_ wird als notwendig angesehen, um insbesondere in Ballungsgebieten den Teilnehmern eines Events das auffinden des Veranstaltungsortes zu vereinfachen.

## Unterscheidung zwischen eigenem Event und Event als Teilnehmer

Ein Nutzer kann ein Event als _Event-Organisator_ veranstalten oder als _Event-Teilnehmer_ an einem Event teilnehmen. Die Plattform unterscheidet zwischen diesen beiden Rollen und bietet dem Nutzer unterschiedliche Ansichten und Funktionen an.

**Begründung**:

- Der _Event-Organisator_ kann das Event bearbeiten und löschen. Der _Event-Teilnehmer_ kann dies nicht.
- Der _Event-Organisator_ kann die Teilnehmerliste einsehen und Teilnehmer zu dem Event ein- und ausladen. Der _Event-Teilnehmer_ kann dies nicht.
- Der _Event-Teilnehmer_ kann dem Event zu- oder absagen. Der _Event-Organisator_ kann dies nicht.
- Der _Event-Teilnehmer_ kann die Adresse des Events als integrierte _Google-Maps_ Karte einsehen. Der _Event-Organisator_ kann dies nicht, da vorrausgesetzt wird, er kennt die Adresse bereits.
