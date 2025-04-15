
  function activarUbicacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        alert(`Ubicación actual:\nLat: ${position.coords.latitude}\nLng: ${position.coords.longitude}`);
      }, () => {
        alert("No se pudo obtener la ubicación.");
      });
    } else {
      alert("Geolocalización no está soportada.");
    }
  }
  
  function iniciarReporte() {
    const seleccionados = Array.from(document.querySelectorAll('input[name="evento"]:checked'))
      .map(e => e.value);
  
    if (seleccionados.length === 0) {
      alert("Por favor seleccione al menos un evento para reportar.");
      return;
    }
  
    alert("¡Gracias! Has reportado: " + seleccionados.join(", "));
    // Aquí puedes guardar en Firebase si lo deseas
  }
  
  function llamarEmergencia() {
    const confirmacion = confirm("¿Deseas llamar a emergencias?");
    if (confirmacion) {
      alert("Llamando al número de emergencia...");
      // Aquí podrías abrir marcador si es móvil o simular acción
    }
  }
  

  function agregarAFavoritos(ruta) {
    alert(`La ruta ${ruta} fue añadida a favoritos.`);
    // Aquí puedes usar localStorage o guardar en Firebase
  }
  import { auth } from './firebase.js';
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

window.cerrarSesion = function () {
  signOut(auth).then(() => {
    alert("Sesión cerrada.");
    window.location.href = "login.html";
  }).catch((error) => {
    alert("Error al cerrar sesión: " + error.message);
  });
}


import { auth, database } from './firebase.js';
import { ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

window.iniciarReporte = function () {
  const eventos = Array.from(document.querySelectorAll('input[name="evento"]:checked'))
    .map(e => e.value);

  if (eventos.length === 0) {
    alert("Selecciona al menos un evento.");
    return;
  }

  const user = auth.currentUser;
  if (!user) return alert("No has iniciado sesión.");

  const reporteRef = ref(database, 'reportes/' + user.uid);
  push(reporteRef, {
    eventos: eventos,
    fecha: new Date().toISOString()
  });

  alert("¡Reporte enviado!");
}

/*ruta js */
import { auth, database } from './firebase.js';
import { ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

window.agregarAFavoritos = function (ruta) {
  const user = auth.currentUser;
  if (!user) return alert("No has iniciado sesión.");

  const favRef = ref(database, 'favoritos/' + user.uid);
  push(favRef, {
    ruta: ruta,
    fecha: new Date().toISOString()
  });

  alert(`La ruta ${ruta} fue añadida a favoritos.`);
}

/* estaciones*/
import { database } from './firebase.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const lista = document.getElementById("lista-estaciones");

const estacionesRef = ref(database, 'estaciones');
onValue(estacionesRef, (snapshot) => {
  lista.innerHTML = "";
  const data = snapshot.val();
  for (let id in data) {
    const li = document.createElement("li");
    li.textContent = `${data[id].nombre} - Riesgo: ${data[id].riesgo}`;
    lista.appendChild(li);
  }
});
