fetch('productos.json')
  .then(response => response.json())
  .then(productos => {
    const contenedor = document.getElementById('productos');

    productos.forEach(p => {
      const card = `
        <div class="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200">
          <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x300?text=Imagen+no+disponible'">
          <div class="p-4">
            <h3 class="text-lg font-semibold text-pink-700">${p.nombre}</h3>
            <p class="text-sm text-gray-600 mb-2">${p.descripcion}</p>
            <p class="font-bold text-gray-800 mb-3">$${p.precio}</p>
            <a href="https://wa.me/573001234567?text=Hola!%20Estoy%20interesado%20en%20el%20producto%20${encodeURIComponent(p.nombre)}"
              target="_blank"
              class="block bg-pink-400 text-white text-center py-2 rounded-md hover:bg-pink-500">
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      `;
      contenedor.innerHTML += card;
    });
  });
