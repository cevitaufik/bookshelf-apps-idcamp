let finished, unfinish;
let books = [];

function pushElement(books) {
  finished.innerHTML = '';
  unfinish.innerHTML = '';

  for (let [key, book] of Object.entries(books)) {
    if (book.is_complete) {
      finished.insertAdjacentHTML('beforeend', createCard(book))
    } else {
      unfinish.insertAdjacentHTML('beforeend', createCard(book))
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  finished = document.getElementById('finished');
  unfinish = document.getElementById('unfinish');

  if (typeof Storage != 'undefined') {

    books = (JSON.parse(localStorage.getItem('books'))) ?? [];

    if (books.length) { pushElement(books) }

  }
});

function addbook() {
  let form = new FormData(document.getElementById('form'))
  form.append('id', Date.now());
  form = Object.fromEntries(form);
  form.is_complete = (form.is_complete) ? true : false;
  books.push(form);
  localStorage.setItem('books', JSON.stringify(books));
  pushElement(books);
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
                <a class="btn btn-danger" onclick="deleteBook('${book.id}')">Hapus</a>
              </div>
            </div>
          </div>`
}


// let tes = [
//   {
//     id: 123,
//     title: 'The Mennonite Queen',
//     author: 'Patrick E. Craig',
//     year: 2018,
//     isComplete: true,
//   },
//   {
//     id: 456,
//     title: 'The Scepter and the Isle',
//     author: 'Patrick E. Craig',
//     year: 2021,
//     isComplete: false,
//   }
// ]

// localStorage.setItem('books', JSON.stringify(tes));

/**
 * tinggal membuat fungsi 
 * delete
 * edit
 * serach
 */