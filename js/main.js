//Arrays de Productos//
const productos = [{
    id:"remera-01",
    titulo:"Remera Cruz Alta",
    imagen:"./img/remeras/01.jpg",
    categoria:{
        nombre:"Remeras",
        id:"remeras"
    },
    precio:5000
},
{
    id:"remera-02",
    titulo:"Remera Lisa Gris",
    imagen:"./img/remeras/02.jpg",
    categoria:{
        nombre:"Remeras",
        id:"remeras"
    },
    precio:5500
},
{
    id:"remera-03",
    titulo:"Remera Gris Fila",
    imagen:"./img/remeras/03.jpg",
    categoria:{
        nombre:"Remeras",
        id:"remeras"
    },
    precio:6000
},
{
    id:"remera-04",
    titulo:"Remera Lisa Bordo",
    imagen:"./img/remeras/04.jpg",
    categoria:{
        nombre:"Remeras",
        id:"remeras"
    },
    precio:6500
},
{
    id:"campera-01",
    titulo:"Campera Abrigo Sintetica",
    imagen:"./img/camperas/01.jpg",
    categoria:{
        nombre:"Camperas",
        id:"camperas"
    },
    precio:20000
},
{
    id:"campera-02",
    titulo:"Campera Montagne",
    imagen:"./img/camperas/02.jpg",
    categoria:{
        nombre:"Camperas",
        id:"camperas"
    },
    precio:25000
},
{
    id:"campera-03",
    titulo:"Parka Urbana Negra",
    imagen:"./img/camperas/03.jpg",
    categoria:{
        nombre:"Camperas",
        id:"camperas"
    },
    precio:30000
},
{
    id:"campera-04",
    titulo:"Campera Abrigo Puma",
    imagen:"./img/camperas/04.jpg",
    categoria:{
        nombre:"Camperas",
        id:"camperas"
    },
    precio:35000
},
{
    id:"jean-01",
    titulo:"Jean Urbano Azul Oscuro",
    imagen:"./img/jeans/01.jpg",
    categoria:{
        nombre:"Jeans",
        id:"jeans"
    },
    precio:10000
},
{
    id:"jean-02",
    titulo:"Jean Urbano Azul",
    imagen:"./img/jeans/02.jpg",
    categoria:{
        nombre:"Jeans",
        id:"jeans"
    },
    precio:15000
},
{
    id:"jean-03",
    titulo:"Jean Celeste Claro",
    imagen:"./img/jeans/03.jpg",
    categoria:{
        nombre:"Jeans",
        id:"jeans"
    },
    precio:20000
},
{
    id:"jean-04",
    titulo:"Jean Moda Verano",
    imagen:"./img/jeans/04.jpg",
    categoria:{
        nombre:"Jeans",
        id:"jeans"
    },
    precio:25000
},
{
    id:"calzado-01",
    titulo:"Zapatillas Topper",
    imagen:"./img/calzado/01.jpg",
    categoria:{
        nombre:"Calzado",
        id:"calzado"
    },
    precio:40000
},
{
    id:"calzado-02",
    titulo:"Zapatillas Nike Air",
    imagen:"./img/calzado/02.jpg",
    categoria:{
        nombre:"Calzado",
        id:"calzado"
    },
    precio:45000
},{
    id:"calzado-03",
    titulo:"Zapatillas DC Urban",
    imagen:"./img/calzado/03.jpg",
    categoria:{
        nombre:"Calzado",
        id:"calzado"
    },
    precio:50000
},{
    id:"calzado-04",
    titulo:"Zapatillas Urban Style",
    imagen:"./img/calzado/04.jpg",
    categoria:{
        nombre:"Calzado",
        id:"calzado"
    },
    precio:55000
},
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

//Funcion carga de productos en pagina principal//
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML="";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            
        `;
        contenedorProductos.appendChild(div);
    })

    actualizarBotonesAgregar();
    
}

//Funcion para filtrar por categorias los productos//
cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id !="todos"){

            const productoCategoria=productos.find(producto=>producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText =productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
        else {
            tituloPrincipal.innerText="Todos los productos";
            cargarProductos(productos);
        }
    })
});

//Funcion para que los botones "agregar" sumen productos al carrito//
function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

//Funcion para que desde la pagina del carrito se puedan tomar los datos del localstorage y poder utilizarlo desde la pagina del carrito//
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [ ];
}

//Funcion para agregar productos en carrito y que se actualice tambien el numerito del costado del carrito de compras//
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productoAgregado= productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
} else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
}
actualizarNumerito();

localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//Funcion para que se actualice el numero del costado del carrito//
function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}