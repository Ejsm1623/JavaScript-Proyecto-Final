// carrito.js

const carrito = [];

// Recuperar el carrito almacenado en localStorage (si existe)
const carritoAlmacenado = JSON.parse(localStorage.getItem("carrito"));
if (carritoAlmacenado) {
  carrito.push(...carritoAlmacenado);
  mostrarCarrito();
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  mostrarCarrito();

  // Actualizar el carrito almacenado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    // Contenido del producto
    listItem.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

    // Botón para remover del carrito
    const btnRemover = document.createElement("button");
    btnRemover.className = "btn btn-danger btnRemoverCarrito";
    btnRemover.dataset.index = index;
    btnRemover.textContent = "Remover";

    listItem.appendChild(btnRemover);

    listaCarrito.appendChild(listItem);

    total += producto.precio;
  });

  const totalCarritoElement = document.getElementById("totalCarrito");
  totalCarritoElement.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnConfirmarCompra = document.getElementById("btnConfirmarCompra");

  btnConfirmarCompra.addEventListener("click", () => {
    if (carrito.length > 0) {
      Swal.fire({
        title: "¡Compra Confirmada!",
        text: "Gracias por tu compra. ¡Disfruta de tus productos!",
        icon: "success",
        confirmButtonText: "Ok",
      });

      // Limpiar el carrito después de la confirmación
      carrito.length = 0;
      mostrarCarrito();
    } else {
      Swal.fire({
        title: "Carrito Vacío",
        text: "Agrega productos al carrito antes de confirmar la compra.",
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  });
});

// Asocia la función agregarAlCarrito a los botones "Añadir al carrito"
document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".btnAgregarCarrito");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const index = event.target.dataset.index;
      agregarAlCarrito(productos[index]);
    });
  });
});

function removerDelCarrito(index) {
  const productoRemovido = carrito.splice(index, 1)[0];
  productoRemovido.stock++; // Incrementar el stock al remover del carrito

  // Incrementar el stock del producto removido en la lista original
  const productoOriginalIndex = productos.findIndex(p => p.nombre === productoRemovido.nombre);
  if (productoOriginalIndex !== -1) {
    productos[productoOriginalIndex].stock++;
  }

  // Actualizar el carrito almacenado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualizar la interfaz después de remover del carrito
  mostrarCarrito();
  generarTarjetas(productos);
}

// Función removerDelCarrito a los botones "Remover del carrito"
document.addEventListener("DOMContentLoaded", () => {
  const listaCarrito = document.getElementById("listaCarrito");

  listaCarrito.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnRemoverCarrito")) {
      const index = event.target.dataset.index;
      removerDelCarrito(index);
    }
  });
});
