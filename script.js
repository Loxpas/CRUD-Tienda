let productos = []; // Este array mantendrá los productos en la memoria del navegador.

document.addEventListener('DOMContentLoaded', () => {
    mostrarInicio(); // Muestra la vista de inicio al cargar la página
});

function mostrarGestion() {
    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('productos-container').style.display = 'none';
    document.getElementById('gestionar-container').style.display = 'block';
    actualizarTablaGestion(); // Actualiza la tabla cada vez que se muestra la sección Gestionar
}

function mostrarProductos() {
    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = ''; // Limpiar contenedor antes de mostrar

    productos.forEach((producto, index) => {
        productosContainer.innerHTML += `
            <div class="producto">
                <h3>${producto.marca}</h3>
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
                <button class="comprar-btn">Comprar</button>
            </div>
        `;
    });

    document.getElementById('inicio-container').style.display = 'none';
    document.getElementById('gestionar-container').style.display = 'none';
    productosContainer.style.display = 'block';
}

function mostrarInicio() {
    document.getElementById('gestionar-container').style.display = 'none';
    document.getElementById('productos-container').style.display = 'none';
    document.getElementById('inicio-container').style.display = 'block';
}

function agregar() {
    document.getElementById('form-container').style.display = 'block';
}

function guardarTenis() {
    const marca = document.getElementById('marca').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;

    if (!marca || !descripcion || !precio) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const nuevoProducto = { marca, descripcion, precio };
    productos.push(nuevoProducto);
    mostrarProductos(); // Actualiza la vista de productos.
    actualizarTablaGestion(); // Añade el producto a la tabla en Gestionar.
    cancelar(); // Limpia el formulario.
}

function actualizarTablaGestion() {
    const tablaTenis = document.getElementById('tabla-tenis');
    tablaTenis.innerHTML = ''; // Limpia la tabla antes de actualizar.

    productos.forEach((producto, index) => {
        const fila = tablaTenis.insertRow();
        fila.innerHTML = `
            <td>${producto.marca}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td>
                <button class="editar-btn" onclick="editarProducto(${index})">Editar</button>
                <button class="eliminar-btn" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
    });
}

function editarProducto(index) {
    const producto = productos[index];
    const tablaTenis = document.getElementById('tabla-tenis');
    const fila = tablaTenis.rows[index];
    
    fila.innerHTML = `
        <td><input type="text" id="edit-marca-${index}" value="${producto.marca}"></td>
        <td><input type="text" id="edit-descripcion-${index}" value="${producto.descripcion}"></td>
        <td><input type="number" id="edit-precio-${index}" value="${producto.precio}"></td>
        <td>
            <button class="guardar-btn" onclick="guardarEdicion(${index})">Guardar</button>
            <button class="eliminar-btn" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
    `;
}

function guardarEdicion(index) {
    const marca = document.getElementById(`edit-marca-${index}`).value;
    const descripcion = document.getElementById(`edit-descripcion-${index}`).value;
    const precio = document.getElementById(`edit-precio-${index}`).value;

    if (!marca || !descripcion || !precio) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    productos[index] = { marca, descripcion, precio };
    actualizarTablaGestion(); // Actualiza la tabla con los nuevos valores.
    mostrarProductos(); // Opcional: actualiza la vista de productos.
}

function eliminarProducto(index) {
    if (confirm('¿Estás seguro de querer eliminar este producto?')) {
        productos.splice(index, 1); // Elimina el producto del array.
        actualizarTablaGestion(); // Actualiza la tabla después de eliminar un producto.
        mostrarProductos(); // Opcional: actualiza la vista de productos.
    }
}

function cancelar() {
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('marca').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('precio').value = '';
}


