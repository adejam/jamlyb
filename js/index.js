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

function addBookToList(newBook) {
  let status = '';
  if (newBook.readStatus === true) {
    status = `
       <div class="form-check ">
        <label class="form-check-label">
          <input type="checkbox" class="form-check-input" checked />
          You have read this book!
        </label>
       </div>
      `;
  } else {
    status = `
       <div class="form-check ">
         <label class="form-check-label">
           <input type="checkbox" class="form-check-input"/>
           You should read this book!
         </label>
       </div>
      `;
  }
  const bookRow = document.querySelector('#bookRow');
  const itemDiv = document.createElement('article');
  itemDiv.className = 'col-lg-3 col-md-4 col-sm-6';
  itemDiv.innerHTML = `
          <div class="card bbg">
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
                  <a class="btn btn-sm btn-outline-danger br_30" id="${newBook.id}">
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
            <div class="card-footer text-muted">
              ${status}
            </div>
          </div>
          `;

  bookRow.appendChild(itemDiv);
}

function createBook(e) {
  e.preventDefault();
  const id = document.querySelector('#id').value;
  const author = document.querySelector('#author').value;
  const bookTitle = document.querySelector('#bookTitle').value;
  const noOfPages = document.querySelector('#noOfPages').value;
  const readStatus = document.querySelector('#readStatus').checked;
  const newBook = book(id, author, bookTitle, noOfPages, readStatus);
  clearFields();
  addBook(newBook);
  addBookToList(newBook);
}

form.addEventListener('submit', createBook);
