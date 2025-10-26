// Estado global de las calculadoras
const estadoCalculadoras = {
    suma: { num1: 0, num2: 0, seleccionando: 'num1' },
    resta: { num1: 0, num2: 0, seleccionando: 'num1' },
    multiplicacion: { num1: 0, num2: 0, seleccionando: 'num1' },
    division: { num1: 0, num2: 0, seleccionando: 'num1' }
};

// Mostrar calculadora específica
function mostrarCalculadora(operacion) {
    // Ocultar menú principal
    document.getElementById('menu-principal').classList.add('oculto');
    
    // Ocultar todas las calculadoras
    const calculadoras = document.querySelectorAll('.calculadora');
    calculadoras.forEach(calc => {
        calc.classList.add('oculto');
    });
    
    // Mostrar la calculadora seleccionada
    const calculadoraSeleccionada = document.getElementById(`calculadora-${operacion}`);
    calculadoraSeleccionada.classList.remove('oculto');
    
    // Resetear estado
    resetearEstado(operacion);
    actualizarDisplay(operacion);
}

// Volver al menú principal
function volverAlMenu() {
    // Ocultar todas las calculadoras
    const calculadoras = document.querySelectorAll('.calculadora');
    calculadoras.forEach(calc => {
        calc.classList.add('oculto');
    });
    
    // Mostrar menú principal
    document.getElementById('menu-principal').classList.remove('oculto');
}

// Resetear estado de una calculadora
function resetearEstado(operacion) {
    estadoCalculadoras[operacion] = { num1: 0, num2: 0, seleccionando: 'num1' };
}

// Actualizar display de una calculadora
function actualizarDisplay(operacion) {
    const estado = estadoCalculadoras[operacion];
    const displayNum1 = document.getElementById(`display-num1-${operacion}`);
    const displayNum2 = document.getElementById(`display-num2-${operacion}`);
    const displayResultado = document.getElementById(`resultado-${operacion}`);
    
    displayNum1.textContent = estado.num1;
    displayNum2.textContent = estado.num2;
    displayResultado.textContent = '0';
    
    // Actualizar estilos de los botones de selección
    const botonesSeleccionar = document.querySelectorAll(`#calculadora-${operacion} .btn-seleccionar`);
    botonesSeleccionar[0].classList.toggle('activo', estado.seleccionando === 'num1');
    botonesSeleccionar[1].classList.toggle('activo', estado.seleccionando === 'num2');
}

// Agregar número a la calculadora
function agregarNumero(operacion, numero) {
    const estado = estadoCalculadoras[operacion];
    
    if (estado.seleccionando === 'num1') {
        estado.num1 = estado.num1 * 10 + numero;
    } else {
        estado.num2 = estado.num2 * 10 + numero;
    }
    
    actualizarDisplay(operacion);
}

// Seleccionar primer número
function seleccionarPrimerNumero(operacion) {
    estadoCalculadoras[operacion].seleccionando = 'num1';
    actualizarDisplay(operacion);
}

// Seleccionar segundo número
function seleccionarSegundoNumero(operacion) {
    estadoCalculadoras[operacion].seleccionando = 'num2';
    actualizarDisplay(operacion);
}

// Limpiar calculadora
function limpiarCalculadora(operacion) {
    resetearEstado(operacion);
    actualizarDisplay(operacion);
}

// Borrar último dígito
function borrarUltimo(operacion) {
    const estado = estadoCalculadoras[operacion];
    
    if (estado.seleccionando === 'num1' && estado.num1 > 0) {
        estado.num1 = Math.floor(estado.num1 / 10);
    } else if (estado.seleccionando === 'num2' && estado.num2 > 0) {
        estado.num2 = Math.floor(estado.num2 / 10);
    }
    
    actualizarDisplay(operacion);
}

// Funciones de cálculo
function calcularSuma() {
    const estado = estadoCalculadoras.suma;
    const resultado = estado.num1 + estado.num2;
    document.getElementById('resultado-suma').textContent = resultado;
}

function calcularResta() {
    const estado = estadoCalculadoras.resta;
    const resultado = estado.num1 - estado.num2;
    document.getElementById('resultado-resta').textContent = resultado;
}

function calcularMultiplicacion() {
    const estado = estadoCalculadoras.multiplicacion;
    const resultado = estado.num1 * estado.num2;
    document.getElementById('resultado-multiplicacion').textContent = resultado;
}

function calcularDivision() {
    const estado = estadoCalculadoras.division;
    
    if (estado.num2 === 0) {
        document.getElementById('resultado-division').textContent = 'Error';
        document.getElementById('resultado-division').style.background = '#dc3545';
    } else {
        const resultado = estado.num1 / estado.num2;
        document.getElementById('resultado-division').textContent = resultado.toFixed(2);
        document.getElementById('resultado-division').style.background = '#28a745';
    }
}

// Event listeners para los botones principales
document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.btn-operacion');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const operacion = this.getAttribute('data-operacion');
            mostrarCalculadora(operacion);
        });
    });
    
    // Permitir usar teclado numérico
    document.addEventListener('keydown', function(event) {
        const tecla = event.key;
        const calculadoraVisible = document.querySelector('.calculadora:not(.oculto)');
        
        if (calculadoraVisible) {
            const operacion = calculadoraVisible.id.replace('calculadora-', '');
            
            if (tecla >= '0' && tecla <= '9') {
                agregarNumero(operacion, parseInt(tecla));
            } else if (tecla === 'Backspace') {
                borrarUltimo(operacion);
            } else if (tecla === 'Escape') {
                limpiarCalculadora(operacion);
            } else if (tecla === 'Enter') {
                switch(operacion) {
                    case 'suma':
                        calcularSuma();
                        break;
                    case 'resta':
                        calcularResta();
                        break;
                    case 'multiplicacion':
                        calcularMultiplicacion();
                        break;
                    case 'division':
                        calcularDivision();
                        break;
                }
            }
        }
    });
});