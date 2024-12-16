import './perfil.css';

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

function limpiarModal() {
    document.getElementById('nombre').value = ''; 
    document.getElementById('contraseña').value = '';
    document.getElementById('email').value = '';
    document.getElementById('nivel').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('pais').value = '';
    document.getElementById('servidor').value = '';
}
function cerrarModal() {
    const modal = document.getElementById('myModal');
    modal.classList.remove('is-active'); 
}
function crearJugador() {
    const form = document.getElementById('formulario');
    const inputs = form.querySelectorAll('input[required]');
    let formIsValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            formIsValid = false;
            input.classList.add('is-danger'); 
        } else {
            input.classList.remove('is-danger');
        }
    });

    if (!formIsValid) {
        event.preventDefault();
        alert('Por favor, completa todos los campos requeridos.');
    }else{
        event.preventDefault();
        const Nombre = document.getElementById('nombre').value;
        const Contrasena = document.getElementById('contraseña').value;
        const Email = document.getElementById('email').value;
        const Nivel = document.getElementById('nivel').value;
        const Estado = document.getElementById('estado').value;
        const Pais = document.getElementById('pais').value;
        const Servidor = document.getElementById('servidor').value;
        let datos_jugador = {
            nombre: Nombre, 
            contrasena: Contrasena, 
            email: Email,
            nivel: parseInt(Nivel), 
            estado: Estado, 
            pais: Pais, 
            servidor: Servidor
        };
        solicitud_Autenticacion("http://localhost:5000/jugadores",'POST',datos_jugador)
            .then(response => {
                if (response.status === 201) {
                    alert('Jugador creado con exito');
                    cerrarModal();
                    limpiarModal();
                    gestion_jugadores();
                }else {
                    alert('No se pudo crear');
                    limpiarModal();
                }
            })
    }
}