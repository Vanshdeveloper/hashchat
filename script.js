// 0. Import the Firebase tools from Google's servers
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, onValue, onDisconnect, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// 1. YOUR VIP ACCESS BADGE 
const firebaseConfig = {
    apiKey: "AIzaSyBT7Iolk2GC6WDcHhBcSbyibX9rRy4t0bw",
    authDomain: "hashchat-f2658.firebaseapp.com",
    projectId: "hashchat-f2658",
    storageBucket: "hashchat-f2658.firebasestorage.app",
    messagingSenderId: "377264995619",
    appId: "1:377264995619:web:0649827cedeb7b49fde096",
    measurementId: "G-MLXWJ90L2D"
};

// 2. Boot up the Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let roomID = "";
const mySecretID = Math.random().toString(36).substring(2, 10);

// ==========================================
// 🛡️ E2EE CRYPTO ENGINE (NATIVE BROWSER API)
// ==========================================
async function getCryptoKey(password) {
    const encoder = new TextEncoder();
    const hash = await window.crypto.subtle.digest("SHA-256", encoder.encode(password));
    return window.crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function encryptMessage(realText) {
    const key = await getCryptoKey(roomID); // Uses current roomID as the secret key
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedText = new TextEncoder().encode(realText);
    const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, encodedText);
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...combined));
}

async function decryptMessage(base64Text) {
    try {
        const key = await getCryptoKey(roomID); // Uses current roomID as the secret key
        const combined = new Uint8Array(atob(base64Text).split("").map(c => c.charCodeAt(0)));
        const iv = combined.slice(0, 12);
        const data = combined.slice(12);
        const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, data);
        return new TextDecoder().decode(decrypted);
    } catch (error) {
        // If it fails (e.g. old unencrypted message), just return a locked string
        return "🔒 [Encrypted]";
    }
}
// ==========================================

// 3. Check if joining an existing room on page load
if (window.location.hash) {
    roomID = window.location.hash.substring(1);
    showChatScreen();
    document.getElementById('room-id-display').textContent = `/chat#${roomID}`;
    startListeningForMessages();
}

// Mobile Menu Toggle
window.toggleMobileMenu = function () {
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    mobileNav.classList.toggle('active');
}

// Close mobile menu when clicking on overlay
document.querySelector('.mobile-menu-overlay').addEventListener('click', function () {
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    mobileNav.classList.remove('active');
});

// 4. Create a new room with a 7-character ID
window.createNewRoom = function () {
    roomID = Math.random().toString(36).substring(2, 9).toUpperCase();
    window.location.hash = roomID;
    showChatScreen();
    document.getElementById('room-id-display').textContent = `/chat#${roomID}`;
    startListeningForMessages();
}

// UI Toggle Helper
function showChatScreen() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('chat-page').style.display = 'flex';
}

// Modern Copy to Clipboard
window.copyHash = function () {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied! Send it to your friend.");
    });
}

// 5. Send Message Logic (NOW ASYNC & ENCRYPTED)
window.sendMessage = async function () {
    const inputField = document.getElementById('message-input');
    const message = inputField.value.trim();

    if (!message) return; // Stop if the box is empty

    // Clear the text box instantly for good UX
    inputField.value = "";

    // Encrypt the message before sending
    const scrambledText = await encryptMessage(message);

    const messagesRef = ref(db, 'rooms/' + roomID + '/messages');

    // Push the ENCRYPTED data
    push(messagesRef, {
        text: scrambledText,
        senderId: mySecretID,
        timestamp: Date.now()
    });
}

function startListeningForMessages() {
    const roomRootRef = ref(db, 'rooms/' + roomID);
    const messagesRef = ref(db, 'rooms/' + roomID + '/messages');

    onDisconnect(roomRootRef).remove();

    // Make the callback async so we can wait for decryption
    onValue(messagesRef, async (snapshot) => {
        let chatContainer = document.getElementById('chat-stream');

        if (!chatContainer) {
            console.error("ERROR: Could not find <div id='chat-stream'> in your HTML!");
            return;
        }

        chatContainer.innerHTML = "";

        // Collect all messages first
        const messagesToProcess = [];
        snapshot.forEach((childSnapshot) => {
            messagesToProcess.push(childSnapshot.val());
        });

        // Loop through and decrypt them one by one
        for (const msgData of messagesToProcess) {
            // Decrypt the text back to normal
            const plainText = await decryptMessage(msgData.text);

            const bubbleClass = (msgData.senderId === mySecretID) ? 'outgoing' : 'incoming';
            const timeString = new Date(msgData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            let messageElement = document.createElement('div');
            messageElement.classList.add('message', bubbleClass);

            // Render using the plainText
            messageElement.innerHTML = `<span class="message-time">${timeString}</span>
                                        <div class="message-bubble">${plainText}</div>`;

            chatContainer.appendChild(messageElement);
        }

        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
}

// Listen for the "Enter" key
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});