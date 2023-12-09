const productos = [
  {
    nombre: "PlayStation 5",
    imagen: "./imgs/PS5Console.jpg",
    descripcion: "Juegos sorprendentes, gráficos impresionantes...",
    precio: 599.99,
    stock: 10,
  },
  {
    nombre: "Xiaomi N10",
    imagen: "./imgs/XiaomiN10.jpg",
    descripcion: "Some quick example text to build on the card title...",
    precio: 299.99,
    stock: 20,
  },
  {
    nombre: "Nintendo Switch",
    imagen: "./imgs/NintendoSwitch.jpg",
    descripcion: "Some quick example text to build on the card title...",
    precio: 399.99,
    stock: 15,
  },
  {
    nombre: "Dell Showcase",
    imagen: "./imgs/dellShowcase.jpg",
    descripcion: "Some quick example text to build on the card title...",
    precio: 799.99,
    stock: 5,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let productosOriginales = [];

  // Cargar datos desde el archivo JSON
  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error de red: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      productosOriginales = data;
      const productos = [...productosOriginales]; // Copiar los productos originales
      generarTarjetas(productos);

      // Agregar eventos a los botones
      document
        .getElementById("btnFiltrarPrecio")
        .addEventListener("click", () => {
          const productosFiltrados = filtrarPorPrecio(productos);
          generarTarjetas(productosFiltrados);
        });

      document
        .getElementById("btnOrdenarNombre")
        .addEventListener("click", () => {
          const productosOrdenados = ordenarPorNombre(productos);
          generarTarjetas(productosOrdenados);
        });

      // Agregar evento para limpiar el filtro
      document
        .getElementById("btnLimpiarFiltro")
        .addEventListener("click", () => {
          generarTarjetas(productosOriginales);
        });
    })
    .catch((error) => console.error("Error al cargar los datos:", error));

  function generarTarjetas(productos) {
    const contenedor = document.getElementById("productos").lastElementChild;
    contenedor.innerHTML = ""; // Limpiar el contenido existente

    const limiteTarjetas = 4;

    productos.slice(0, limiteTarjetas).forEach((producto) => {
      const card = document.createElement("div");
      card.className = "col";
      card.innerHTML = `
            <div class="card h-100">
            <img src="${producto.imagen}" class="card-img-top custom-card-image" alt="${producto.nombre}" style="height: 200px; object-fit: cover;" />
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>
                <p class="card-text"><strong>Stock:</strong> ${producto.stock}</p>
                <a href="#" class="btn btn-primary w-100">Añadir al carrito</a>
            </div>
            </div>
        `;

      contenedor.appendChild(card);
    });
  }

  function filtrarPorPrecio(productos) {
    return productos.filter((producto) => producto.precio > 500);
  }

  function ordenarPorNombre(productos) {
    return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  // SweetAlert2 para dar la bienvenida
  Swal.fire({
    title: "¡Bienvenido a Next Gen Shop!",
    text: "Nos encontramos en remodelación, pero puedes probar un poco de la interacción con los botones de filtro. Pronto estaremos abiertos al público con un mayor catalogo, no te lo pierdas.",
    icon: "info",
    confirmButtonText: "Entendido",
  });
});
