const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('myModal');

openModalBtn.addEventListener('click', function() {
    modal.classList.add('is-active');
    limpiarModal();
});

closeModalBtn.addEventListener('click', function() {
    modal.classList.remove('is-active'); 
    limpiarModal();
});

modal.querySelector('.modal-background').addEventListener('click', function() {
    modal.classList.remove('is-active');  // Cerrar el modal cuando se hace clic fuera del modal
    limpiarModal();
});

function limpiarModal() {
    document.getElementById('nombre').value = ''; 
    document.getElementById('contraseña').value = '';
    document.getElementById('email').value = '';
    document.getElementById('nivel').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('pais').value = '';
    document.getElementById('servidor').value = '';
    document.getElementById('nombre').focus(); // para que vuelva al inicio cuando se abra el modal nuevamente
}
function cerrarModal() {
    const modal = document.getElementById('myModal');
    modal.classList.remove('is-active'); 
    limpiarModal();
}

function restaurar() {
    editarInvisible.style.display = 'none';
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
                    limpiarModal();
                    cerrarModal();
                    gestion_jugadores();
                    editarInvisible.style.display = 'inline-block';
                } else {
                    alert('No se pudo crear');
                    limpiarModal();
                }
            })
    }
}