class Collection {
  constructor(name, items, basePrice) {
    this.name = name;
    this.items = items;
    this.basePrice = basePrice;
  }

  getItems(numDraws) {
    if (numDraws <= this.items.length) {
      return this.items.slice(0, numDraws);
    } else {
      return this.items;
    }
  }

  calculatePrice(numDraws) {
    let totalPrice = this.basePrice * numDraws;

    let discountMessage = "";

    if (numDraws >= 10) {
      totalPrice -= totalPrice * 0.15;
      discountMessage = "Tienes un 15% de descuento aplicado por comprar 10 o más tiradas.";
    } else if (numDraws >= 8) {
      totalPrice -= totalPrice * 0.1;
      discountMessage = "Tienes un 10% de descuento aplicado por comprar 8 o más tiradas.";
    } else if (numDraws >= 4) {
      totalPrice -= totalPrice * 0.05;
      discountMessage = "Tienes un 5% de descuento aplicado por comprar 4 o más tiradas.";
    }

    const confirmMessage = `El precio total por ${numDraws} tiradas es: $${totalPrice}. ${discountMessage} ¿Deseas continuar con la compra?`;

    return confirm(confirmMessage);
  }
}

// Función de Bienvenida
function welcomeClient() {
  alert("Bienvenido a packit.pa.");

  let clientName = prompt("¿Cómo te llamas?");

  if (clientName != "") {
    alert(
      `Es un placer conocerte ${clientName}. Te guiaremos a través de esta experiencia. ¿Listo para probar tu suerte?`
    );
  } else {
    alert("Que nombre tan raro, pero quienes somos para juzgar. ¡Continuemos!");
  }

  const selectedCollection = selectCollection();

  // Se solicita la cantidad de tiradas para realizar la función de cálculo de precio
  const numDraws = parseInt(
    prompt("¿Cuántas tiradas deseas comprar? (De 1 a 10)")
  );

  if (numDraws >= 1 && numDraws <= 10) {
    calculatePrice(selectedCollection, numDraws);
  } else {
    alert("La cantidad de tiradas no es válida. El simulador se cerrará.");
  }
}

// Función de Selección de Colección
function selectCollection() {
  alert(
    "packit.pa es un sistema de gashapon o tiradas aleatorias en las cuales pagas por una cantidad de tiradas y a cambio recibirás prendas de vestir de una colección en específico. Cada prenda tiene un precio de mercado mucho mayor o menor, dependerá de tu propia suerte."
  );

  const validCollections = ["soccer", "anime", "videojuego"];

  while (true) {
    const selectedCollection = prompt(
      "Tenemos muchas series de suéteres actualmente. La colección de Anime, Videojuegos y Soccer. ¿Por cuál te gustaría tirar? (Escribe la categoría por la cual quieres tirar)"
    ).toLowerCase();

    if (validCollections.includes(selectedCollection)) {
      return selectedCollection; // La selección es válida, devolverla
    } else {
      alert("Categoría incorrecta. Por favor, elige una categoría válida.");
    }
  }
}

// Función para calcular el precio de la tirada según la colección elegida y el número de tiradas
function calculatePrice(selectedCollection, numDraws) {
  const collections = {
    soccer: new Collection("Soccer", [
      "Cristiano Ronaldo",
      "Lionel Messi",
      "Neymar",
      "Kylian Mbappé",
      "Mohamed Salah",
      "Harry Kane",
      "Robert Lewandowski",
      "Karim Benzema",
      "Sergio Ramos",
      "Kevin De Bruyne",
      "Bruno Fernandes",
      "Luka Modric",
      "Virgil van Dijk",
      "Alisson Becker",
      "Manuel Neuer",
      "Eden Hazard",
      "Raheem Sterling",
      "Sadio Mané",
      "Erling Haaland",
    ], 25.0),
    anime: new Collection("Anime", [
      "Monkey D. Luffy",
      "Naruto Uzumaki",
      "Satoru Gojo",
      "Goku",
      "Edward Elric",
      "Inuyasha",
      "Sailor Moon",
      "Vegeta",
      "Ichigo Kurosaki",
      "Light Yagami",
      "Lelouch Lamperouge",
      "Eren Yeager",
      "Kaneki Ken",
      "Sasuke Uchiha",
      "Levi Ackerman",
      "Gon Freecss",
      "Killua Zoldyck",
      "Jotaro Kujo",
      "Deku",
      "Tanjiro Kamado",
    ], 20.0),
    videojuego: new Collection("Videojuegos", [
      "Solid Snake",
      "Super Mario Bros",
      "Sonic",
      "Link (The Legend of Zelda)",
      "Master Chief (Halo)",
      "Geralt of Rivia (The Witcher)",
      "Kratos (God of War)",
      "Aloy (Horizon Zero Dawn)",
      "Lara Croft (Tomb Raider)",
      "Ezio Auditore (Assassin's Creed)",
      "Samus Aran (Metroid)",
      "Joel and Ellie (The Last of Us)",
      "Cortana (Halo)",
      "Nathan Drake (Uncharted)",
      "Aloy (Horizon Zero Dawn)",
      "Chell (Portal)",
      "Arthur Morgan (Red Dead Redemption)",
      "Vault Boy (Fallout)",
      "Sora (Kingdom Hearts)",
      "Niko Bellic (Grand Theft Auto IV)",
    ], 10.0),
  };

  const selectedCollectionObj = collections[selectedCollection];

  if (selectedCollectionObj) {
    const items = selectedCollectionObj.getItems(numDraws);
    const shouldContinue = selectedCollectionObj.calculatePrice(numDraws);

    if (shouldContinue) {
      alert(`Has obtenido: ${items.join(", ")}`);
      alert("¡Gracias por tu elección! Esperamos que disfrutes de tu compra. Regresa pronto.");
    } else {
      // Nueva confirmación solo si el usuario elige cancelar después de continuar
      const cancelConfirm = confirm(
        "¿Deseas salir o volver a elegir la cantidad de tiradas?"
      );

      if (cancelConfirm) {
        // Si el usuario eligió salir, el simulador se cierra sin mensajes adicionales.
        return;
      } else {
        // Volver a seleccionar la cantidad de tiradas
        const numDraws = parseInt(
          prompt("¿Cuántas tiradas deseas comprar? (De 1 a 10)")
        );

        if (numDraws >= 1 && numDraws <= 10) {
          calculatePrice(selectedCollection, numDraws);
        } else {
          alert("La cantidad de tiradas no es válida. El simulador se cerrará.");
        }
      }
    }
  } else {
    alert(
      "¡Ups! Ha ocurrido un error, parece que no has elegido una categoría existente, inténtalo de nuevo."
    );
  }
}

// Ejecución de funciones
welcomeClient();
