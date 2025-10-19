// Obtener el parámetro ?id= desde la URL
const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("id"));

fetch('productos.json')
  .then(response => response.json())
  .then(productos => {
    const producto = productos.find(p => p.id === idProducto);
    const contenedor = document.getElementById('producto');

    if (!producto) {
      contenedor.innerHTML = `<p class="text-center text-red-500 text-xl">Producto no encontrado</p>`;
      return;
    }

    // Crear la galería de imágenes
    const galeria = producto.imagenes
      .map(img => `<img src="${img}" class="w-1/3 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer">`)
      .join('');

    // Configurar el modal
    const modal = document.getElementById('modalImagen');
    const imagenAmpliada = document.getElementById('imagenAmpliada');

    // Cerrar el modal al hacer click fuera de la imagen
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });

    contenedor.innerHTML = `
      <div class="bg-white shadow-lg rounded-xl p-6">
        <h2 class="text-2xl font-body text-yellow-400 mb-4">${producto.nombre}</h2>
        <div class="flex flex-wrap gap-4 justify-center mb-4">${galeria}</div>
        <p class="text-gray-700 mb-4">${producto.descripcion_larga}</p>
        <p class="text-xl font-bold mb-6">$${producto.precio}</p>
        <a href="https://wa.me/573005554942?text=Hola!%20Estoy%20interesado%20en%20${encodeURIComponent(producto.nombre)}"
           target="_blank"
           class="inline-block bg-yellow-400 hover:bg-yellow-00 text-white font-semibold py-3 px-6 rounded-lg shadow">
          Comprar por WhatsApp 💬
        </a>
      </div>
    `;

    // Agregar event listeners a las imágenes
    const imagenes = contenedor.querySelectorAll('img');
    imagenes.forEach(img => {
      img.addEventListener('click', () => {
        imagenAmpliada.src = img.src;
        modal.classList.remove('hidden');
      });
    });
  });
