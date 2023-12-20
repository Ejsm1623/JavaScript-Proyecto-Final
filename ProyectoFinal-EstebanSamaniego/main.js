// main.js

const productos = [
  {
    nombre: "PlayStation 5",
    imagen: "./imgs/PS5Console.jpg",
    descripcion:
      "Consola de última generación, gráficos impresionantes, mandos reactivos.",
    precio: 599.99,
    stock: 10,
  },
  {
    nombre: "Xiaomi N10",
    imagen: "./imgs/XiaomiN10.jpg",
    descripcion:
      "Vanguardia en celulares, comunicación total, fluidez en el gaming.",
    precio: 299.99,
    stock: 20,
  },
  {
    nombre: "Nintendo Switch",
    imagen: "./imgs/NintendoSwitch.jpg",
    descripcion:
      "Consola de sobremesa y portatil, especial para niños y familia.",
    precio: 399.99,
    stock: 15,
  },
  {
    nombre: "Dell Showcase",
    imagen: "./imgs/dellShowcase.jpg",
    descripcion: "Lo justo y potente para labores, disfrute y ocio.",
    precio: 799.99,
    stock: 5,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let productosOriginales = [];
  let productos = [];

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
      productos = [...productosOriginales]; // Copiar los productos originales
      generarTarjetas(productos);

      // Agregar eventos a los botones (fuera de la función generarTarjetas)
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
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    });

  function generarTarjetas(productos) {
    const contenedor = document.getElementById("productos").lastElementChild;
    contenedor.innerHTML = ""; // Limpiar el contenido existente

    const limiteTarjetas = 4;

    productos.slice(0, limiteTarjetas).forEach((producto, index) => {
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
            <button class="btn btn-primary w-100 btnAgregarCarrito" data-index="${index}">Añadir al carrito</button>
          </div>
        </div>
      `;

      contenedor.appendChild(card);
    });

    // Asocia la función agregarAlCarrito a los botones "Añadir al carrito"
    const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");
    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        const producto = productos[index];

        if (producto.stock > 0) {
          agregarAlCarrito(producto);
          producto.stock--; // Decrementar el stock al agregar al carrito
          generarTarjetas(productos); // Volver a generar las tarjetas con el stock actualizado
        } else {
          Swal.fire({
            title: "Sin Stock",
            text: "Este producto está agotado.",
            icon: "info",
            confirmButtonText: "Ok",
          });
        }
      });
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
    text: "Nos encontramos en remodelación, pero puedes probar un poco de la interacción con los botones de filtro. Pronto estaremos abiertos al público con un mayor catálogo, no te lo pierdas.",
    icon: "info",
    confirmButtonText: "Entendido",
  });
});
