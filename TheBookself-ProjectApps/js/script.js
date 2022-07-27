document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("formBuku");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook(
            Swal.fire(
                'Mantap!',
                'Buku berhasil ditambahkan!',
                'success'
            )
        );
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});


document.addEventListener("ondataloaded", () => {
    refreshDataFromUnread();
});

