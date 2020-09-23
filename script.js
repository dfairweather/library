// List of book objects in library



// Constructor for book
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}.`
    }
}

// Make a new book and add it to library list
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    saveLibrary();
}

// Placeholder books
/* if (myLibrary.length == 0) {
    addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "273", "Yes");
    addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", 572, "No");
    addBookToLibrary("A Confederacy of Dunces", "John Kennedy Toole", 405, "Yes");
}
     */




// Variables for container and form
const container = document.querySelector(".container");
const form = document.querySelector('.form-container');

// Takes book and its index to make a card
function createCard(book1, bookNum) {
    const newBook = document.createElement('div');
    newBook.className = "card";

    // button to remove book
    const removeButton = document.createElement('button');
    removeButton.className = "remove";
    removeButton.dataset.id = bookNum;
    removeButton.textContent = "X";
    removeButton.addEventListener('click', removeBook);

    // Elements for book info
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('input');
    const readLabel = document.createElement('label');
    read.type = "checkbox";
    read.name = "readit";
    read.dataset.id = bookNum;
    if (book1.read == 'Yes'){
        read.checked = true;
    }
    read.addEventListener('change', readIt);
    readLabel.for = "readit";
    
    // Get text info from book object
    title.textContent = book1.title;
    author.innerHTML = `<strong><small>Author:</small></strong> ${book1.author}`;
    pages.innerHTML = `<strong><small>Pages</small></strong>: ${book1.pages}`;
    readLabel.innerHTML = `<strong><small>Have Read:</small></strong> ${book1.read}`;

    // Add book and info to container
    container.appendChild(newBook);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);
    newBook.appendChild(readLabel);
    newBook.appendChild(removeButton);
}

// Iterate through list of books and create card for each 
function makeCards() {
    librarySize = myLibrary.length;
    for (let i=0; i<librarySize; i++) {
        createCard(myLibrary[i], i);
    };
};

// Clear all books displayed
function clearCards() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

// Function to display new book form
function openForm() {
    document.getElementById("myForm").style.display = "block";
    }

// hides new book form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    }


// Get form info to create new book
form.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const hasRead = document.getElementsByName('has-read');
    let hasReadVal = null;
    if (hasRead[0].checked) {
        hasReadVal = hasRead[0].value;
    } else {
        hasReadVal = hasRead[1].value;
    }
    addBookToLibrary(title, author, pages, hasReadVal);
    form.reset();
    closeForm();
    clearCards();
    makeCards();
}

// Remove book from myLibrary, and redisplay updated library
function removeBook() {
    bookNum = this.dataset.id;
    myLibrary.splice(bookNum,1);
    saveLibrary();
    clearCards();
    makeCards();
}

// Save library to local storage

function saveLibrary() {
    localStorage.myLibrary = JSON.stringify(myLibrary);
}

// Load library from local storage

function loadLibrary() {
    if (JSON.parse(localStorage.myLibrary.length) > 0)
    {
        return JSON.parse(localStorage.myLibrary);
    } else {
        return [];
    }

}
// Toggle read status

function readIt() {
    bookNum = this.dataset.id;
    console.log(bookNum);
    if (myLibrary[bookNum].read == "No") {
        myLibrary[bookNum].read = "Yes"; 
    } else {
        myLibrary[bookNum].read = "No"; 
    }
    saveLibrary();
    clearCards();
    makeCards();
     
}
let myLibrary = loadLibrary();
makeCards();





