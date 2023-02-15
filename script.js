const books = document.querySelector('.books');
const addBookButton = document.getElementById('submit');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');
const list = document.getElementById('list');
const addForm = document.getElementById('add-form');
const contact = document.getElementById('contact');
const time = document.querySelector('.time');

const getDaySuffix = (day) => {
  if (day === 1 || day === 21 || day === 31) {
    return 'st';
  } if (day === 2 || day === 22) {
    return 'nd';
  } if (day === 3 || day === 23) {
    return 'rd';
  }
  return 'th';
};

const getDatePeriod = (hours) => {
  if (hours < 12) {
    return 'am';
  }
  return 'pm';
};

const getTime = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const month = months[new Date().getMonth()];
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  time.innerHTML = `${month} ${day}${getDaySuffix(day)} ${year}, ${hours}:${minutes}:${seconds} ${getDatePeriod(hours)}`;
};

setInterval(getTime, 1000);

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

listLink.addEventListener('click', () => {
  list.classList.remove('hide');
  addForm.classList.add('hide');
  contact.classList.add('hide');
  listLink.classList.add('active');
  addLink.classList.remove('active');
  contactLink.classList.remove('active');
});

addLink.addEventListener('click', () => {
  list.classList.add('hide');
  addForm.classList.remove('hide');
  contact.classList.add('hide');
  listLink.classList.remove('active');
  addLink.classList.add('active');
  contactLink.classList.remove('active');
});

contactLink.addEventListener('click', () => {
  list.classList.add('hide');
  addForm.classList.add('hide');
  contact.classList.remove('hide');
  listLink.classList.remove('active');
  addLink.classList.remove('active');
  contactLink.classList.add('active');
});