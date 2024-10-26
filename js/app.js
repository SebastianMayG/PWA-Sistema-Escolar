const body = document.querySelector('body');
let modal;
let data;

function init() {
    let storage = localStorage.getItem('sistema-data');
    if (storage)
        data = JSON.parse(storage);
    else
        data = [];

    modal = new bootstrap.Modal(document.getElementById('exampleModal'));

    cargarDatos();
    agregarPersona();
}

function agregarPersona() {
    let boton = document.getElementById('myModal');

    boton.addEventListener('click', () => {
        modal.show();

        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';

        document.getElementById('save-person').onclick = function () {
            let nombre = document.getElementById('nombre').value;
            let apellido = document.getElementById('apellido').value;
            let id = getId();

            const persona = {
                id: id,
                nombre: nombre,
                apellido: apellido
            };

            data.push(persona);
            localStorage.setItem('sistema-data', JSON.stringify(data));

            cargarDatos();

            modal.hide();
        };
    });
}

function cargarDatos() {
    let tbody = document.getElementById('tr-values');
    tbody.innerHTML = '';

    data.forEach((persona, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>
                    <button class="btn btn-outline-warning btn-editar">Editar</button>
                    <button class="btn btn-outline-danger btn-eliminar">Eliminar</button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll('.btn-editar').forEach((btn, index) => {
        btn.addEventListener('click', () => editar(index));
    });

    document.querySelectorAll('.btn-eliminar').forEach((btn, index) => {
        btn.addEventListener('click', () => eliminar(index));
    });
}

function getId() {
    let nextId = 1;
    data.forEach(element => {
        if (element.id >= nextId)
            nextId = element.id + 1;
    });

    return nextId;
}

function editar(index) {
    document.getElementById("nombre").value = data[index].nombre;
    document.getElementById("apellido").value = data[index].apellido;

    modal.show();

    document.getElementById('save-person').onclick = function () {
        data[index].nombre = document.getElementById('nombre').value;
        data[index].apellido = document.getElementById('apellido').value;

        localStorage.setItem('sistema-data', JSON.stringify(data));
        cargarDatos();
        modal.hide();
    };
}

function eliminar(index) {
    data.splice(index, 1);
    localStorage.setItem('sistema-data', JSON.stringify(data));
    cargarDatos();
}

window.addEventListener('load', init);