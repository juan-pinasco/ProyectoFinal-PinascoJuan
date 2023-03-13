/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- Me traigo el id del div padre de todo el contenido(mainContenido) a js --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
const mainContenido = document.getElementById("mainContenido");

/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- Me traigo el id del h1 en html (icono de carrito) al js  --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
const verCarrito = document.getElementById("verCarrito");

/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- Me traigo el id del div contenedorVentanaEmergente en html al js --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
const contenedorVentanaEmergente = document.getElementById(
  "contenedorVentanaEmergente"
);

/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- me traigo el id del span cantidadCarrito en html al js--⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
const cantidadCarrito = document.getElementById("cantidadCarrito");

/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- Creo el array de carrito vacio + el get item del local storage--⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
let carrito = JSON.parse(localStorage.getItem("carro")) || []; // get "obtener" de local storage

//⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- inluyo API de fakestoreapi --⬇⬇⬇⬇⬇⬇⬇⬇⬇
const getProductos = async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const res = await data.json();

  //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- Busco con forEach todos los productos y los inserto en forma de cards en html--⬇⬇⬇⬇⬇⬇⬇⬇⬇
  res.forEach((bienes) => {
    let contenidoDeCadaUnaDeLasCards = document.createElement("div");
    contenidoDeCadaUnaDeLasCards.className = "card";
    contenidoDeCadaUnaDeLasCards.innerHTML = `
    <img src="${bienes.image}">
    <h3>${bienes.title}</h3>
    <p class="precio">$ ${bienes.price}</p>`;

    //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- inserto las cards en el div padre, en html --⬇⬇⬇⬇⬇⬇⬇⬇⬇
    mainContenido.append(contenidoDeCadaUnaDeLasCards);

    //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- creo boton comprar de cada producto --⬇⬇⬇⬇⬇⬇⬇⬇⬇
    let botonComprar = document.createElement("button");
    botonComprar.innerText = `Comprar`;
    botonComprar.className = `boton-comprar`;

    //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- inserto en cada card el boton comprar en html --⬇⬇⬇⬇⬇⬇⬇⬇⬇
    contenidoDeCadaUnaDeLasCards.append(botonComprar);

    //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- cuando se clickea el boton "comprar" que se fije si hay 2 id repetidos  --⬇⬇⬇⬇⬇⬇⬇⬇⬇
    botonComprar.addEventListener("click", () => {
      swal({
        title: "¿Esta seguro que desea comprar este producto?",
        text: "Este producto se agregara al carrito, señalizado en la parte superior a su derecha",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          const repetido = carrito.some(
            (productoRepetido) => productoRepetido.id === bienes.id
          );
          //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- OPERADOR TERNARIO (REDUCCION DE IF Y ELSE)--⬇⬇⬇⬇⬇⬇⬇⬇⬇
          //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- En el caso de que si halla 2 id repetidos, que me sume su cantidad en carrito --⬇⬇⬇⬇⬇⬇⬇⬇⬇
          repetido
            ? carrito.map((prod) => {
                //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- OPERADOR LOGICO "AND" --⬇⬇⬇⬇⬇⬇⬇⬇⬇
                prod.id === bienes.id && prod.cantidad++;
              })
            : //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- En caso contrario, que me pushee todo los datos del bien o prooducto al array --⬇⬇⬇⬇⬇⬇⬇⬇⬇
              carrito.push({
                id: bienes.id,
                nombre: bienes.title,
                precio: bienes.price,
                Img: bienes.image,
                cantidad: (bienes.cantidad = 1),
              });
          //⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- cada vez que se clickea el boton comprar se activa la funcion de contar cantidad y guardar en el local storage --⬇⬇⬇⬇⬇⬇⬇⬇⬇
          contadorCarrito();
          guardarEnLocal();
          swal("Productucto agregado", {
            icon: "success",
          });
        } else {
          swal("Compra cancelada", {
            icon: "error",
          });
        }
      });
    });
  });
};

getProductos();

/* set "guardar" en local storage */
const guardarEnLocal = () => {
  localStorage.setItem("carro", JSON.stringify(carrito));
};
