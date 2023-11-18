let clientes = [];

function registrarPago() {
    const nombreClienteInput = document.getElementById('nombreCliente');
    const rondasPagadasInput = document.getElementById('rondasPagadas');

    const nombreCliente = nombreClienteInput.value.trim();
    const rondasPagadas = parseInt(rondasPagadasInput.value);

    if (nombreCliente && !isNaN(rondasPagadas)) {
        const registro = {
            nombre: nombreCliente,
            rondas: rondasPagadas
        };

        clientes.push(registro);
        clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));

        actualizarEstado();
        limpiarCampos();
    } else {
        alert('Por favor, ingrese un nombre válido y una cantidad válida de rondas.');
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        registrarPago();
    }
}

function limpiarCampos() {
    document.getElementById('nombreCliente').value = '';
    document.getElementById('rondasPagadas').value = '';
}

function eliminarCliente(index) {
    clientes.splice(index, 1);
    actualizarEstado();
}

function restarRonda(index) {
    if (clientes[index].rondas > 0) {
        clientes[index].rondas--;

        if (clientes[index].rondas === 0) {
            mostrarAlerta(`${clientes[index].nombre} ha llegado a 0 rondas.`);
        }

        actualizarEstado();
    }
}

function sumarRonda(index) {
    clientes[index].rondas++;
    actualizarEstado();
}

function descontarRonda() {
    const confirmacion = confirm("¿Estás seguro de que deseas descontar una ronda a todos los jugadores?");
    if (confirmacion) {
        if (clientes.length > 0) {
            for (let i = 0; i < clientes.length; i++) {
                if (clientes[i].rondas > 0) {
                    clientes[i].rondas--;

                    if (clientes[i].rondas === 0) {
                        mostrarAlerta(`${clientes[i].nombre} ha llegado a 0 rondas.`);
                    }
                }
            }
            actualizarEstado();
        }
    }
}

function actualizarEstado() {
    const estadoElement = document.getElementById('estado');
    estadoElement.innerHTML = "<h2>Registros de Pagos</h2>";

    if (clientes.length > 0) {
        estadoElement.innerHTML += "<ul>";
        clientes.forEach((cliente, index) => {
            const nombreConMayuscula = cliente.nombre.charAt(0).toUpperCase() + cliente.nombre.slice(1);
            estadoElement.innerHTML += `
            <li>
                <div class="test">
                    <div class="test2">
                    <span><h3>${nombreConMayuscula}</h3></span>
                    <p><h4>${cliente.rondas} rondas</h4></p>
                    </div>
                
                    
                    <div class="botones-rondas">
                    <button class="restador" onclick="restarRonda(${index})">-</button>
                    <button class="sumador" onclick="sumarRonda(${index})">+</button>
                    
                    </div  >
                    <div class="test3">
                    <button class="eliminador"onclick="eliminarCliente(${index})">X</button>
                    </div>
                    
                </div>                  
                                    
        

            
            </li>`;
        });
        estadoElement.innerHTML += "</ul>";
    } else {
        estadoElement.innerHTML += "<p>No hay registros de pagos.</p>";
    }
}

function mostrarAlerta(mensaje) {
    const alertaContainer = document.getElementById('alerta-container');
    const alertaElement = document.createElement('div');
    alertaElement.className = 'alerta';
    alertaElement.innerHTML = `
        <span class="alerta-mensaje">${mensaje}</span>
        <span class="cerrar-alerta" onclick="cerrarAlerta(this.parentElement)">X</span>`;
    alertaContainer.appendChild(alertaElement);
}

function cerrarAlerta(elementoAlerta) {
    elementoAlerta.style.display = 'none';
}

function sumarContador() {
    var miContador = document.getElementById('mi-rondas');
    var miHoraActualizacion = document.getElementById('mi-hora-actualizacion');

    var rondas = parseInt(miContador.textContent) + 1;
    miContador.textContent = rondas;

    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    miHoraActualizacion.textContent = `Actualizado a las ${hora}:${minutos}:${segundos}`;
}

function restarContador() {
    var miContador = document.getElementById('mi-rondas');
    var miHoraActualizacion = document.getElementById('mi-hora-actualizacion');

    var rondas = parseInt(miContador.textContent);
    rondas = rondas > 0 ? rondas - 1 : 0;
    miContador.textContent = rondas;

    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    miHoraActualizacion.textContent = `Actualizado a las ${hora}:${minutos}:${segundos}`;
}
