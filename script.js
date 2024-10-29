//MAIN PHRASE

const text = "Your personal paradise starts here";
let index = 0;
const speed = 100; // Velocidad de escritura en milisegundos

function typeWriter() {
    const element = document.querySelector('.main-phrase p');
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = typeWriter;




//CAROUSEL

const big = document.querySelector('.big');
const points = document.querySelectorAll('.point');
let currentIndex = 0; // Índice actual de la imagen
const numImages = points.length; // Número total de imágenes

// Función para mover las imágenes y actualizar los puntos
function moveToIndex(index) {
    let operation = index * -100;  // Mover 50% por cada imagen
    console.log(big);
    big.style.transform = `translateX(${operation}%)`;

    // Remover clase 'active' de todos los puntos
    points.forEach(point => point.classList.remove('active'));

    // Agregar clase 'active' al punto correspondiente
    points[index].classList.add('active');
}

// Cambiar la imagen automáticamente cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % numImages; // Incrementar el índice y reiniciar si llega al final
    moveToIndex(currentIndex);
}, 3000); // 5000ms = 5 segundos

// Agregar funcionalidad a los puntos para cambiar manualmente
points.forEach((point, i) => {
    point.addEventListener('click', () => {
        currentIndex = i;  // Actualizar el índice actual
        moveToIndex(currentIndex);
    });
});



//SCROLL

document.addEventListener('DOMContentLoaded', function () {
    const faders = document.querySelectorAll('.fade-in');
    const scroll = document.querySelectorAll('.scroll-effect');

    // Opciones de intersección para los elementos con fade-in (texto)
    const appearOptions = {
        threshold: 0.50,  // Cuando el 50% del texto esté visible
    };

    // Opciones de intersección para las imágenes con scroll-effect
    const appearImages = {
        threshold: 0.90,  // Cuando el 80% de la imagen esté visible
    };

    // Observador para los elementos fade-in (texto)
    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Dejar de observar el elemento después de que aparezca
            }
        });
    }, appearOptions);

    // Observador para las imágenes con scroll-effect
    const appearScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Dejar de observar el elemento después de que aparezca
            }
        });
    }, appearImages);

    // Aplicar el observador a todos los elementos fade-in (texto)
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Aplicar el observador a todos los elementos scroll-effect (imágenes)
    scroll.forEach(image => {
        appearScroll.observe(image);
    });
});


//BUY BUTTON 

const btnComprar = document.getElementById("btnComprar");
const resumenPedido = document.getElementById("resumenPedido");
const closeBtn = document.getElementById("closeBtn");
const btnPagar = document.getElementById("btnPagar");
const pagoTarjeta = document.getElementById("pagoTarjeta");
const btnFinalizar = document.getElementById("btnFinalizar");
const closePago = document.getElementById("closePago");

// Mostrar el resumen del pedido y ocultar el botón Comprar
btnComprar.addEventListener("click", function() {
    resumenPedido.style.display = "block";  // Mostrar el resumen
    btnComprar.style.display = "none";      // Ocultar el botón Comprar
});

// Ocultar el resumen del pedido
closeBtn.addEventListener("click", function() {
    resumenPedido.style.display = "none";
    btnComprar.style.display = "inline-block"; // Volver a mostrar el botón Comprar
});

// Mostrar la sección de datos de la tarjeta al hacer clic en "Ir a Pagar"
btnPagar.addEventListener("click", function() {
    resumenPedido.style.display = "none"; // Ocultar resumen del pedido
    pagoTarjeta.style.display = "block";  // Mostrar formulario de tarjeta
});

// Acción del botón "Pagar"
btnFinalizar.addEventListener("click", function() {
    // Validar datos de la tarjeta (esto es una validación básica)
    const nombre = document.getElementById("nombreTitular").value;
    const numero = document.getElementById("numeroTarjeta").value;
    const expiracion = document.getElementById("fechaExpiracion").value;
    const cvv = document.getElementById("cvv").value;
    const nombreComprador = document.getElementById("nombreComprador").value;
    const direccion = document.getElementById("direccion").value;

    if (nombreComprador && direccion && nombre && numero.length === 16 && expiracion && cvv.length === 3) {
        alert("Pago realizado con éxito. ¡Gracias por su compra!");
        pagoTarjeta.style.display = "none"; // Ocultar formulario de tarjeta tras el pago
        btnComprar.style.display = "inline-block"; // Volver a mostrar el botón Comprar
    } else {
        alert("Por favor, completa todos los campos correctamente.");
    }
});

// Ocultar el formulario de tarjeta y volver a la sección de compra
closePago.addEventListener("click", function() {
    pagoTarjeta.style.display = "none";  // Ocultar formulario de tarjeta
    btnComprar.style.display = "inline-block";  // Volver a mostrar el botón Comprar
});



//QUANTITY

// Seleccionamos elementos relevantes
const decreaseButton = document.querySelector('.decrease');
const increaseButton = document.querySelector('.increase');
const quantityElement = document.querySelector('.quantity');
const totalElement = document.querySelector('.total');
const priceElement = document.querySelector('.price');

// Precio del producto
const pricePerUnit = parseFloat(priceElement.textContent.replace('$', ''));

// Función para actualizar la cantidad y el total
function updateQuantity(change) {
    let currentQuantity = parseInt(quantityElement.textContent);
    
    // Aumentar o disminuir la cantidad
    currentQuantity += change;

    // Asegurarse de que la cantidad no sea menor a 1
    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    // Actualizar el contenido del elemento
    quantityElement.textContent = currentQuantity;
    // Calcular y actualizar el total
    totalElement.textContent = `$${(currentQuantity * pricePerUnit).toFixed(2)}`;
}

// Asignar eventos a los botones
decreaseButton.addEventListener('click', () => {
    updateQuantity(-1);
});

increaseButton.addEventListener('click', () => {
    updateQuantity(1);
});


const detailsElements = document.querySelectorAll('details');

detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
        if (details.open) {
            detailsElements.forEach(otherDetails => {
                if (otherDetails !== details) {
                    otherDetails.open = false;
                }
            });
        }
    });
});
