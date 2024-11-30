const BASIC_AUTH_USER = 'admin';
const BASIC_AUTH_PASS = 'admin123';

const credenciales = btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`);


fetch("http://localhost:3000/jugadores", {
    method: 'GET',
    headers: {
        'Authorization': `Basic ${credenciales}`,
    }
})
    .then(response => response.json())
    .then(datos => {
        console.log("la base de datos esta funcionando!!!",datos)
    })  