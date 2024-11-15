// Array to store book objects
const myLibrary = [];

// Constructor function for Book
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

// Function to toggle the read status of a book
Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Function to display all books on the page
function displayBooks() {
  const libraryContainer = document.getElementById('library');
  libraryContainer.innerHTML = ''; // Clear the current display

  myLibrary.forEach((book, index) => {
    // Create a card for each book
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    // Book details
    const bookDetails = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.isRead ? 'Read' : 'Not Read'}</p>
    `;
    bookCard.innerHTML = bookDetails;

    // Toggle read button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Read';
    toggleButton.addEventListener('click', () => {
      book.toggleRead();
      displayBooks();
    });

    // Remove book button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeBook(index));

    // Append buttons to the card
    bookCard.appendChild(toggleButton);
    bookCard.appendChild(removeButton);

    // Append the card to the library container
    libraryContainer.appendChild(bookCard);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = parseInt(document.getElementById('pages').value, 10);
  const isRead = document.getElementById('isRead').checked;

  if (!title || !author || isNaN(pages) || pages <= 0) {
    alert('Please fill in all fields with valid data.');
    return;
  }

  addBookToLibrary(title, author, pages, isRead);
  document.getElementById('book-form').reset();
  document.getElementById('book-form').style.display = 'none'; // Hide the form
}

// Show the form when the "New Book" button is clicked
document.getElementById('new-book-button').addEventListener('click', () => {
  document.getElementById('book-form').style.display = 'block';
});

// Hide the form when the "Cancel" button is clicked
document.getElementById('cancel-button').addEventListener('click', () => {
  document.getElementById('book-form').style.display = 'none';
});

// Event listener for form submission
document.getElementById('book-form').addEventListener('submit', handleFormSubmit);

