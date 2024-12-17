async function fetchJugadores() {
  try {
    const response = await fetch('http://localhost:5000/jugadores/', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('admin:admin123')
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP! Status: ${response.status}`);
    }

    const jugadores = await response.json();
    populateSelects(jugadores);
    setupValidation();
  } catch (error) {
    console.error('Error al cargar los jugadores:', error);
  }
}

function populateSelects(jugadores) {
  for (let i = 1; i <= 5; i++) {
    populateSelectOptions(`jugador${i}Equipo1`, jugadores);
    populateSelectOptions(`jugador${i}Equipo2`, jugadores);
  }
}

function populateSelectOptions(selectId, jugadores) {
  const select = document.getElementById(selectId);
  jugadores.forEach(jugador => {
    const option = document.createElement('option');
    option.className = 'optionJugador'
    option.value = jugador.id_jugador;
    option.textContent = jugador.nombre;
    select.appendChild(option);
  });
}

function setupValidation() {
  const selects = document.querySelectorAll('.form-select');
  const jugadoresSeleccionados = new Set();

  selects.forEach(select => {
    select.addEventListener('change', () => {
      actualizarOpciones(selects, jugadoresSeleccionados);
    });
  });
}

function actualizarOpciones(selects, jugadoresSeleccionados) {
  // Actualizar el conjunto de jugadores seleccionados
  jugadoresSeleccionados.clear();
  selects.forEach(select => {
    if (select.value) jugadoresSeleccionados.add(select.value);
  });

  // Filtrar opciones disponibles en los demás selects
  selects.forEach(select => {
    const opciones = select.querySelectorAll('.optionJugador');
    opciones.forEach(option => {
      if (jugadoresSeleccionados.has(option.value) && select.value !== option.value) {
        option.style.display = 'none'; // Ocultar si está seleccionado en otro select
      } else {
        option.style.display = ''; // Mostrar si no está seleccionado
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', fetchJugadores);



async function fetchCampeones() {
  try {
    const response = await fetch('http://localhost:5000/campeones/', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('admin:admin123')
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP! Status: ${response.status}`);
    }

    const campeones = await response.json();
    selectsCampeones(campeones);
  } catch (error) {
    console.error('Error al cargar los jugadores:', error);
  }
}

function selectsCampeones(campeones) {
  for (let i = 1; i <= 5; i++) {
      selectCampeones(`campeon${i}Equipo1`, campeones);
      selectCampeones(`campeon${i}Equipo2`, campeones);
  }
}

function selectCampeones(selectId, campeones) {
  const select = document.getElementById(selectId);
  campeones.forEach(campeon => {
    const option = document.createElement('option');
    option.value = campeon.id_campeon;
    option.textContent = campeon.nombre;
    select.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', fetchCampeones);




document.addEventListener('DOMContentLoaded', function () {
  // Hacer la solicitud GET al servicio de partidas
  fetch('http://localhost:5000/partidas', {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa('admin:admin123'), // Autenticación básica
    },
  })
    .then((response) => response.json()) // Convertir la respuesta a JSON
    .then((data) => {
      const tbody = document.querySelector('table tbody');
  
      // Limpiar el cuerpo de la tabla antes de llenarlo
      tbody.innerHTML = '';
      console.log(data);

      // Iterar sobre los datos de las partidas y agregar filas a la tabla
      data.forEach((partida) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><a href="#" onclick="mostrarModal(${partida.id_partida})">${partida.id_partida}</a></td>
          <td>${partida.nombre}</td>
          <td>${formatearFecha(partida.fecha_inicio)}</td>
          <td>${formatearFecha(partida.fecha_fin) || 'En Partida'}</td>
          <td>${partida.estado}</td>
          <td>${partida.equipo_1_nombre}</td>
          <td>${partida.equipo_2_nombre}</td>
          <td>${partida.ganador || 'N/A'}</td>
          <td>
     <button class="btn btn-danger btn-sm" onclick="confirmDelete(${partida.id_partida})">Borrar</button>
          </td>
        `;
  
        tbody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error('Error al obtener las partidas:', error);
    });
});


let nombre_partida_actual
let fecha_inicio_actual
let equipo1_actual
let equipo2_actual


function mostrarModal(idPartida) {
  // Hacer una solicitud para obtener los detalles de los jugadores y campeones de la partida
  fetch(`http://localhost:5000/partidas/${idPartida}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa('admin:admin123'), // Autenticación básica
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const botonIniciar = document.getElementById("finalizarPartidaBtn");
      const resultadoDiv = document.querySelector(".resultado");
      const ganadorDiv = document.querySelector(".ganador");
    
    
   
      if (data.estado === "PARTIDA FINALIZADA") {
          botonIniciar.style.display = "none"; // Ocultar el botón
          resultadoDiv.textContent = "PARTIDA FINALIZADA";
          ganadorDiv.textContent = `GANADOR: ${data.ganador}`;
        }        

      nombre_partida_actual = data.nombre
      fecha_inicio_actual = data.fecha_inicio
      equipo1_actual = data.equipo_1
      equipo2_actual = data.equipo_2

      console.log(data); // Imprimir la respuesta completa en la consola para inspección
      // Reorganizar los datos en estructuras que podemos usar
      const equipo1Jugadores = [
        { nombre: data["equipo_1_jugador_1_nombre"], campeon: data["equipo_1_campeon_1_nombre"] },
        { nombre: data["equipo_1_jugador_2_nombre"], campeon: data["equipo_1_campeon_2_nombre"] },
        { nombre: data["equipo_1_jugador_3_nombre"], campeon: data["equipo_1_campeon_3_nombre"] },
        { nombre: data["equipo_1_jugador_4_nombre"], campeon: data["equipo_1_campeon_4_nombre"] },
        { nombre: data["equipo_1_jugador_5_nombre"], campeon: data["equipo_1_campeon_5_nombre"] }
      ];

      const equipo2Jugadores = [
        { nombre: data["equipo_2_jugador_1_nombre"], campeon: data["equipo_2_campeon_1_nombre"] },
        { nombre: data["equipo_2_jugador_2_nombre"], campeon: data["equipo_2_campeon_2_nombre"] },
        { nombre: data["equipo_2_jugador_3_nombre"], campeon: data["equipo_2_campeon_3_nombre"] },
        { nombre: data["equipo_2_jugador_4_nombre"], campeon: data["equipo_2_campeon_4_nombre"] },
        { nombre: data["equipo_2_jugador_5_nombre"], campeon: data["equipo_2_campeon_5_nombre"] }
      ];

      // Obtener las tablas de los equipos
      const tablaEquipo1 = document.getElementById('tablaEquipo1').querySelector('tbody');
      const tablaEquipo2 = document.getElementById('tablaEquipo2').querySelector('tbody');

  
      const titulo_equipo1 = document.getElementById('titulo_equipo1')
      const titulo_equipo2 = document.getElementById('titulo_equipo2')

      titulo_equipo1.innerText= data.equipo_1_nombre
      titulo_equipo2.innerText= data.equipo_2_nombre

      
      // Limpiar las tablas antes de agregar nuevos datos
      tablaEquipo1.innerHTML = '';
      tablaEquipo2.innerHTML = '';



      // Agregar los jugadores y campeones del Equipo 1
      equipo1Jugadores.forEach((jugador) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${jugador.nombre}</td>
          <td>${jugador.campeon}</td>
        `;
        tablaEquipo1.appendChild(row);
      });

      // Agregar los jugadores y campeones del Equipo 2
      equipo2Jugadores.forEach((jugador) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${jugador.nombre}</td>
          <td>${jugador.campeon}</td>
        `;
        tablaEquipo2.appendChild(row);
      });


      // Mostrar el modal
      new bootstrap.Modal(document.getElementById('modalPartida')).show();
    })
    .catch((error) => {
      console.error('Error al obtener los detalles de los jugadores:', error);
    });

  // Agregar evento al botón de finalizar partida
  const finalizarPartidaBtn = document.getElementById('finalizarPartidaBtn');
  finalizarPartidaBtn.addEventListener('click', function() {
      let equipo1 = document.getElementById('titulo_equipo1')
      let equipo2 = document.getElementById('titulo_equipo2')


      const ganador = Math.random() < 0.5 ? equipo1.innerText : equipo2.innerText;
      console.log(nombre_partida_actual)

      fetch(`http://localhost:5000/partidas/${idPartida}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:admin123'), // Autenticación básica
          },
          body: JSON.stringify({
            estado: "PARTIDA FINALIZADA",
            fecha_fin: new Date(),
            ganador: ganador,
            nombre: nombre_partida_actual,
            fecha_inicio: fecha_inicio_actual,
            equipo_1: equipo1_actual,
            equipo_2: equipo2_actual
          })
        })
        .then(response => response.json())
        .then(updatedData => {
          console.log("Partida finalizada", updatedData);
          alert("La partida ha sido finalizada");
          location.reload()
        })
        .catch(error => {
          console.error('Error al finalizar la partida:', error);
        });
      });
}
// Confirmar y eliminar una partida
function confirmDelete(id) {
  if (confirm('¿Estás seguro de que deseas borrar esta partida?')) {
    deletePartida(id);
  }
}

// Eliminar una partida
async function deletePartida(id) {
  try {
    const response = await fetch(`http://localhost:5000/partidas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Basic ' + btoa('admin:admin123'),
      },
    });

    if (response.ok) {
      alert('Partida eliminada correctamente.');
      location.reload(); // Recargar la tabla tras eliminar
    } else {
      const error = await response.text();
      alert('Error al eliminar la partida: ' + error);
    }
  } catch (error) {
    console.error('Error al eliminar la partida:', error);
  }
}










document.querySelector("#agregarPartidaModal form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const nombrePartida = document.getElementById("nombrePartida").value;

  // Obtener los IDs de los jugadores y campeones de los equipos
  const equipo1 = {
      nombre: document.getElementById("nombreEquipo1").value,
      victorias: 0,
      jugador_1: document.getElementById("jugador1Equipo1").value,
      jugador_2: document.getElementById("jugador2Equipo1").value,
      jugador_3: document.getElementById("jugador3Equipo1").value,
      jugador_4: document.getElementById("jugador4Equipo1").value,
      jugador_5: document.getElementById("jugador5Equipo1").value,
      campeon_1: document.getElementById("campeon1Equipo1").value,
      campeon_2: document.getElementById("campeon2Equipo1").value,
      campeon_3: document.getElementById("campeon3Equipo1").value,
      campeon_4: document.getElementById("campeon4Equipo1").value,
      campeon_5: document.getElementById("campeon5Equipo1").value,
  };

  const equipo2 = {
      nombre: document.getElementById("nombreEquipo2").value,
      victorias: 0,
      jugador_1: document.getElementById("jugador1Equipo2").value,
      jugador_2: document.getElementById("jugador2Equipo2").value,
      jugador_3: document.getElementById("jugador3Equipo2").value,
      jugador_4: document.getElementById("jugador4Equipo2").value,
      jugador_5: document.getElementById("jugador5Equipo2").value,
      campeon_1: document.getElementById("campeon1Equipo2").value,
      campeon_2: document.getElementById("campeon2Equipo2").value,
      campeon_3: document.getElementById("campeon3Equipo2").value,
      campeon_4: document.getElementById("campeon4Equipo2").value,
      campeon_5: document.getElementById("campeon5Equipo2").value,
  };

  // Enviar los datos de los equipos
  const authHeader = "Basic " + btoa("admin:admin123"); // Basic Auth

  // 1) Crear el primer equipo (equipo1)
  fetch('http://localhost:5000/equipos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
      },
      body: JSON.stringify(equipo1)
  })
  .then(response => response.json())
  .then(data1 => {
      const equipo1Id = data1.id_equipo; // ID del primer equipo

      // 2) Crear el segundo equipo (equipo2)
      fetch('http://localhost:5000/equipos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': authHeader
          },
          body: JSON.stringify(equipo2)
      })
      .then(response => response.json())
      .then(data2 => {
          const equipo2Id = data2.id_equipo; // ID del segundo equipo

          // 3) Crear la partida con los IDs de los equipos
          const partida = {
              nombre: nombrePartida,
              estado: 'PARTIDA INICIADA',  // Suponiendo que la partida está pendiente al inicio
              equipo_1: equipo1Id,
              equipo_2: equipo2Id
          };

          fetch('http://localhost:5000/partidas', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': authHeader
              },
              body: JSON.stringify(partida)
          })
          .then(response => response.json())
          .then(data => {
              console.log("Partida creada con éxito:", data);
              alert("Partida y equipos creados exitosamente.");
              document.getElementById('formulario-carga').reset();

              // Aquí podrías cerrar el modal o realizar otra acción.
              location.reload();
          })
          .catch(error => {
              console.error('Error al crear la partida:', error);
              alert('Error al crear la partida.');
          });
      })
      .catch(error => {
          console.error('Error al crear el segundo equipo:', error);
          alert('Error al crear el segundo equipo.');
      });
  })
  .catch(error => {
      console.error('Error al crear el primer equipo:', error);
      alert('Error al crear el primer equipo.');
  });
});





function formatearFecha(fechaISO) {
  if (fechaISO === null || fechaISO === undefined) {
      return ''; 
  }
  // Crear un objeto Date a partir de la fecha ISO
  const fecha = new Date(fechaISO);

  // Formatear los componentes de la fecha
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
  const dia = String(fecha.getDate()).padStart(2, '0');
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');

  // Retornar la fecha formateada
  return `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
}



