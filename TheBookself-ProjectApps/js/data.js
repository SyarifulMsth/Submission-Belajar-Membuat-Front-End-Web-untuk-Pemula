const STORAGE_KEY = "BOOK_SHELF";

let unread = [];

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(unread);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        unread = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(judulBuku, penulisBuku, tahunBuku, isCompleted) {
    return {
        id: +new Date(),
        judulBuku,
        penulisBuku,
        tahunBuku,
        isCompleted
    };
}

function findBook(bookId) {

    for (book of unread) {
        if (book.id === bookId)
            return book;
    }

    return null;
}

function findBookIndex(bookId) {

    let index = 0
    for (book of unread) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}
