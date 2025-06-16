// Estado inicial
let productos = JSON.parse(localStorage.getItem('productos')) || [
  "Latte", "Capuchino", "Espresso", "Medialuna", "Muffin"
];
let comprados = parseInt(localStorage.getItem('comprados')) || 0;

// Guardar en localStorage
function guardarEstado() {
  localStorage.setItem('productos', JSON.stringify(productos));
  localStorage.setItem('comprados', comprados);
}

// Mostrar productos
function actualizarLista() {
  const lista = document.getElementById("lista-productos");
  lista.innerHTML = "";
  const filtro = document.getElementById("buscador").value.toLowerCase();
  productos
    .filter(p => p.toLowerCase().includes(filtro))
    .forEach((p, i) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = p;
      li.onclick = () => comprarProducto(i);
      lista.appendChild(li);
    });
  document.getElementById("disponibles").textContent = productos.length;
  document.getElementById("comprados").textContent = comprados;
  guardarEstado();
}

// Comprar producto
function comprarProducto(idx) {
  comprados++;
  productos.splice(idx, 1);
  actualizarLista();
}

// Agregar producto nuevo
function agregarProducto() {
  const input = document.getElementById("nuevo-producto");
  const nombre = input.value.trim();
  if (!nombre) return alert("Nombre requerido.");
  productos.push(nombre);
  input.value = "";
  actualizarLista();
}

// Reserva
document.getElementById("reserva-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const nom = document.getElementById("res-nombre").value;
  const fecha = document.getElementById("res-fecha").value;
  document.getElementById("res-confirm").textContent =
    `Reserva hecha para ${nom} el ${new Date(fecha).toLocaleString()}.`;
  this.reset();
});

// Contacto
document.getElementById("contacto-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("contact-email").value;
  document.getElementById("msg-confirm").textContent =
    `Gracias por contactarnos, te escribiremos a ${email}.`;
  this.reset();
});

// Google Maps
function iniciarMapa() {
  const loc = { lat: -34.6037, lng: -58.3816 }; // Buenos Aires, ejemplo
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: loc
  });
  new google.maps.Marker({ position: loc, map: map, title: "Café Latte" });
}

// Filtro en vivo
document.getElementById("buscador").addEventListener("input", actualizarLista);

// Mostrar sección activa y ocultar otras
function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => {
    sec.style.display = (sec.id === id) ? 'block' : 'none';
  });
  const destino = document.getElementById(id);
  if (destino) destino.scrollIntoView({ behavior: 'smooth' });
}

// Botones del menú
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const destino = link.getAttribute('href').replace('#', '');
    mostrarSeccion(destino);
    e.preventDefault();
  });
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  mostrarSeccion('inicio');
  actualizarLista();
});
