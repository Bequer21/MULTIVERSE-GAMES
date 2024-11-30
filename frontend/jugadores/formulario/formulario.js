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

solicitud_Autenticacion("http://localhost:3000/jugadores")
    .then(response => response.json())
    .then(datos => {
        console.log("Datos de jugadores:", datos);
    })