const apiUrl = "http://localhost:5000/habilidades";
const habilidadesContainer = document.getElementById("habilidadesContainer");
const habilidadForm = document.getElementById("habilidadForm");

// Autenticación básica
const username = "admin";
const password = "admin123";
const base64Auth = btoa(`${username}:${password}`);

// Función para obtener todas las habilidades
async function getHabilidades() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Basic ${base64Auth}`
            }
        });
        if (response.ok) {
            const habilidades = await response.json();
            displayHabilidades(habilidades);
        } else {
            alert("Error al obtener las habilidades");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

// Mostrar las habilidades en la tabla
function displayHabilidades(habilidades) {
    // Ordenar las habilidades por id_habilidad en orden ascendente
    habilidades.sort((a, b) => a.id_habilidad - b.id_habilidad);

    let html = "";
    habilidades.forEach(habilidad => {
        html += `
            <tr>
                <td>${habilidad.id_habilidad}</td>
                <td>${habilidad.nombre}</td>
                <td>${habilidad.descripcion}</td>
                <td>${habilidad.fuerza}</td>
                <td>${habilidad.tiempo_enfriamiento}</td>
                <td>${habilidad.consumo_mana}</td>
                <td>
                    <button class="btn btn-violet" onclick="editHabilidad(${habilidad.id_habilidad})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-light" onclick="confirmDelete(${habilidad.id_habilidad})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    });
    habilidadesContainer.innerHTML = html;
}

// Función de búsqueda
function searchHabilidades() {
    const query = document.getElementById("searchInput").value.toLowerCase();  // Obtener el texto del input y pasarlo a minúsculas
    const habilidades = document.querySelectorAll("#habilidadesContainer tr");  // Seleccionar todas las filas de la tabla

    // Filtrar las filas
    habilidades.forEach(habilidad => {
        const nombre = habilidad.querySelector("td:nth-child(2)").textContent.toLowerCase();  // Obtener el nombre de la habilidad
        if (nombre.includes(query)) {
            habilidad.style.display = "";  // Mostrar la fila si el nombre contiene el texto de búsqueda
        } else {
            habilidad.style.display = "none";  // Ocultar la fila si no
        }
    });
}
// Función para agregar habilidad
habilidadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const habilidadData = {
        nombre: document.getElementById("nombre").value,
        fuerza: document.getElementById("fuerza").value,
        descripcion: document.getElementById("descripcion").value,
        tiempo_enfriamiento: document.getElementById("tiempo_enfriamiento").value,
        consumo_mana: document.getElementById("consumo_mana").value
    };

    const id_habilidad = document.getElementById("id_habilidad") ? document.getElementById("id_habilidad").value : null;

    try {
        const response = id_habilidad
            ? await fetch(`${apiUrl}/${id_habilidad}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Basic ${base64Auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(habilidadData)
            })
            : await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    "Authorization": `Basic ${base64Auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(habilidadData)
            });

        if (response.ok) {
            alert(id_habilidad ? "Habilidad modificada" : "Habilidad agregada");
            location.reload()
        } else {
            alert("Error al guardar habilidad");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
});

// Función para editar habilidad
async function editHabilidad(id) {
    const habilidad = await getHabilidadById(id);
    if (habilidad) {
        document.getElementById("nombre").value = habilidad.nombre;
        document.getElementById("fuerza").value = habilidad.fuerza;
        document.getElementById("descripcion").value = habilidad.descripcion;
        document.getElementById("tiempo_enfriamiento").value = habilidad.tiempo_enfriamiento;
        document.getElementById("consumo_mana").value = habilidad.consumo_mana;
        
        document.getElementById("addHabilidadModalLabel").textContent = "Editar Habilidad";
        const idField = document.createElement("input");
        idField.setAttribute("type", "hidden");
        idField.setAttribute("id", "id_habilidad");
        idField.setAttribute("value", id);
        document.getElementById("habilidadForm").appendChild(idField);
        
        // No resetear formulario al abrir el modal de editar
        const myModal = new bootstrap.Modal(document.getElementById("addHabilidadModal"));
        myModal.show();
    }
}

// Obtener una habilidad por su ID
async function getHabilidadById(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            headers: {
                "Authorization": `Basic ${base64Auth}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error: ", error);
    }
}

// Confirmar eliminación de habilidad
async function confirmDelete(id) {
    if (confirm("¿Estás seguro de eliminar esta habilidad?")) {
        await deleteHabilidad(id);
    }
}

// Eliminar habilidad
async function deleteHabilidad(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Basic ${base64Auth}`
            }
        });
        if (response.ok) {
            alert("Habilidad eliminada");
            location.reload()
        } else {
            alert("Error al eliminar habilidad");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

// Reiniciar el formulario
function resetForm() {
    document.getElementById("habilidadForm").reset();
    document.getElementById("id_habilidad")?.remove();
    document.getElementById("addHabilidadModalLabel").textContent = "Agregar Nueva Habilidad";
}

// Cargar las habilidades al iniciar
getHabilidades();
