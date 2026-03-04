<div align="center">

# 🔒 HashChat | End-to-End Encrypted Anonymous Chat App

### Serverless, No-Login, Ephemeral Messaging built with Web Crypto API

[![License](https://img.shields.io/badge/license-MIT-purple.svg)](./LICENSE)
[![Firebase](https://img.shields.io/badge/Firebase-10.8.1-orange)](https://firebase.google.com)
[![Encryption](https://img.shields.io/badge/Encryption-AES--GCM-brightgreen)](#)
[![Status](https://img.shields.io/badge/status-active-success)](https://vanshdeveloper.github.io/hashchat)

*A privacy-first, zero-setup burner chat application. Generate an instant room, share the encrypted link, and communicate securely. When the tab closes, the history vanishes forever.*

---

[Live Demo](https://vanshdeveloper.github.io/hashchat) • [Features](#-key-features) • [How It Works](#-how-it-works) • [Tech Stack](#-tech-stack) • [Setup](#-setup)

</div>

---

## 🔥 Key Features

### 🔐 True End-to-End Encryption (E2EE)
Messages are locked using the browser's native **Web Crypto API (AES-GCM)** before they ever leave your device. The room's URL hash acts as the cryptographic key. Even the database administrator (or Firebase) only sees randomized gibberish.

### 🗑️ Ephemeral & Burner-Ready (Zero Trace)
Designed for pure, untraceable communication. Messages are completely ephemeral—they exist only in memory. Closing the browser tab instantly purges the chat. No server logs, no database history, no evidence.

### 👤 100% Anonymous (No Login Required)
No emails, no phone numbers, no OAuth, and no IP logging. Just click generate and start typing.

### ⚡ Real-Time Serverless Architecture
Powered by Firebase Realtime Database for instantaneous WebSocket message delivery without the need to maintain a traditional backend server.

---

## 📖 How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 1. Generate  │────▶│  2. Invite │────▶│  3. Vanish │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  Create unique      Share the hash      Close tab &
  AES-GCM Key        with your peer      messages vanish
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) | Structure |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) | Styling |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) | Logic & Interactivity |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black) | Real-time Database & Sync |

---

## 🚀 Setup

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Firebase account (for database configuration)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/hashchat.git
cd hashchat
```

2. **Configure Firebase**

   - Create a project at [Firebase Console](https://console.firebase.google.com)
   - Enable **Realtime Database**
   - Copy your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. **Update the config**

   Open `index.html` and replace the Firebase config with your own:

```javascript
const firebaseConfig = {
    // Your config here
};
```

4. **Run locally**

   Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

5. **Deploy**

   Deploy to any static hosting service:
   - [Vercel](https://vercel.com)
   - [Netlify](https://netlify.com)
   - [GitHub Pages](https://pages.github.com)

---

## 📁 Project Structure

```
hashchat/
├── index.html         # Main HTML file with all structure
├── script.js         # JavaScript logic (encryption, Firebase, chat)
├── stylesheet.css    # All styling (dark theme, animations)
└── README.md         # This file
```

---

## 🔐 Security Notes

- Messages are end-to-end encrypted before being stored in Firebase Realtime Database
- Each room has a unique hash that acts as the room ID
- The encryption key is derived from the room URL - only those with the link can decrypt messages
- No user authentication — anyone with the link can join
- Messages are removed from memory when the tab is closed
- Even Firebase cannot read your message contents - they are stored as encrypted data
- For production use, consider implementing additional security rules in Firebase

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com) for the real-time database
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) font by Google Fonts
- Inspired by privacy-first messaging apps

---

<div align="center">

**Made with 🔒 for private conversations**

*HashChat — When you're done, it's gone.*

</div>

