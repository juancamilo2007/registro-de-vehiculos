const apiUrl = 'https://mocki.io/v1/5188e6dc-0445-4f3b-b383-b65a19a58acc';
let productos = []; 

async function cargarDatos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        productos = await response.json(); 

        mostrarProductos(productos); 

    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('No se pudieron cargar los datos. Intenta de nuevo más tarde.');
    }
}

function mostrarProductos(data) {
    const tabla = document.getElementById('tabla-productos').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; 

    data.forEach((producto) => {
        const fila = document.createElement('tr');
        const celdas = [
            producto.id || 'N/A',
            producto.nombre || 'N/A',
            producto.modelo || 'N/A',
            producto.color || 'N/A',
            producto.potencia || 'N/A',
            producto.KM_l || 'N/A'
        ];

        celdas.forEach(texto => {
            const celda = document.createElement('td');
            celda.textContent = texto;
            fila.appendChild(celda);
        });

        tabla.appendChild(fila);
    });
}

function consultarUno() {
    const idBuscado = document.getElementById('txtConsulta').value.trim();
    const resultados = productos.filter(producto => producto.id.toString() === idBuscado);

    limpiarTextareas();

    if (resultados.length > 0) {
        const productoEncontrado = resultados[0];

        document.getElementById('consultaNombre').value = productoEncontrado.nombre || 'N/A';
        document.getElementById('consultaModelo').value = productoEncontrado.modelo || 'N/A';
        document.getElementById('consultaColor').value = productoEncontrado.color || 'N/A';
        document.getElementById('consultaAlmacenamiento').value = productoEncontrado.potencia || 'N/A';
        document.getElementById('consultaProcesador').value = productoEncontrado.KM_l || 'N/A';
    } else {
        alert('No se encontraron productos con ese ID.');
    }
}

function limpiarTextareas() {
    document.getElementById('consultaNombre').value = '';
    document.getElementById('consultaModelo').value = '';
    document.getElementById('consultaColor').value = '';
    document.getElementById('consultaAlmacenamiento').value = '';
    document.getElementById('consultaProcesador').value = '';
}

function modificarUno() {
    const idBuscado = document.getElementById('txtConsulta').value.trim();
    const index = productos.findIndex(producto => producto.id.toString() === idBuscado);

    if (index !== -1) {
        const nuevoProducto = {
            id: idBuscado,
            nombre: document.getElementById('consultaNombre').value,
            modelo: document.getElementById('consultaModelo').value,
            color: document.getElementById('consultaColor').value,
            potencia: document.getElementById('consultaAlmacenamiento').value,
            KM_l: document.getElementById('consultaProcesador').value,
        };

        productos[index] = nuevoProducto; 
        mostrarProductos(productos); 
        alert('Producto modificado correctamente.');
    } else {
        alert('No se encontró un producto con ese ID para modificar.');
    }
}

function eliminarUno() {
    const idBuscado = document.getElementById('txtConsulta').value.trim();
    const index = productos.findIndex(producto => producto.id.toString() === idBuscado);

    if (index !== -1) {
        productos.splice(index, 1); 

        mostrarProductos(productos);

        limpiarTextareas(); 

        alert('Producto eliminado correctamente.');
    } else {
        alert('No se encontró un producto con ese ID para eliminar.');
    }
}

function agregarUno() {

    const nombre = document.getElementById('inputNombre').value.trim();
    const modelo = document.getElementById('inputModelo').value.trim();
    const color = document.getElementById('inputColor').value.trim();
    const potencia = document.getElementById('inputPotencia').value.trim();
    const KM_l = document.getElementById('inputKM/L').value.trim();


    if (!nombre || !modelo || !color || !potencia || !KM_l) {
        alert('Por favor, complete todos los campos antes de agregar un nuevo producto.');
        return; 
    }

    const nuevoProducto = {
        id: (productos.length + 1).toString(),
        nombre: nombre,
        modelo: modelo,
        color: color,
        potencia: potencia,
        KM_l: KM_l,
    };

    productos.push(nuevoProducto);

    mostrarProductos(productos); 

    alert('Producto agregado correctamente.');

    

    document.getElementById('inputNombre').value = '';
    document.getElementById('inputModelo').value = '';
    document.getElementById('inputColor').value = '';
    document.getElementById('inputPotencia').value = '';
    document.getElementById('inputKM/L').value = '';
}

window.onload = cargarDatos;
