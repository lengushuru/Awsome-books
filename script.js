const books = document.querySelector('.books');
const addBookButton = document.getElementById('submit');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
let library = [];

class Book {
  constructor(title, author, index = null) {
    this.title = title;
    this.author = author;
    this.index = index;
  }

  add() {
    library.push(this);
    localStorage.setItem('booksData', JSON.stringify(library));
  }

  remove() {
    library.splice(this.index, 1);
    localStorage.setItem('booksData', JSON.stringify(library));
  }
}

const addBook = (book, bookNumber) => {
  book.index = bookNumber;
  const bookHtml = document.createElement('div');
  bookHtml.className = 'book';
  if (bookNumber % 2 === 0) {
    bookHtml.classList.add('gray-background');
  }
  bookHtml.innerHTML = `<p class = "book-title"> ${book.title} By ${book.author} </p>
 <button class="book-remove" data-book-index=${bookNumber}> remove</button>  `;
  return bookHtml;
};

const removeBook = (book) => {
  book.remove();
};

const displayLibrary = (library) => {
  books.innerHTML = '';
  for (let i = 0; i < library.length; i += 1) {
    books.appendChild(addBook(library[i], i));
  }
  const removeButtons = document.querySelectorAll('.book-remove');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.bookIndex;
      removeBook(library[index]);
      displayLibrary(library);
    });
  });
};

const turnLibraryDataIntoBooks = (library) => {
  const newLibrary = [];
  for (let i = 0; i < library.length; i += 1) {
    const { title } = library[i];
    const { author } = library[i];
    const { index } = library[i];
    newLibrary.push(new Book(title, author, index));
  }
  return newLibrary;
};

if (localStorage.getItem('booksData')) {
  library = JSON.parse(localStorage.getItem('booksData'));
  library = turnLibraryDataIntoBooks(library);
  displayLibrary(library);
}

addBookButton.addEventListener('click', () => {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    const book = new Book(bookTitle.value, bookAuthor.value);
    book.add();
    displayLibrary(library);
    bookTitle.value = '';
    bookAuthor.value = '';
  }
});