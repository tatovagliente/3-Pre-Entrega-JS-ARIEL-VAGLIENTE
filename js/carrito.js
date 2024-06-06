let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

//Funcion para ver la carga de los productos agregados desde Todos los Productos o categorias(el div creado en el HTML), mostrando los mensajes correspondientes si esta vacio o no y los parametros de titulo, cantidad, bla...//
function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
        
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
    
        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-producto-titulo">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>${producto.cantidad * producto.precio}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
        `;
        contenedorCarritoProductos.appendChild(div);
    })
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

//Funcion para que al clickear en el tachito de eliminar, se elimine el producto del carrito//
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

//Funcion para que al eliminar un producto del carrito, se actualice la pagina y siga almacenada en el localStorage para seguir utilizando lo demas y no se modifique al cambiar de categoria por ejemplo//
function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto=> producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
}

//Funcion para que al clickear en el boton "vaciar carrito", se vacie el mismo y a su vez borre el localStorage//
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

//Funcion para que en el <p> de Total se muestre la sumatoria de los subtotales de los productos agregados en el carrito//
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto)=> acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

//Funcion para que al clickear en el boton de compra, lance el mensaje de Muchas gracias por tu compra//
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.remove("disabled");
}