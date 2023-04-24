## Design Entscheidungen

## Verwendung von NX

Das Projekt verwendet das NX-Entwicklungs-Framework für die Verwaltung des Monorepos, der Codegenerierung und der Build- und Test-Workflows. NX ist ein flexibles Framework, das die Entwicklung von großen Anwendungen in einer monolithischen Architektur erleichtert.

**Begründung**:
Die Verwendung von NX bietet mehrere Vorteile für das Projekt, einschließlich:

- Monorepo-Verwaltung: NX erleichtert die Verwaltung von Code in einem Monorepo, da es eine konsistente Struktur für die Organisation von Code bietet und es einfach macht, Abhängigkeiten zwischen Projekten innerhalb des Monorepos zu verwalten.

- Codegenerierung: NX bietet leistungsfähige Tools für die automatisierte Generierung von Code, einschließlich der Generierung von Scaffolds für neue Komponenten, Services und Module.

- Build- und Test-Workflows: NX vereinfacht die Konfiguration von Build- und Test-Workflows für das gesamte Monorepo, einschließlich der Integration von Tools wie Jest und Cypress für Tests und der Bereitstellung von Artefakten für die Verwendung in einer Continuous-Integration/Continuous-Delivery-Pipeline.

- Skalierbarkeit: NX ist für die Entwicklung großer Anwendungen ausgelegt und ermöglicht es, ein Projekt in einer monolithischen Architektur zu skalieren, indem es eine klare Struktur für die Organisation von Code und Abhängigkeiten bietet.

## Verwendung von Client Server

Die Client-Server-Architektur wird für die Implementierung der Anwendung verwendet. Die Anwendung besteht aus einem Frontend-Client, der über das Internet auf einen Back-End-Server zugreift, um Daten und Funktionalität zu erhalten.

**Begründung**:
Die Verwendung der Client-Server-Architektur bietet mehrere Vorteile für das Projekt, einschließlich:

- Skalierbarkeit: Durch die Trennung der Anwendung in Frontend- und Backend-Komponenten kann jeder Teil der Anwendung unabhängig skaliert werden, um eine höhere Last zu bewältigen, ohne die Leistung des anderen Teils zu beeinträchtigen.

- Sicherheit: Die Verwendung einer Client-Server-Architektur ermöglicht es, Sicherheitsmaßnahmen wie Zugriffskontrolle und Verschlüsselung an der Serverseite zu implementieren, um die Anwendung vor Angriffen zu schützen.

- Wiederverwendbarkeit: Die Trennung der Anwendung in Frontend- und Backend-Komponenten ermöglicht es, Komponenten für andere Projekte wiederverwendbar zu machen. Zum Beispiel kann das Frontend für eine mobile App oder eine Desktop-App wiederverwendet werden, die auf die gleichen Back-End-Services zugreift.

## Verwendung eines RESTful-Webservices

Die Anwendung verwendet einen RESTful-Webservice zur Kommunikation zwischen dem Frontend-Client und dem Back-End-Server. Der Webservice implementiert das REST-Architekturmuster, das eine einfache, standardisierte Möglichkeit zur Übertragung von Daten und Funktionen zwischen verschiedenen Systemen bietet.

**Begründung**:
Die Verwendung eines RESTful-Webservices bietet mehrere Vorteile für das Projekt, einschließlich:

- Interoperabilität: RESTful-Webservices verwenden standardisierte HTTP-Methoden und Datenformate, was es verschiedenen Systemen und Programmiersprachen ermöglicht, miteinander zu kommunizieren.

- Skalierbarkeit: RESTful-Webservices ermöglichen die Skalierung der Anwendung, indem sie den Client und den Server entkoppeln und es dem Server ermöglichen, mehrere Anfragen gleichzeitig zu verarbeiten.

- Einfachheit: RESTful-Webservices sind einfach zu implementieren und zu nutzen, da sie auf standardisierten Methoden und Datenformaten basieren.

## Verwendung von Spring Boot

Die Anwendung verwendet das Spring Boot-Framework als Basis für die Implementierung des Back-End-Servers. Spring Boot ist ein Framework für die Java-Entwicklung, das die schnelle Entwicklung von produktionsbereiten Anwendungen durch Konventionen und automatisierte Konfigurationen ermöglicht.

**Begründung**:
Die Verwendung von Spring Boot bietet mehrere Vorteile für das Projekt, einschließlich:

- Schnelle Entwicklung: Spring Boot bietet eine umfangreiche Bibliothek von vorgefertigten Modulen und Konfigurationen, welche die Implementierung von Anwendungen beschleunigen können.

- Einfache Konfiguration: Spring Boot verwendet Konventionen und automatisierte Konfigurationen für die einfache konfiguration verschiedener Aspekte der Anwendung, ohne dass manuelle Eingriffe erforderlich sind.

- Erweiterbarkeit: Spring Boot ist einfach zu erweitern und bietet eine Vielzahl von Erweiterungen und Plugins, welche die Implementierung von zusätzlichen Funktionen erleichtern.

- Standardisierung: Spring Boot ist ein etabliertes Framework, das eine Standardisierung in der Java-Entwicklung fördert und somit eine erhöhte Wiederverwendbarkeit von Code und Komponenten ermöglicht.

## Verwendung von Maven

Das Projekt verwendet Apache Maven als Build-Management-Tool, um den Build-Prozess zu automatisieren, die Abhängigkeiten zu verwalten und die Bereitstellung der Server-Anwendung zu erleichtern. Maven ist ein Open-Source-Tool, das auf Java basiert und in der Lage ist, ein Projekt von der Kompilierung bis zur Bereitstellung zu verwalten.

**Begründung**:
Die Verwendung von Maven bietet mehrere Vorteile für das Projekt, einschließlich:

- Automatisierung: Maven automatisiert den Build-Prozess und ermöglicht eine schnelle, zuverlässige und wiederholbare Erstellung der Anwendung.

- Abhängigkeitsverwaltung: Maven verwaltet die Abhängigkeiten der Anwendung automatisch und stellt sicher, dass die richtigen Versionen von Bibliotheken und Frameworks verwendet werden.

- Erweiterbarkeit: Maven bietet eine Vielzahl von Plugins, die es einfach machen, zusätzliche Funktionalitäten zu integrieren, z.B. zur Code-Qualitätsprüfung, Testausführung oder Dokumentation.

- Standardisierung: Maven ist ein etabliertes Tool, das eine Standardisierung in der Java-Entwicklung fördert und somit eine erhöhte Wiederverwendbarkeit von Code und Komponenten ermöglicht.

## Verwendung von H2

Das Projekt verwendet eine integrierte H2-Datenbank für die lokale Entwicklung und Tests. H2 ist eine leichte, schnelle und plattformunabhängige Datenbank, welche in Java geschrieben wurde und eine einfache Vergleichbarkeit mit anderen JDBC-Datenbanken ermöglicht.

**Begründung**:

Die Verwendung einer H2 Datenbank bietet mehrere Vorteile für das Projekt, einschließlich:

- Einfache Einrichtung: H2 kann als eingebettete Datenbank direkt im Projekt verwendet werden, was eine schnelle Einrichtung und Konfiguration ermöglicht.

- Schnelligkeit: H2 ist eine schnelle Datenbank, die keine langen Initialisierungszeiten benötigt und schnell auf Anfragen reagiert.

- Plattformunabhängigkeit: H2 ist in Java geschrieben und somit plattformunabhängig. Es kann auf verschiedenen Betriebssystemen und Architekturen eingesetzt werden.

- Kompatibilität: H2 ist vergleichbar mit anderen JDBC-Datenbanken und ermöglicht so eine einfache Migration zu anderen, evtl. für den Betrieb besser geeigneten Datenbanken.

- Testfähigkeit: H2 eignet sich besonders gut für Integrationstests und automatisierte Tests, da die eingebettete Datenbank leicht in Testumgebungen gestartet werden kann.

## Verwendung von Angular

Das Projekt verwendet das Angular-Framework für die Implementierung des Frontends. Angular ist ein leistungsfähiges und umfassendes Framework für die Entwicklung von Single-Page-Anwendungen (SPAs).

**Begründung**:
Die Verwendung von Angular bietet mehrere Vorteile für das Projekt, einschließlich:

- Struktur: Angular bietet eine klare Struktur für die Organisation von Code, die es einfach macht, den Überblick über komplexe Anwendungen zu behalten.

- Templates: Angular bietet eine leistungsfähige Vorlagen-Engine für die Erstellung von dynamischen und reaktiven Benutzeroberflächen.

- Komponenten: Angular arbeitet mit Komponenten, die unabhängig voneinander entwickelt werden können und wiederverwendbar sind, was die Entwicklung von komplexen Anwendungen erleichtert.

- TypeScript: Angular ist in TypeScript geschrieben, was zu einer besseren Codequalität und -wartbarkeit führt und die Entwicklung insgesamt effizienter macht.

- Ökosystem: Angular verfügt über ein großes Ökosystem von Bibliotheken und Tools, welche die Entwicklung und Wartung von unserer Anwendung erleichtert

## Verwendung von NPM (Node Package Manager)

Das Projekt verwendet den Node Package Manager (NPM) als zentrales Tool zur Verwaltung von Abhängigkeiten und zur Automatisierung von Abläufen im Frontend-Entwicklungsprozess.

**Begründung**:
Die Verwendung von NPM bietet mehrere Vorteile für das Projekt, einschließlich:

- Verwaltung von Abhängigkeiten: NPM erleichtert die Verwaltung von Abhängigkeiten im Projekt und sorgt dafür, dass alle für das Frontend benötigten Bibliotheken und Tools auf dem neuesten Stand sind und gleiche Versionen konsistent verwendet werden.

- Automatisierung von Prozessen: NPM ermöglicht es Entwicklern, wiederholende Aufgaben im Entwicklungsprozess zu automatisieren, wie z.B. die Ausführung von Tests oder die Bereitstellung von Builds.

- Ökosystem: NPM verfügt über ein großes Ökosystem von Bibliotheken und Tools, die die Entwicklung und Wartung von Anwendungen erleichtern.

- Skalierbarkeit: NPM ist skalierbar und kann mit der Größe und Komplexität des Projekts wachsen, wodurch eine einfache Verwaltung und Entwicklung des Projekts möglich wird.

## Verwendung von NGRX

Das Projekt verwendet das NGRX-Framework zur Implementierung eines zentralen Stores und zur Verwaltung des Anwendungsstatus in der Angular-Applikation. NGRX ist eine Bibliothek, die Redux-Architekturprinzipien in Angular-Anwendungen implementiert.

**Begründung**:
Die Verwendung von NGRX bietet mehrere Vorteile für das Projekt, einschließlich:

- Zentralisierung des Anwendungsstatus: Durch die Verwendung von NGRX können alle Komponenten der Anwendung auf einen zentralen Store zugreifen, der den gesamten Anwendungsstatus verwaltet. Dadurch wird die Komplexität der Anwendung reduziert und die Wartbarkeit erhöht.

- Vorhersehbarkeit: NGRX basiert auf dem Redux-Muster, das eine klare Trennung von Anwendungsstatus und Benutzerinteraktion ermöglicht. Dadurch wird die Vorhersehbarkeit des Verhaltens der Anwendung verbessert und die Testbarkeit erleichtert.

## Verwendung von Cypress

Das Projekt verwendet das Cypress-Testing-Framework für die Automatisierung von End-to-End-Tests im Frontend.

**Begründung**:
Die Verwendung von Cypress bietet mehrere Vorteile für das Projekt, einschließlich:

- Integration: Cypress lässt sich nahtlos in die Continuous-Integration/Continuous-Delivery-Pipeline des Projekts integrieren und ermöglicht es dem Team, automatisierte Tests zu erstellen und auszuführen, bevor Code in die Produktion übernommen wird.

## Verwendung von Tailwind CSS

Das Projekt verwendet das Tailwind CSS Framework für die Gestaltung des Frontends. Tailwind ist ein Utility-First CSS-Framework, das es Entwicklern ermöglicht, schnell und einfach responsive Benutzeroberflächen zu erstellen.

**Begründung**:
Die Verwendung von Tailwind bietet mehrere Vorteile für das Projekt, einschließlich:

- Effizienz: Tailwind bietet eine Vielzahl von vordefinierten Utility-Klassen um schneller und effizienter zu arbeiten.

- Flexibilität: Tailwind ist sehr flexibel und erlaubt es Designs zu erstellen, ohne aufwendige CSS-Regeln schreiben zu müssen.

- Responsivität: Tailwind verfolgt den Mobile-First Ansatz und erleichtert die Erstellung von responsiven Designs für verschiedene Geräte.

## Verwendung von GitHub

Das Projekt verwendet GitHub als Code-Repository und Kollaborationsplattform. GitHub ist eine Cloud-basierte Plattform, die es Entwicklern ermöglicht, Code zu teilen, zu speichern und zusammenzuarbeiten.

**Begründung**:
Die Verwendung von GitHub bietet mehrere Vorteile für das Projekt, einschließlich:

- Kollaboration: GitHub bietet eine benutzerfreundliche und intuitive Plattform für die Zusammenarbeit zwischen Entwicklern, die es einfach macht, Code zu teilen, zu kommentieren und zusammenzuarbeiten.

- Versionskontrolle: GitHub bietet eine leistungsfähige Versionskontrollfunktion, die es ermöglicht, verschiedene Versionen des Codes zu speichern und bei Bedarf wiederherzustellen.

- Code-Review: GitHub bietet eine integrierte Code-Review-Funktion, die es Entwicklern ermöglicht, den Code zu überprüfen und Feedback zu geben.

- Integrationen: GitHub bietet Integrationen mit einer Vielzahl von Tools und Services, die die Entwicklung und Wartung von Anwendungen erleichtern, wie z.B. Continuous Integration/Continuous Deployment (CI/CD) Tools.

## Verwendung von PlantUML

Das Projekt verwendet PlantUML als Werkzeug für die Erstellung von UML-Diagrammen. PlantUML ist ein Open-Source-Tool, das es einfach macht, UML-Diagramme in verschiedenen Formaten zu erstellen und zu exportieren.

**Begründung**:
Die Verwendung von PlantUML bietet mehrere Vorteile für das Projekt, einschließlich:

- Einfache Syntax: PlantUML verwendet eine einfache, textbasierte Syntax, um UML-Diagramme zu erstellen.

- Flexibilität: PlantUML unterstützt verschiedene Arten von UML-Diagrammen, einschließlich Klassendiagrammen, Sequenzdiagrammen und Zustandsdiagrammen, sowie benutzerdefinierte Diagrammtypen.

- Integration: PlantUML kann leicht in andere Tools und Workflows integriert werden, z.B. in IDEs, CI/CD-Pipelines oder Dokumentationsprozesse.

- Open Source: PlantUML ist ein Open-Source-Tool und bietet daher eine breite Community-Unterstützung und regelmäßige Updates.

- Export: PlantUML bietet eine Vielzahl von Exportoptionen, um die erstellten Diagramme in verschiedenen Formaten zu exportieren, z.B. als Bild-, PDF- oder ASCII-Art-Datei.

## Anzeigename-Richtlinien

Für Anzeigenamen gelten die folgenden Richtlinien:

- Ein Anzeigename kann zwischen 5 und 20 Zeichen enthalten
- Alle Zeichen sind zulässig

Begründung:

5 - 20 Zeichen bieten Nutzern eine ausreichende Länge ihres Anzeigename, um einen ihren Wünschen entsprechenden Anzeigename zu wählen.

Für einen "Echte-Welt" Einsatz würden wir Zeichen wie ASCII- und UTF-Kontrollsequenzen, führende und folgende Leerzeichen, sowie mehrfach aufeinander folgende Leerzeichen verbieten. Die Entwicklung eines Algorithmus für die Prüfung dieser Regeln (insbesondere der Ausschluss aller nicht erlaubten Zeichen) würde allerdings den Umfang der Anwendung in seiner ersten Ausbaustufe sprengen.

## E-Mail-Adresse Richtlinien

E-Mail Adressen müssen dem HTML Standard für Valide E-Mail Adressen entsprechen und vom Angular Framework als valide empfunden werden.

Begründung:

Das verwendete Angular Framework hat einen [email Validator](https://angular.io/api/forms/Validators#email) für diesen Einsatzzweck, der zur Validierung von E-Mail-Adressen in Formularen mit geringem Entwickleraufwand eingesetzt werden kann.

## Passwort-Richtlinien für Benutzer

Passwörter für Benutzer müssen die folgenden Anforderungen erfüllen:

- Mindestens 8 Zeichen lang sein
- Maximal 30 Zeichen lang sein
- 4 Zeichenarten verwenden (je min. 1 Großbuchstaben, Kleinbuchstaben, Ziffer und Sonderzeichen)
- Die 1 benötigte Ziffer und das 1 benötigte Sonderzeichen dürfen nicht am Anfang oder Ende des Passworts stehen. Auch eine Folge von Sonderzeichen und Ziffern am Anfang und Ende erfüllen die Regel nicht.
- Als Sonderzeichen anerkannt werden: ,!"§$%&/()=?{}[]\ und Leerzeichen

Begründung:

Einhaltung der [Bundesamt für Sicherheit in der Informationstechnik (BSI): Sichere Passwörter erstellen](https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Accountschutz/Sichere-Passwoerter-erstellen/sichere-passwoerter-erstellen_node.html) Empfehlung
