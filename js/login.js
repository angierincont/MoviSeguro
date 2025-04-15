import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-pass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Bienvenido.");
      window.location.href = "main.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
