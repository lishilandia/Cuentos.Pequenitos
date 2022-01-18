// obtengo listado de libro desde localstorage
const books = JSON.parse(localStorage.getItem('books'));
// obtengo basket desde localstorage y se setea Map
const basket = new Map(JSON.parse(localStorage.getItem('basket')));

const booksIdsInBasket = Array.from(basket.keys());
console.log('ids de libros en basket', booksIdsInBasket);
const buildBasket = booksIdsInBasket.map((id) => {
  const book = books.find(book => book.id === id);
  if (book) {
    return { book, quantity: basket.get(id) };
  }
})
console.log('carrito a mostrar en html ', buildBasket);

buildBasket.forEach((item) => {
  addBookToHtml(item);
});
calculateTotalFromBasket();

function addBookToHtml(item) {
  const div = document.createElement('div');

  div.className = 'book-in-basket';

  div.innerHTML = `
      <h3 class="book-name">${item.book.name}</h3>
      <label for="cantidad" class="cantidad">Cantidad</label>
      <input type="number" min="0" max="100" value="${item.quantity}" class="quantity" onchange="assignNewQuantityToItem(this)" data-id="${item.book.id}"/>
      <input type="button" value="-" onclick="removeBookFromHtml(this)" data-id="${item.book.id}" class="remove"/>
  `;

  document.getElementById('container').appendChild(div);
}

function removeBookFromHtml(input) {
  if (confirm('Deseas eliminar compra?')) {
    // elimino elemento de html
    document.getElementById('container').removeChild(input.parentNode);
    const itemId = Number(input.getAttribute('data-id'));
    const indexFromBuildBasketArray = buildBasket.findIndex(item => item.book.id === itemId);
    buildBasket.splice(indexFromBuildBasketArray, 1);
    calculateTotalFromBasket();
  } else {
    // no hago nada
    console.log('Me arrepentí no quiero eliminar compra');
  }
}

function assignNewQuantityToItem(item) {
  const newQuantity = item.value;
  const itemId = Number(item.getAttribute('data-id'));
  const indexFromBuildBasketArray = buildBasket.findIndex(item => item.book.id === itemId);
  buildBasket[indexFromBuildBasketArray].quantity = newQuantity;
  calculateTotalFromBasket();
}

function calculateTotalFromBasket() {
  totalAmount = 0;
  buildBasket.forEach((item) => {
    totalAmount += (item.quantity * item.book.price);
  });
  const totalElement = document.getElementById('montoTotal');
  totalElement.innerHTML = totalAmount;
}

function finishCheckout() {
  if (totalAmount == 0) {
    alert("No ha seleccionado candida de libros para comprar");
    return;
  }
  if (confirm("Usted va a pagar un total de:  " + totalAmount)) {
    alert("Muchas gracias por su compra!!");
    localStorage.removeItem('basket');
    window.location = "index.html";
  } else {
    console.log('');
  }
}