// Simulador Interactivo
// Función de Bienvenida
function bienvenida() {
  alert(
    "Bienvenido/a a CraftMania Panamá, te ofrecemos prendas estampadas de calidad. 🙌🏻"
  );

  // Solicitamos el nombre del usuario para personalizar el mensaje de bienvenida
  let nombre = prompt(
    "Antes de ir al grano, déjanos conocerte un poco. ¿Cómo te llamas? (Ingrese solo su nombre)"
  );

  alert(
    `¡Excelente! Un placer, ${nombre}. Empecemos calculando un precio especial para ti...`
  );
}

// Llama a la función de bienvenida para ejecutarla
bienvenida();

// Función para calcular el precio de la prenda
function establecerPrecio(tipoPrenda) {
  let precioBase;

  switch (tipoPrenda.toLowerCase()) {
    case "sueter":
      precioBase = 25.0;
      break;

    case "abrigo":
      precioBase = 20.0;
      break;

    case "gorra":
      precioBase = 10.0;
      break;

    default:
      alert(
        "¡Lo sentimos! No tenemos esa prenda en nuestro inventario. Esperamos tenerla en un futuro no muy lejano, regresa pronto."
      );
      return;
  }

  let descuento = 20; // Establece el valor de descuento fijo

  let oferta = precioBase - precioBase * (descuento / 100);

  // Preguntar al usuario si le gusta la oferta, aquí empieza la implementación del Condicional
  let leGustaLaOferta = confirm(
    `¡Genial! Tu precio especial de descuento para ${tipoPrenda} es: ${oferta}. ¿Te ha gustado esta oferta?`
  );

  if (leGustaLaOferta) {
    alert("¡Gracias por tu elección! Esperamos que disfrutes de tu compra.");
  } else {
    // Ofrecer una rebaja adicional si el usuario no confirmó la oferta inicial, es decir dio "cancelar"
    let rebajaAdicional = 25
    let nuevaOferta = precioBase - precioBase * (rebajaAdicional/100);
    alert(
      `Lo sentimos que no te haya gustado la oferta inicial, pero tenemos una nueva oferta para ti. El nuevo precio es: ${nuevaOferta}. ¡Esperamos que esta te agrade!`
    );
  }
}

// Ciclo para permitir al usuario realizar múltiples elecciones
while (true) {
  let tipoPrenda = prompt(
    "¿Qué tipo de prenda te gustaría estampar? (Ingresa Sueter, Abrigo o Gorra)\n(O ingresa 'Salir' para terminar)"
  );

  if (tipoPrenda.toLowerCase() === "salir") {
    break; // Si el usuario ingresa 'Salir', sale del ciclo
  }

  establecerPrecio(tipoPrenda);
}
