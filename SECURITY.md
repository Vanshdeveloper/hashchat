# 🔐 Security Policy & Disclaimer

## ⚠️ Important Disclaimer

**BY USING HASHCHAT, YOU ACKNOWLEDGE AND AGREE THAT:**

- This application is provided "AS IS" without warranty of any kind, express or implied.
- The developer(s) of HashChat **shall not be held responsible** for any:
  - Data loss or leakage
  - Privacy breaches
  - Security vulnerabilities
  - Misuse of the application
  - Illegal activities conducted through the platform
  - Any damages arising from the use or inability to use this application

- Users are solely responsible for their own actions and communications.
- This tool is intended for lawful, ethical purposes only.

**USE AT YOUR OWN RISK.**

---

## 🔒 Security Features

### What's Protected ✅

| Feature | Description |
|---------|-------------|
| **End-to-End Encryption** | Messages are encrypted on your device before transmission - only participants with the room link can decrypt them |
| **No Account Required** | No personal data is collected or stored |
| **No IP Tracking** | User IP addresses are not logged |
| **Ephemeral Messages** | Messages exist only in memory during active session |
| **Unique Room Hashes** | Each chat room uses a unique 7-character identifier |
| **Firebase Cannot Read** | Even Firebase servers cannot decrypt your message contents |

### What's NOT Protected ❌

| Vulnerability | Reason |
|---------------|--------|
| **Link Sharing** | Anyone with the room link can join |
| **No Authentication** | No way to verify user identity |
| **Browser History** | URLs may be cached in browser history |
| **Screen Recording** | Users can screenshot/record conversations |
| **Network Traffic** | Network administrators can see connection to Firebase |

---

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please:

1. **Do NOT** report it in public issues
2. Email the developer directly (if contact is available)
3. Provide detailed steps to reproduce
4. Wait for acknowledgment before disclosure

---

## 📋 Best Practices for Users

### ✅ Recommended
- Use private/incognito browsing mode
- Clear browser cache after using HashChat
- Share room links only via secure channels
- Close the tab immediately after finishing conversation

### ❌ Not Recommended
- Sharing sensitive personal information
- Using HashChat for illegal activities
- Accessing through untrusted networks
- Leaving chat rooms open unattended

---

## 🔧 Firebase Security Rules

For production deployments, consider implementing these Firebase rules:

```
json
{
  "rules": {
    ".read": false,
    ".write": false,
    "rooms": {
      "$roomId": {
        ".read": true,
        ".write": true,
        ".validate": "newData.isString()",
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

---

## 📜 Legal

This application is provided for legitimate, legal purposes only. Users must comply with:
- Local laws and regulations
- Terms of service of third-party services (Firebase)
- Ethical usage guidelines

Any misuse of this tool for harassment, threats, illegal activities, or other harmful purposes is strictly prohibited.

---

*Last updated: 2026*
*Version: 1.0.0*
