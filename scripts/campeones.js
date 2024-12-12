let id_campeon_global


// Función para obtener todos los campeones
async function getAllChampions() {
    const response = await fetch('http://localhost:5000/campeones', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('admin:admin123') // Autenticación básica
      }
    });
  
    if (!response.ok) {
      console.error('Error al obtener los campeones');
      return;
    }
  
    const champions = await response.json();
    displayChampions(champions);
  }
  
  // Función para mostrar los campeones en la pantalla
  function displayChampions(champions) {
    const container = document.getElementById('champions-container');
    container.innerHTML = ''; // Limpiar contenido previo
  
    champions.forEach(champion => {
      const card = document.createElement('div');
      card.classList.add('card', 'col-md-3', 'mb-4');
      card.innerHTML = `
        <a href="#" class="card-link" data-id="${champion.id_campeon}">
          <div class="card-body">
            <h5 class="card-title text-center">${champion.nombre}</h5>
            <img src="http://localhost:5000${champion.imagen}" alt="${champion.nombre}" class="card-img-top">
          </div>
        </a>
      `;
  
  
  
      container.appendChild(card);
    });
  
    // Añadir el evento de click para cada tarjeta
    document.querySelectorAll('.card-link').forEach(card => {
      card.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        getChampionDetails(id);
        id_campeon_global = id

      });
    });
  }
  
  // Función para obtener los detalles del campeón por ID
  async function getChampionDetails(id) {
    const response = await fetch(`http://localhost:5000/campeones/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('admin:admin123') // Autenticación básica
      }
    });
  
    if (!response.ok) {
      console.error('Error al obtener el campeón');
      return;
    }
  
    let champion = await response.json();
    console.log(champion)
    displayChampionModal(champion);
  }
  
  // Función para llenar el modal con los detalles del campeón
  function displayChampionModal(champion) {
    
    document.getElementById('modal-champion-name').innerText = champion.nombre;
    document.getElementById('modal-champion-image').src = "http://localhost:5000"+champion.imagen;
    document.getElementById('modal-champion-role').innerText = champion.rol;
    document.getElementById('modal-champion-history').innerText = champion.historia;
    document.getElementById('modal-champion-difficulty').innerText = champion.dificultad;
    document.getElementById('modal-champion-ability').innerText = champion.habilidad.nombre;
  
    // Mostrar el modal
    const myModal = new bootstrap.Modal(document.getElementById('championModal'));
    myModal.show();
  }
  
  // Llamar a la función para cargar los campeones al inicio
  getAllChampions();
  
  
  
  document.getElementById('addChampionForm').addEventListener('submit', event => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
  
    fetch('http://localhost:5000/campeones', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Basic ' + btoa('admin:admin123'), // Autenticación básica
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el campeón: ' + response.statusText);
          
        }
        return response.json();
      })
      .then(data => {
        console.log('Campeón agregado con éxito:', data);
        // Opcional: Recargar la lista de campeones o cerrar el modal
        alert(`¡Campeón agregado exitosamente!`);
        document.getElementById('addChampionForm').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addChampionModal'));
        modal.hide();
        window.location.reload();
  
      })
      .catch(error => console.error('Error:', error));
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el botón de "Agregar Campeón"
    const agregarButton = document.getElementById('agregarCampeon');
  
    // Agrega un evento de clic al botón
    agregarButton.addEventListener('click', () => {
      fetch('http://localhost:5000/habilidades', {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:admin123'), // Autenticación básica
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const abilitySelect = document.getElementById('championAbility');
        data.forEach(habilidad => {
          const option = document.createElement('option');
          option.value = habilidad.id_habilidad;
          option.textContent = habilidad.nombre;
          abilitySelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar habilidades:', error));
    });
  
  
    // Evento para actualizar los atributos de la habilidad seleccionada
    document.getElementById('championAbility').addEventListener('change', (event) => {
      const abilityId = event.target.value;
      if (abilityId) {
        fetch(`http://localhost:5000/habilidades/${abilityId}`, {
          headers: {
            'Authorization': 'Basic ' + btoa('admin:admin123'),
          },
        })
        .then(response => response.json())
        .then(data => {
          // Mostrar los atributos de la habilidad seleccionada
          console.log(data)
          document.getElementById('abilityDescription').innerText = data.descripcion;
          document.getElementById('abilityStrength').innerText = data.fuerza;
          document.getElementById('abilityCooldown').innerText = data.tiempo_enfriamiento.seconds;
          document.getElementById('abilityManaCost').innerText = data.consumo_mana;
  
          // Hacer visibles los campos de atributos
          document.getElementById('abilityAttributes').style.display = 'block';
        })
        .catch(error => console.error('Error al cargar los detalles de la habilidad:', error));
      } else {
        // Si no hay habilidad seleccionada, ocultar los atributos
        document.getElementById('abilityAttributes').style.display = 'none';
      }
    });
  });
    // Limpiar los campos del formulario al abrir el modal
    const addChampionModal = document.getElementById('addChampionModal');
    addChampionModal.addEventListener('show.bs.modal', function () {
      // Limpiar los campos del formulario
      let form = document.getElementById('addChampionForm');
      form.reset(); // Restablece todos los campos del formulario a su valor por defecto
      document.getElementById('abilityAttributes').style.display = 'none';
  
    });





    //AGREGAR HABILIDADERS

    
    document.addEventListener('DOMContentLoaded', () => {
        const addAbilityModal = new bootstrap.Modal(document.getElementById('addAbilityModal'));
        const openAddAbilityModalButton = document.getElementById('openAddAbilityModal');
        const addAbilityForm = document.getElementById('addAbilityForm');
        const championAbilitySelect = document.getElementById('championAbility');
        const addChampionModalElement = document.getElementById('addChampionModal');
        const addChampionModal = bootstrap.Modal.getInstance(addChampionModalElement) || new bootstrap.Modal(addChampionModalElement);
    
        // Abrir modal al hacer clic en el botón
        openAddAbilityModalButton.addEventListener('click', () => {
            addAbilityModal.show();
            let form = document.getElementById('addAbilityForm');
            form.reset(); // Restablece todos los campos del formulario a su valor por defecto
            addChampionModal.hide(); // Oculta el modal de agregar campeón
        });
      
        // Manejar el envío del formulario para agregar habilidad
        addAbilityForm.addEventListener('submit', (event) => {
          event.preventDefault();
      
          const formData = {
            nombre: document.getElementById('abilityName').value,
            descripcion: document.getElementById('abilityDescriptionInput').value,
            fuerza: document.getElementById('abilityStrengthInput').value,
            tiempo_enfriamiento: document.getElementById('abilityCooldownInput').value,
            consumo_mana: document.getElementById('abilityManaCostInput').value,
          };
      
          fetch('http://localhost:5000/habilidades', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('admin:admin123'),

            },
            body: JSON.stringify(formData),
          })
            .then((response) => {
              if (response.ok) {
                alert('Habilidad agregada exitosamente');
      
                window.location.reload();

              } else {
                alert('Error al agregar la habilidad');
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('Hubo un problema al intentar agregar la habilidad');
            });
        });
      });






      document.getElementById('editChampionButton').addEventListener('click', () => {


        const ChampionModalDetailElement = document.getElementById('championModal');
        const ChampionModalDetail = bootstrap.Modal.getInstance(ChampionModalDetailElement) || new bootstrap.Modal(ChampionModalDetailElement);
        ChampionModalDetail.hide(); // Oculta el modal de agregar campeón
    



        const modalEdit = new bootstrap.Modal(document.getElementById('championModaledit'));

        modalEdit.show()
        let rol = document.getElementById('modal-champion-role').innerText
        let difficulty = document.getElementById('modal-champion-difficulty').innerText;

        const detailsContainer = document.getElementById('championedit');
        // Transformar los detalles en campos editables
        let textoPredeterminado = document.getElementById('modal-champion-ability').innerText;
        detailsContainer.innerHTML = `
          <div>
            <label>Nombre:</label>
            <input type="text" id="edit-champion-name" class="form-control" value="${document.getElementById('modal-champion-name').innerText}">
          </div>
          <div>
            <label>Habilidad:</label>
            <select class="form-select" id="edit-champion-ability" name="habilidad" required>
              <option value="" disabled selected>Selecciona una habilidad</option>
              <!-- Opciones dinámicas -->
            </select>
            </div>
          <div>
            <label>Rol:</label>
              <select class="form-select" id="edit-champion-role" class="form-control" required>
              <option value="" disabled selected>Selecciona Rol</option>
              <option value="Tirador">Tirador</option>
              <option value="Mago">Mago</option>
              <option value="Luchador">Luchador</option>
              <option value="Asesino">Asesino</option>
              <option value="Tanque">Tanque</option>
              <option value="Soporte">Soporte</option>
            </select>

          </div>
          <div>
            <label>Historia:</label>
            <textarea id="edit-champion-history" class="form-control">${document.getElementById('modal-champion-history').innerText}</textarea>
          </div>
          <div>
            <label>Dificultad:</label>
            <select class="form-select" id="edit-champion-difficulty" required>
              <option value="" disabled selected>Selecciona la dificultad</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
                <div style="padding-bottom: 30px;">
        <label>Cargar nueva imagen:</label>
        <input type="file" id="edit-champion-image" class="form-control">
      </div>
          <button type="button" id="saveEditChampionButton" class="btn btn-warning mt-3">Guardar</button>
    
          </div>
          `;
        // Selecciona el elemento <select>
        const rolelement = document.getElementById("edit-champion-role");
        const difficultyelement = document.getElementById("edit-champion-difficulty")

        // Itera sobre las opciones para encontrar el texto coincidente
        Array.from(difficultyelement.options).forEach(option => {
            if (option.textContent === difficulty) {
            option.selected = true;
            }
        });

        // Itera sobre las opciones para encontrar el texto coincidente
        Array.from(rolelement.options).forEach(option => {
            if (option.textContent === rol) {
            option.selected = true;
            }
        });

        fetch('http://localhost:5000/habilidades', {
            headers: {
            'Authorization': 'Basic ' + btoa('admin:admin123'), // Autenticación básica
            },
        })
        .then(response => response.json())
        .then(data => {
            const abilitySelect = document.getElementById('edit-champion-ability');

            console.log(data);
            data.forEach(habilidad => {
            const option = document.createElement('option');
            option.value = habilidad.id_habilidad;
            option.textContent = habilidad.nombre;
            abilitySelect.appendChild(option);
            if (option.textContent === textoPredeterminado) {
                option.selected = true;
              }
            });
        })
        .catch(error => console.error('Error al cargar habilidades:', error));


  
    // Agregar funcionalidad al botón de guardar
    document.getElementById('saveEditChampionButton').addEventListener('click', async () => {
        const formData = new FormData();

        // Agregar los campos al FormData
        formData.append('nombre', document.getElementById('edit-champion-name').value);
        formData.append('habilidad', document.getElementById('edit-champion-ability').value);
        formData.append('rol', document.getElementById('edit-champion-role').value);
        formData.append('historia', document.getElementById('edit-champion-history').value);
        formData.append('dificultad', document.getElementById('edit-champion-difficulty').value);

        // Verificar si se seleccionó una nueva imagen
        const imageFile = document.getElementById('edit-champion-image').files[0];
        if (imageFile) {
            formData.append('imagen', imageFile);
        }

        try {
            const response = await fetch(`http://localhost:5000/campeones/${id_campeon_global}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Basic ' + btoa('admin:admin123')
                },
                body: formData
            });

            if (response.ok) {
                alert('Campeón actualizado exitosamente');
                location.reload();
            } else {
                alert('Error al actualizar el campeón');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    });




    //BORRAR CAMPEON
    document.getElementById('deleteChampionButton').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres borrar este campeón?')) {
            fetch(`http://localhost:5000/campeones/${id_campeon_global}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + btoa('admin:admin123')
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Campeón eliminado exitosamente');
                    location.reload();
                } else {
                    alert('Error al eliminar el campeón');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });