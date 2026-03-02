# 📚 HashChat Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [How It Works](#how-it-works)
4. [Features](#features)
5. [Architecture](#architecture)
6. [Configuration](#configuration)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)
9. [FAQ](#faq)

---

## Introduction

### What is HashChat?

HashChat is a **private, anonymous chat application** that allows users to create instant chat rooms without any registration. Messages are not end-to-end encrypted and disappear when the chat is closed.

### Key Highlights

| Feature | Description |
|---------|-------------|
| 🔒 **No Registration** | Use instantly without creating an account |
| 🗑️ **Self-Destructing** | Messages vanish when you close the tab |
| ⚡ **Instant Rooms** | Generate a link and start chatting in seconds |

---

## Getting Started

### Quick Start

1. **Open the application** in your browser
2. **Click** "Generate Private Link"
3. **Share** the generated link with friends
4. **Start chatting** securely
5. **Close tab** when done - all messages are deleted

### System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Browser | Chrome, Firefox, Safari, Edge (latest 2 versions) | Chrome/Edge |
| Internet | 3G connection | Broadband |
| JavaScript | Enabled | Enabled |

---

## How It Works

### The Workflow

```
User A (Creator)                    User B (Joiner)
     │                                    │
     ▼                                    │
┌────────────────┐                        │
│ Generate Link  │                        │
│ #ABC1234       │                        │
└───────┬────────┘                        │
        │                                 │
        │  Share URL:                     │
        │  hashchat.room/#ABC1234         │
        │──────────────────────────────▶ |
        │                                 │
        │                          ┌──────────────┐
        │                          │ Open Link    │
        │                          │ Join Room    │
        │                          └──────────────┘
        │                                 │
        ▼                                 ▼
┌────────────────────────────────────────────────┐
│           Firebase Realtime Database           │
│           (Encrypted Message Transfer)         │
└────────────────────────────────────────────────┘
```

### Room Generation Process

1. **Click** "Generate Private Link" button
2. **System generates** a random 7-character alphanumeric hash
3. **URL updates** to include the hash (e.g., `site.com/#ABC1234`)
4. **Room created** in Firebase database
5. **Share** the link with anyone you want to chat with

### Message Flow

```
[User types message]
        │
        ▼
[Encrypt with sender ID]
        │
        ▼
[Push to Firebase: rooms/{roomId}/messages]
        │
        ▼
[Firebase triggers onValue listener]
        │
        ▼
[Decrypt & Display message]
```

---

## Features

### 1. Zero Trace
- Messages exist only in browser memory
- Closing the tab removes all messages
- No server-side message history
- No database persistence

### 2. Truly Anonymous
- No email verification
- No phone number required
- No IP logging
- Randomly generated user IDs

### 3. Room Management
- **Auto-delete**: Room data removed on disconnect
- **No password**: Link IS the access credential
- **No admin panel**: All management via URL

---

## Architecture

### Technology Stack

```
┌─────────────────────────────────────────────────┐
│                  Frontend                       │
├─────────────────────────────────────────────────┤
│  HTML5  │  CSS3  │  Vanilla JavaScript (ES6+)   │
└─────────┴────────┴──────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│                   Backend                       │
├─────────────────────────────────────────────────┤
│              Firebase Services                  │
├──────────────┬──────────────┬───────────────────┤
│  Realtime    │   Hosting    │    Authentication │
│  Database    │   (Optional) │    (Not Used)     │
└──────────────┴──────────────┴───────────────────┘
```

### File Structure

```
HashChat/
├── index.html          # Main application file
├── stylesheet.css      # All styling
├── README.md           # Project overview
├── SECURITY.md         # Security policy
├── DOCS.md            # This file
└── .gitignore         # Git config
```

### Data Structure

```
javascript
// Firebase Database Schema
{
  "rooms": {
    "ABC1234": {
      "messages": {
        "-Nk5x...": {
          "text": "Hello!",
          "senderId": "abc123xy",
          "timestamp": 1706123456789
        }
      }
    }
  }
}
```

---

## Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Realtime Database**
4. Set database rules (see below)
5. Copy configuration to `index.html`

### Database Rules

```
json
{
  "rules": {
    ".read": "auth === null",
    ".write": "auth === null",
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        "messages": {
          "$messageId": {
            ".validate": "newData.hasChildren(['text', 'senderId', 'timestamp'])"
          }
        }
      }
    }
  }
}
```

### Environment Variables

For production, create a `.env` file:

```
env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
```

---

## Deployment

### Option 1: GitHub Pages (Free)

```
bash
# Fork this repo
# Go to Settings > Pages
# Select "main" branch
# Save and get your URL
```

### Option 2: Netlify (Recommended)

```
bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 3: Vercel

```
bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 4: Custom Server

```
bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Messages not sending | Check internet connection & Firebase config |
| Can't join room | Verify the room link is correct |
| Page not loading | Clear browser cache & disable extensions |
| Firebase error | Check API keys and database rules |

### Debug Mode

Enable console logging:

```
javascript
// Add to index.html
localStorage.setItem('debug', 'true');

// Check browser console for logs
```

### Getting Help

1. Check [FAQ](#faq) below
2. Search existing issues
3. Create a new issue with:
   - Browser name & version
   - Error message
   - Steps to reproduce

---

## FAQ

### Q: Is HashChat truly anonymous?
**A:** Yes. No accounts, no IP tracking, no personal data required. The only identifier is a random ID generated per session.

### Q: Where are messages stored?
**A:** Messages exist only in:
- Your browser's memory
- Other participants' browser memory
- Firebase temporarily (until room is closed)

### Q: Can I recover deleted messages?
**A:** No. Once the tab is closed or you leave the room, all messages are permanently deleted.

### Q: Can I use HashChat for business?
**A:** Yes, but with caution. This is designed for casual, private conversations. For sensitive business communications, use dedicated encrypted messaging platforms.

### Q: How long do rooms last?
**A:** Rooms exist until all participants leave. The `onDisconnect` handler removes room data when the last user leaves.

### Q: Is there a message character limit?
**A:** No hard limit, but keep messages under 10,000 characters for optimal performance.

### Q: Can I send files?
**A:** Currently no. Text messages only. This feature may be added in future updates.

---

## License

MIT License - See [LICENSE](./LICENSE) file for details.

---

## Credits

- [Firebase](https://firebase.google.com) - Backend services
- [Google Fonts](https://fonts.google.com) - Space Grotesk font
- All contributors and users

---

*Documentation Version: 1.0.0*
*Last Updated: 2026*
