// Función para cargar los nombres de los libros leyendo directamente la carpeta 'Libros'
function cargarBiblioteca() {
  fetch('listar_libros.php') // Hacer una solicitud al archivo PHP
    .then(response => response.json()) // Convertir la respuesta en JSON
    .then(data => {
      const tabla = document.querySelector('.biblioteca table');
      
      data.forEach((libro, index) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        const enlace = document.createElement('a');
        enlace.href = '#';
        enlace.textContent = libro.replace('.txt', ''); // Mostrar el nombre del libro sin extensión
        enlace.setAttribute('onclick', `cargarLibro('${libro}')`); // Usar el nombre del archivo
        cell.appendChild(enlace);
        row.appendChild(cell);
        tabla.appendChild(row);
      });
    })
    .catch(error => console.error('Error al cargar la biblioteca:', error));
}

// Función para cargar el contenido del libro seleccionado
function cargarLibro(nombreArchivo) {
  fetch(`Libros/${nombreArchivo}`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('contenidoLibro').innerHTML = `<p>${data}</p>`;
    })
    .catch(error => console.log('Error al cargar el libro:', error));
}

// Función para aplicar los estilos (cursiva y letra capital)
function aplicarEstilos() {
  // Selecciona todos los párrafos dentro del div con id "contenidoLibro"
  const parrafos = document.querySelectorAll('#contenidoLibro p');

  parrafos.forEach(parrafo => {
      let textoOriginal = parrafo.innerHTML;

      // Regla para aplicar cursiva a todo lo que esté entre comillas
      textoOriginal = textoOriginal.replace(/"([^"]*)"/g, '<span class="cursiva">"$1"</span>');

      // Regla para aplicar letra capital a la primera letra después de un punto que no esté entre comillas
      textoOriginal = textoOriginal.replace(/\.([^"|\s])/g, function(match, letra) {
          return `. <span class="letra-capital">${letra}</span>`;
      });

      // Actualiza el contenido del párrafo con los nuevos estilos
      parrafo.innerHTML = textoOriginal;
  });
}

// Observador para detectar cambios en el contenido del div con id "contenidoLibro"
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
          aplicarEstilos(); // Aplica los estilos cuando cambia el contenido del div
      }
  });
});

// Configuración del observador: observar cambios en los hijos del div #contenidoLibro
observer.observe(document.getElementById('contenidoLibro'), { childList: true });

// Cargar la biblioteca al cargar la página
window.onload = cargarBiblioteca;

// Toggle the visibility of the biblioteca when the hamburger is clicked
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const biblioteca = document.querySelector('.biblioteca');

  if (hamburger && biblioteca) {
      hamburger.addEventListener('click', function() {
          biblioteca.classList.toggle('active');
      });
  }
});
