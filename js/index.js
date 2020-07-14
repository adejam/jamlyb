const form = document.querySelector('#bookForm');

const book = (id, author, bookTitle, noOfPages, readStatus) => ({
  id,
  author,
  bookTitle,
  noOfPages,
  readStatus,
});

function clearFields() {
  document.querySelector('#author').value = '';
  document.querySelector('#bookTitle').value = '';
  document.querySelector('#noOfPages').value = '';
}

function createBook(e) {
  e.preventDefault();
  const id = document.querySelector('#id').value;
  const author = document.querySelector('#author').value;
  const bookTitle = document.querySelector('#bookTitle').value;
  const noOfPages = document.querySelector('#noOfPages').value;
  const readStatus = document.querySelector('#readStatus').checked;
  book(id, author, bookTitle, noOfPages, readStatus);
  clearFields();
}

form.addEventListener('submit', createBook);
