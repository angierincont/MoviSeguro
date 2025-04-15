import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-pass").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        email: user.email,
        favoritos: [],
        reportes: []
      });
      alert("Registro exitoso. Puedes iniciar sesión.");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
