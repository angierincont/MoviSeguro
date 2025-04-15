import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCK4aZhiLOel36JSblUWA9y-dRDFEC59QU",
    authDomain: "moviseguro.firebaseapp.com",
    projectId: "moviseguro",
    storageBucket: "moviseguro.firebasestorage.app",
    messagingSenderId: "947196872279",
    appId: "1:947196872279:web:780e3966a700f5afc88512"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
