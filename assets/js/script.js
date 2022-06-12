let finished, unfinish;
let books = [];

function pushElement(books) {
  finished.innerHTML = '';
  unfinish.innerHTML = '';

  for (let [key, book] of Object.entries(books)) {
    if (book.is_complete) {
      finished.insertAdjacentHTML('beforeend', createCard(book));
    } else {
      unfinish.insertAdjacentHTML('beforeend', createCard(book));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  finished = document.getElementById('finished');
  unfinish = document.getElementById('unfinish');

  if (typeof Storage != 'undefined') {

    books = (JSON.parse(localStorage.getItem('books'))) ?? [];

    if (books.length) { pushElement(books); }

  }
});

function addbook() {
  let form = document.getElementById('form');

  let formData = new FormData(form);
  formData = Object.fromEntries(formData);
  formData.is_complete = (form.is_complete) ? true : false;
  formData.id = Date.now();
  books.push(formData);

  saveToLocal();
  pushElement(books);

  form.reset();
}

function createCard(book) {

  let text = (book.is_complete) ? 'Belum selesai' : 'Selesai';

  return `<div class="col-sm-4" id="${book.id}">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"><span class="author">${book.author}</span> - <span class="year">${book.year}</span></p>
                <a class="btn btn-success" onclick="updateStatus('${book.id}')">${text}</a>
                <a class="btn btn-warning" onclick="editBook('${book.id}')">Edit</a>
                <a class="btn btn-danger" onclick="if (confirm('apakah anda yakin ingin menghapus data ini?')) { deleteBook('${book.id}')}">Hapus</a>
              </div>
            </div>
          </div>`
}

function searchBookById(id) {
  for (let [index, book] of Object.entries(books)) {
    if (book.id == id) {
      return index;
    } 
  }
}

function deleteBook(id) {
  books.splice(searchBookById(id), 1);

  saveToLocal();
  pushElement(books);

  alert('Data berhasil dihapus.');
}

function saveToLocal() {
  localStorage.clear()
  localStorage.setItem('books', JSON.stringify(books));
}

document.getElementById('search').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('search-result').classList.remove('d-none');

  let keyword = document.getElementById('keyword').value;

  finished.innerHTML = '';
  unfinish.innerHTML = '';

  let result = [];

  for (let [key, book] of Object.entries(books)) {
    if (book.title.toLowerCase() == keyword.toLowerCase()) {
      result.push(book);
    } 
  }

  pushElement(result);
})

function updateStatus(id) {
  books[searchBookById(id)].is_complete = (books[searchBookById(id)].is_complete) ? false : true;

  saveToLocal();
  pushElement(books);

  alert('Data berhasil diperbarui.');
}

function editBook(id) {
  new bootstrap.Modal('#modal').show();
  let book = books[searchBookById(id)];

  document.querySelector('#modal .modal-title').innerText = book.title;
  document.querySelector('#modal .modal-body #id').value = book.id;
  document.querySelector('#modal .modal-body #title').value = book.title;
  document.querySelector('#modal .modal-body #author').value = book.author;
  document.querySelector('#modal .modal-body #year').value = book.year;
  document.querySelector('#modal .modal-body #is_complete').checked = (book.is_complete) ? true : false;
}

function updateBook() {
  let formData = new FormData(document.getElementById('form-update'));
  let index = searchBookById(formData.get('id'));

  books[index].title = formData.get('title');
  books[index].author = formData.get('author');
  books[index].year = formData.get('year');
  books[index].is_complete = formData.get('is_complete');

  saveToLocal();
  pushElement(books);

  document.getElementById('modal-close').click();
  alert('Data berhasil disimpan');
}