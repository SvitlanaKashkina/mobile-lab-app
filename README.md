# Mobile Lab App

**Mobile Lab App** ist eine mobile Anwendung zur Kommunikation, entwickelt mit React Native (Expo).
Sie demonstriert praxisnahe Funktionen wie Benutzerregistrierung und -authentifizierung, Benutzerprofil mit Foto, Echtzeit-Chat, News-System, Feedback per E-Mail und Push-Benachrichtigungen.
Es handelt sich um den Client-Teil (Frontend). Der Server-Teil (Backend) wird in einem separaten Repository "mobile-lab-app-server" gezeigt und beschrieben.
Dieses Projekt wurde als Teil meines Portfolios entwickelt.

---

## Features

- User Registration & Authentication
- Profile with Photo Upload
- Real-time Chat (Text & Images) via WebSockets
- News System implemented in Cards (Text & Images) via RESTful API
- Feedback submission via Email
- Push Notifications
- Connection to Server (Backend) via Node.js + Express (REST API, WebSockets)
- Connection to PostgreSQL Database via Prisma ORM (CRUD operations)
- Secure Client-Server Communication via HTTPS (SSL Certificate)

---

## Architektur

Das Projekt basiert auf einer klassischen **Client-Server-Architektur**:

- **Client (Frontend):** React Native App (Expo), kommuniziert über RESTful APIs und WebSockets mit dem Server.
- **Server (Backend):** Node.js + Express mit MVC-Struktur (Routes, Controller, Datenbank-Models über Prisma).
- **Datenbank:** PostgreSQL.

Die Echtzeit-Funktionalität wird durch WebSockets (Socket.IO) für den Chat umgesetzt.
Sichere Kommunikation erfolgt über HTTPS mit SSL-Zertifikat.

---

## Technologien

- React Native (Expo)
- JavaScript (ES6)
- NativeBase UI
- Axios (RESTful API)
- WebSockets / Socket.IO
- Expo Notifications
- SSL-Zertifikat für HTTPS-Verbindungen
- Visual Studio Code
- GitHub

---

## Contact

Für Karrierechancen, Zusammenarbeit oder Fragen zum Projekt können Sie mich gerne kontaktieren:

- 📧 Email: [k.svitlana@web.de](mailto:k.svitlana@web.de)
- 🔗 LinkedIn: [Svitlana Kashkina](https://www.linkedin.com/in/svitlana-kashkina-12a0922b4/)
