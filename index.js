const books = [
  {
    id: 1,
    name: "Las Nubes de Colores y las Vocales",
    photo: "./imagenes/estante-para-libros.png",
    price: 1000
  },
  {
    id: 2,
    name: "La Jirafita Perdida",
    photo: "./imagenes/estante-para-libros.png",
    price: 2000
  },
  {
    id: 3,
    name: "Los Juegos hacen Sonidos",
    photo: "./imagenes/estante-para-libros.png",
    price: 3000
  },
  {
    id: 4,
    name: "El Cerdo Perezoso",
    photo: "./imagenes/estante-para-libros.png",
    price: 4000
  }
];
localStorage.setItem('books', JSON.stringify(books));
const basket = new Map();
fillWithBooksToSell();
function fillWithBooksToSell() {

  books.forEach(book => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="venta" onclick="addBookToBasket(this)" data-id="${book.id}">
      <div class="foto-venta">
        <img src="${book.photo}" />
      </div>
      <div class="pie-venta">
        <p>${book.name}</p>
        <p>${book.price}</p>
      </div>
    </div>`;
    document.getElementById("cuentosVenta").appendChild(div);
  
  })
  
}

function addBookToBasket(e) {
  const id = Number(e.getAttribute("data-id"));
  const book = books.filter(book => book.id === id)[0];
  console.log('book selected', book);
  if (confirm('Deseas agregar el libro ' + book.name + ' al carro de compra?')) {
    // Guardar en basket
    console.log('Thing was saved to the database.');
    saveToBasket(book);
    goToCheckout();
  } else {
    // No se hace nada
    console.log('Sigue comprando');
  }
}

function saveToBasket(book) {
  const isBookInBasket = basket.get(book.id);
  if (isBookInBasket) {
    console.log('ya existe en basket sumo uno mas a cantidad');
    basket.set(book.id, basket.get(book.id) + 1);
  } else {
    console.log('no existe en basket lo agrego con cantidad 1');
    basket.set(book.id, 1);
  }
  // guardo en localstorage
  saveBasketToLocalstorage();
}

function saveBasketToLocalstorage() {
  // para guardar Map en localstorage se debe
  // 1. transfromar en arreglo los entries (k,v)
  // 2. hacer string del arreglo
  localStorage.setItem("basket", JSON.stringify(Array.from(basket.entries())));
}

function goToCheckout() {
  if (confirm('Deseas ir al carrito de compra?')) {
    // voy a carrito
    console.log('ir al carrito');
    location.href = "checkout.html";
  } else {
    // me quedo
    console.log('Sigue comprando');
  }
}

function sendContact() {
  const contactName = document.getElementById("nombreContacto");
  alert("Gracias por tu comentario " + contactName.value + "! Me pondré en contacto contigo");
  window.location = "index.html";
}