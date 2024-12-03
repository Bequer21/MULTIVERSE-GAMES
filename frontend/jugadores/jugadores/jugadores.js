const BASIC_AUTH_USER = 'admin';
const BASIC_AUTH_PASS = 'admin123';

const credenciales = btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`);


function solicitud_Autenticacion(url, method = 'GET', body = null) {
    const headers = {
        'Authorization': `Basic ${credenciales}`,
        'Content-Type': 'application/json',
    };
    if (body) { // Si el método es POST, PUT o PATCH, incluye el cuerpo de la solicitud
        return fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
        });
    }
    return fetch(url, {  // Si no hay cuerpo (GET, DELETE), solo haz la solicitud con los headers
        method: method,
        headers: headers,
    });
}

window.onload = function (){
    gestion_jugadores();
}
function gestion_jugadores() {
    let jugadores = document.getElementById("jugadores");
    jugadores.innerHTML = '';
    solicitud_Autenticacion("http://localhost:3000/jugadores")
    .then(response => response.json())
    .then(datos => {

        datos.forEach(dat_jugador => {
            let jugador = document.createElement("tr");

            let id = document.createElement("th");
            id.innerHTML = dat_jugador.id;
            
            let nombre = document.createElement("td");
            nombre.innerHTML = dat_jugador.nombre;
            nombre.setAttribute("id", "jugador-" + dat_jugador.id);  
            
            let email = document.createElement("td");
            email.innerHTML = dat_jugador.email;

            let fecha = document.createElement("td");
            fecha.innerHTML = dat_jugador.fecha_creacion;

            let nivel = document.createElement("td");
            nivel.innerHTML = dat_jugador.nivel;

            let estado = document.createElement("td");
            estado.innerHTML = dat_jugador.estado;

            let pais = document.createElement("td");
            pais.innerHTML = dat_jugador.pais;

            let servidor = document.createElement("td");
            servidor.innerHTML = dat_jugador.servidor;

            jugador.appendChild(id);
            jugador.appendChild(estado);
            jugador.appendChild(nombre);
            jugador.appendChild(email);
            jugador.appendChild(fecha);
            jugador.appendChild(nivel);
            jugador.appendChild(pais);
            jugador.appendChild(servidor);

            let Boton_Editar = document.createElement("td");

            let boton_modificar = document.createElement("button");
            boton_modificar.classList.add("btn-danger");

            let i = document.createElement("i");
            i.classList.add("fa-solid", "fa-pen-to-square");

            boton_modificar.appendChild(i);
            Boton_Editar.appendChild(boton_modificar)

            let Boton_Eliminar = document.createElement("td");

            let boton_eliminar = document.createElement("button");
            boton_eliminar.classList.add("button", "is-danger", "is-light");
            boton_eliminar.onclick = function () {eliminar_dato(dat_jugador.id)};

            let j = document.createElement("i");
            j.classList.add("fas", "fa-trash");

            boton_eliminar.appendChild(j);
            Boton_Eliminar.appendChild(boton_eliminar)

            jugador.appendChild(Boton_Editar);
            jugador.appendChild(Boton_Eliminar);


            jugadores.appendChild(jugador);
        });
    })
}
function eliminar_dato(id) {
    solicitud_Autenticacion(`http://localhost:3000/jugadores/${id}`,'DELETE')
    .then(response => {
        if (response.ok) {
            gestion_jugadores();
        }
    })
}