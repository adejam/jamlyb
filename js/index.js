// const book = (id, author, bookTitle, noOfPages, readStatus) => ({
//   id,
//   author,
//   bookTitle,
//   noOfPages,
//   readStatus,
// });

const form = document.querySelector('#bookForm');
const bookRow = document.querySelector('#bookRow');
const searchBig = document.querySelector('#searchBig');
const searchSmall = document.querySelector('#searchSmall');

function getBooks() {
  let books;
  if (localStorage.getItem('book') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('book'));
  }

  return books;
}

function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('book', JSON.stringify(books));
}
function statusNode(id, message, check) {
  return `<div class="form-check ">
        <label class="form-check-label changeStatus" data-identity="${id}" id="statusLabel${id}">
          <input type="checkbox" class="form-check-input changeStatus" data-identity="${id}" id="statusInput${id}" ${check} />
          ${message}
        </label>
       </div>`;
}
function addBookToList(newBook) {
  let status = '';
  if (newBook.readStatus === true) {
    const message = 'You have read this book!';
    status = statusNode(newBook.id, message, 'checked');
  } else {
    const message = 'You should read this book!';
    status = statusNode(newBook.id, message, '');
  }
  const bookRow = document.querySelector('#bookRow');
  const itemDiv = document.createElement('article');
  itemDiv.className = 'col-lg-3 col-md-4 col-sm-6';
  itemDiv.innerHTML = `
          <div class="card bbg shadow">
            <div class="card-header cardHeader">
              <div class="titleDiv bg_White p_10 br_30">
                <p class="text-success ta_center titleP">
                  ${newBook.bookTitle}
                </p>
              </div>
            </div>
            <div class="card-body">
              <div class="pagesDiv ">
                <p class="text-muted ta_center">
                  <span class="bg_White p_10 br_30">
                    ${newBook.noOfPages} Pages
                  </span>
                </p>
              </div>
              <div>
                <p class=" ta_center ">
                  <a class="btn btn-sm btn-outline-danger br_30 removeBtn" id="${newBook.id}">
                    Remove Book
                  </a>
                </p>
              </div>
              <div class="byDiv">
                <p class="ta_center text-muted mb_10">
                  BY
                </p>
                <p class="text-info ta_center bg_White p_10 br_30">
                  ${newBook.author}
                </p>
              </div>
            </div>
            <div class="card-footer text-muted" id="status${newBook.id}">
              ${status}
            </div>
          </div>
          `;

  bookRow.appendChild(itemDiv);
}

function displayBooks() {
  const books = getBooks();
  books.forEach(book => addBookToList(book));
}

function dynamicId() {
  let id;
  if (localStorage.getItem('book') === null) {
    id = 0;
  } else {
    const books = getBooks();
    id = books[books.length - 1].id + 1;
  }

  return id;
}
function dynamicValues(id, values) {
  const newBook = {};
  values.forEach(result => {
    if (result.dataset.uid === 'uid') {
      newBook[result.id] = id;
    } else if (result.dataset.checker === 'checker') {
      newBook[result.id] = result.checked;
    } else {
      newBook[result.id] = result.value;
    }
  });

  return newBook;
}

function createBook(e) {
  e.preventDefault();
  const values = document.querySelectorAll('.values');
  const book = dynamicValues(dynamicId(), values);
  addBook(book);
  addBookToList(book);
  form.reset();
  const bookModal = document.querySelector('#addBookModal');
  bookModal.style.display = 'none';
  const body = document.querySelector('body');
  body.classList.remove('modal-open');
  body.style.paddingRight = '0px';
  const mb = document.querySelector('.modal-backdrop');
  mb.remove();
}

form.addEventListener('submit', createBook);
document.addEventListener('DOMContentLoaded', displayBooks);
function changeStatus(trueStatement, id, message) {
  const statusLabel = document.querySelector(`#statusLabel${id}`);
  const statusInput = document.querySelector(`#statusInput${id}`);
  if (trueStatement === true) {
    statusInput.setAttribute('checked', 'true');
  } else {
    statusInput.removeAttribute('checked');
  }
  const text = document.createTextNode(message);
  statusLabel.replaceChild(text, statusLabel.childNodes[2]);
}
function removeBookOrChangeStatus(e) {
  e.preventDefault();
  if (e.target.classList.contains('removeBtn')) {
    const books = getBooks();
    let index = -1;
    const id = parseInt(e.target.id, 10);
    for (let i = 0; i < books.length; i += 1) {
      index += 1;
      if (books[i].id === id) {
        books.splice(index, 1);
        break;
      }
    }

    localStorage.setItem('book', JSON.stringify(books));

    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  } else if (e.target.classList.contains('changeStatus')) {
    const id = parseInt(e.target.dataset.identity, 10);
    const books = getBooks();
    for (let i = 0; i < books.length; i += 1) {
      if (books[i].id === id) {
        if (books[i].readStatus === true) {
          books[i].readStatus = false;
          const message = 'You should read this book!';
          changeStatus(false, id, message);
        } else {
          books[i].readStatus = true;
          const message = 'You have read this book!';
          changeStatus(true, id, message);
        }
        break;
      }
    }
    localStorage.setItem('book', JSON.stringify(books));
  }
}

function searchBook(e) {
  e.preventDefault();
  const searchKey = e.target.value.toLowerCase();
  const titleP = document.getElementsByClassName('titleP');
  const titlePaArray = Array.from(titleP);
  titlePaArray.forEach(result => {
    const bookName = result.textContent;
    if (bookName.toLowerCase().indexOf(searchKey) !== -1) {
      result.parentElement.parentElement.parentElement.parentElement.style.display = 'block';
    } else {
      result.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
    }
  });
}

searchBig.addEventListener('keyup', searchBook);
searchSmall.addEventListener('keyup', searchBook);

bookRow.addEventListener('click', removeBookOrChangeStatus);
