const books = document.querySelector('.books');
const addBookButton = document.getElementById('submit');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
let library = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const addBook = (book, bookNumber) => {
  const bookHtml = document.createElement('div');
  bookHtml.className = 'book';
  bookHtml.innerHTML = `<p class = "book-title"> ${book.title} </p>
 <p class="book-author">${book.author} </p>
 <button class="book-remove" data-book-index=${bookNumber}> remove</button>  `;
  return bookHtml;
};

const removeBook = (event) => {
  const index = event.target.dataset.bookIndex;
  library.splice(index, 1);
  localStorage.setItem('booksData', JSON.stringify(library));
  return library;
};

const displayLibrary = (library) => {
  books.innerHTML = '';
  for (let i = 0; i < library.length; i += 1) {
    books.appendChild(addBook(library[i], i));
  }
  const removeButtons = document.querySelectorAll('.book-remove');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      displayLibrary(removeBook(event));
    });
  });
};

if (localStorage.getItem('booksData')) {
  library = JSON.parse(localStorage.getItem('booksData'));
  displayLibrary(library);
}

addBookButton.addEventListener('click', () => {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    const bookData = {
      title: bookTitle.value,
      author: bookAuthor.value,
    };
    library.push(bookData);
    localStorage.setItem('booksData', JSON.stringify(library));
    displayLibrary(library);
    bookTitle.value = '';
    bookAuthor.value = '';
  }
});