const hamburgerButtonElement = document.querySelector('#hamburger');
const drawerElement = document.querySelector('#drawer');
const mainElement = document.querySelector('main');
const alertSearch = document.querySelector('.search')


hamburgerButtonElement.addEventListener('click', event => {
  drawerElement.classList.toggle('open');
  event.stopPropagation();
});

mainElement.addEventListener('click', event => {
  drawerElement.classList.remove('open');
  event.stopPropagation();
});

alertSearch.addEventListener('click', event => {
  Swal.fire('Fitur belum tersedia!')
  event.stopPropagation();
})
