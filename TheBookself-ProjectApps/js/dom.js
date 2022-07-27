
const UNCOMPLETED_BOOK_ID = "unread";
const COMPLETED_BOOK_ID = "read";
const BOOK_ITEMID = "itemId";

function makeBook(judulBuku, penulisBuku, tahunBuku, isCompleted) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = judulBuku;

    const authorName = document.createElement("p");
    authorName.innerText = penulisBuku;

    const bookYear = document.createElement("small");
    bookYear.innerText = `${tahunBuku}`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(bookTitle, authorName, bookYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(

            createCheckButton(),
            createTrashButton()
        );
    }
    return container;
}

function addBook() {
    const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);

    const inputTitle = document.getElementById("judulBuku").value;
    const inputAuthor = document.getElementById("penulisBuku").value;
    const inputYear = document.getElementById("tahunBuku").value;

    const book = makeBook(inputTitle, inputAuthor, inputYear);

    const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, false);

    book[BOOK_ITEMID] = bookObject.id;
    unread.push(bookObject);

    uncompletedBook.append(book);

    updateDataToStorage();
}

function addBookToCompleted(bookElement) {

    const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p").innerText;
    const bookYear = bookElement.querySelector(".inner > small").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    bookCompleted.append(newBook);

    bookElement.remove();

    updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {

    const bookUnCompleted = document.getElementById(UNCOMPLETED_BOOK_ID);

    const bookTitle = bookElement.querySelector(".inner > h3").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p").innerText;
    const bookYear = bookElement.querySelector(".inner > small").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    bookUnCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
    // Custom Dialog ketika menghapus buku.
    let confirmation = confirm("Apakah kamu yakin ingin menghapus buku?");

    if (confirmation) {
        bookElement.remove();
        const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
        unread.splice(bookPosition, 1);
        Swal.fire(
            'Deleted!',
            'Buku berhasil dihapus!',
            'success'
        )
    }
    updateDataToStorage();
}

function refreshDataFromUnread() {
    const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
    let bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

    for (book of unread) {
        const newBook = makeBook(book.judulBuku, book.penulisBuku, book.tahunBuku, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;


        if (book.isCompleted) {
            bookCompleted.append(newBook);
        } else {
            bookUncompleted.append(newBook);
        }
    }
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addBookToCompleted(event.target.parentElement);
        // Custom Dialog ketika Check buku.
        Swal.fire(
            'Keren!',
            ' Kamu telah selesai membaca buku tersebut.!',
        )
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeBookFromCompleted(event.target.parentElement);
    });
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoBookFromCompleted(event.target.parentElement);
        // Custom Dialog ketika Undo buku.
        swal.fire("Buku berhasil dipindah ke rak \"Belum selesai dibaca\"");
    });
}