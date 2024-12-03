const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('myModal');

openModalBtn.addEventListener('click', function() {
    modal.classList.add('is-active');
});

closeModalBtn.addEventListener('click', function() {
    modal.classList.remove('is-active'); 
});

modal.querySelector('.modal-background').addEventListener('click', function() {
    modal.classList.remove('is-active');  // Cerrar el modal cuando se hace clic fuera del modal
});