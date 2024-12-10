

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
  
    const champion = await response.json();
    displayChampionModal(champion);
  }
  
  // Función para llenar el modal con los detalles del campeón
  function displayChampionModal(champion) {
    document.getElementById('modal-champion-name').innerText = champion.nombre;
    document.getElementById('modal-champion-image').src = champion.imagen;
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