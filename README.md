<div align="center">

# 🔒 HashChat

### Private Anonymous Chat - Where Conversations Disappear

[![License](https://img.shields.io/badge/license-MIT-purple.svg)](./LICENSE)
[![Firebase](https://img.shields.io/badge/Firebase-10.8.1-orange)](https://firebase.google.com)
[![Status](https://img.shields.io/badge/status-active-success)](https://hashchat.room)

*Instant, anonymous rooms. No history. No traces. Just clear, secure communication that disappears when you're done.*

---

[Demo](https://vanshdeveloper.github.io/hashchat) • [Features](#-features) • [How It Works](#-how-it-works) • [Tech Stack](#-tech-stack) • [Setup](#-setup)

</div>

---

## 🔥 Features

### 🗑️ Zero Trace
Messages exist only in memory — closing the tab purges them instantly. No server logs, no history, no evidence.

### 🔐 Client-Side Encryption
Data is encrypted before leaving your device. End-to-end encryption ensures only participants can read messages.

### 👤 Truly Anonymous
No email, no phone numbers, no IP tracking. No accounts to create. Just pure, untraceable communication.

### ⚡ Instant Rooms
Generate a unique private link and start chatting immediately. No waiting, no setup.

### 📱 Cross-Platform
Works seamlessly on desktop and mobile browsers.

---

## 📖 How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  1. Generate │────▶│  2. Invite │────▶│  3. Vanish  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  Create unique      Share the link      Messages are
  7-char hash        with friends        deleted forever
```

### The Workflow

| Step | Action | Description |
|------|--------|-------------|
| **1** | Generate | Click "Generate Private Link" to create a unique 7-character hash |
| **2** | Invite | Share the link with your friend — only those with the link can join |
| **3** | Vanish | When done, simply leave the chat. It's deleted immediately. |

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
   
```
bash
   git clone https://github.com/yourusername/hashchat.git
   cd hashchat
   
```

2. **Configure Firebase**
   
   - Create a project at [Firebase Console](https://console.firebase.google.com)
   - Enable **Realtime Database**
   - Copy your Firebase config:
   
```
javascript
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
   
```
javascript
   const firebaseConfig = {
       // Your config here
   };
   
```

4. **Run locally**
   
   Simply open `index.html` in your browser, or use a local server:
   
```
bash
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
├── stylesheet.css     # All styling (dark theme, animations)
└── README.md          # This file
```

---

## 🔐 Security Notes

- Messages are stored in Firebase Realtime Database
- Each room has a unique hash that acts as the room ID
- No user authentication — anyone with the link can join
- Messages are removed from memory when the tab is closed
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
