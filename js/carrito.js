/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- Creo funcion que basicamente me presenta en una ventana emergente el carrito --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
const presentacionCarrito = () => {
  contenedorVentanaEmergente.innerHTML = ""; //esta linea de codigo hace que antes de hacerme la funcion, me limpie el contenido del carrito. esto es para que todo el contenido del carrito no se me repite indefinidas veces cada vez que cierro ventana y lo abro.
  contenedorVentanaEmergente.style.display = "flex"; //aplico style css desde js

  /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- creo cabezera de la ventana emergente y se la inserto a div padre que es contenedorVentaEmergente  --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
  const HeaderVentana = document.createElement("div");
  HeaderVentana.className = "header-ventana";
  HeaderVentana.innerHTML = `<h1 class = "header-ventana-titulo">Carrito</h1>`;
  contenedorVentanaEmergente.append(HeaderVentana);

  /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- creo boton para que me cierre la ventana emergente y se la inserto a div padre que es headerVentana --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
  const botonCerrarVentana = document.createElement("h1");
  botonCerrarVentana.innerText = "x";
  botonCerrarVentana.className = "boton-cerrar-ventana";
  HeaderVentana.append(botonCerrarVentana);

  /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- creo evento para que se me cierre ventana emergente --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
  botonCerrarVentana.addEventListener("click", () => {
    contenedorVentanaEmergente.style.display = "none"; //aplico style css en js
  });

  /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- traigo con forEach lo pusheado en array carrito y lo presento en html en la ventana emergente--⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
  carrito.forEach((bienes) => {
    let contenedorCarrito = document.createElement("div");
    contenedorCarrito.className = "contenedor-carrito";
    contenedorCarrito.innerHTML = `
      <img src="${bienes.Img}">
      <h3 class="nombre-producto">${bienes.nombre}</h3>
      <p> $ ${bienes.precio}</p>
      <span class="restar-cantidad"> ➖</span> 
      <p>cantidad: ${bienes.cantidad} </p>
      <span class="sumar-cantidad">➕ </span>
      <p>Total: $ ${(bienes.cantidad * bienes.precio).toFixed(2)}</p>
      <span class="eleminar-producto-de-carrito"> ❌ </span>`;
    contenedorVentanaEmergente.append(contenedorCarrito);

    /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- agarro span de restar cantidad de determinado producto en carrito con queryselector y le doy la funcion de restar cantidad, con su evento; siempre y cuando la cantidad sea mayor a 1 --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
    let restarCantCarrito = contenedorCarrito.querySelector(".restar-cantidad"); //restar cantidad del carrito
    restarCantCarrito.addEventListener("click", () => {
      if (bienes.cantidad !== 1) {
        bienes.cantidad--;
        swal("Se ha restado una unidad");
      }
      guardarEnLocal(); //guardo en local storage
      presentacionCarrito(); //aplico funcion de vuelta
    });

    /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- agarro span de sumar cantidad de determinado producto en carrito con queryselector y le doy la funcion de sumar cantidad, con su evento.--⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
    let sumarCantCarrito = contenedorCarrito.querySelector(".sumar-cantidad"); //sumar cantidad carrito
    sumarCantCarrito.addEventListener("click", () => {
      bienes.cantidad++;
      guardarEnLocal(); //guardo en local storage
      presentacionCarrito(); //aplico funcion de vuelta
      swal("Se ha sumado una unidad");
    });

    /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- agarro span de eliminar determinado producto en carrito con queryselector y le doy la funcion de quitar producto de carrito, con su evento. --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
    let eliminarProductoDeCarrito = contenedorCarrito.querySelector(
      ".eleminar-producto-de-carrito"
    );
    eliminarProductoDeCarrito.addEventListener("click", () => {
      eliminarProducto(bienes.id);
      swal(
        "Producto eliminado",
        "El producto se eliminara del carrito",
        "success"
      );
    });
  });

  /*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- calculo total, creo html y lo inserto en padre de ventana emergente --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const compraTotal = document.createElement("div");
  compraTotal.className = "compra-total";
  compraTotal.innerHTML = `total a pagar: $ ${total.toFixed(2)}`;
  contenedorVentanaEmergente.append(compraTotal);
};

/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- Cuando clickeo ver carrito (en navbar) se me activa funcion "presentacionCarrito"⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
verCarrito.addEventListener("click", presentacionCarrito);

/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- funcion eliminar producto --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
const eliminarProducto = (id) => {
  const foundId = carrito.find((Elemento) => Elemento.id === id);
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  contadorCarrito();
  guardarEnLocal(); //lo agregue con local storage. esto soluciona el problema de eliminar un producto. cuando el usuario eliminaba un producto del carrito, el local storage no se lo reconocia, esto lo soluciona.
  presentacionCarrito();
};

/*⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇-- funcion contador de cantidad de producto que tengo seleccionado en carrito sin importar su cantidad --⬇⬇⬇⬇⬇⬇⬇⬇⬇  */
const contadorCarrito = () => {
  cantidadCarrito.style.display = "block";
  const longitudCarrito = carrito.length; //lo agregue con local storage. esto me soluciona el problema de que cuando el usuario actualiza pagina, los nuumeros del carrito no le aparecen y tiene que volver a comprar algo para que le vuelvan a aparecer los numeros.
  localStorage.setItem("carroLength", JSON.stringify(longitudCarrito)); //lo agregue con local storage. esto me soluciona el problema de que cuando el usuario actualiza pagina, los nuumeros del carrito no le aparecen y tiene que volver a comprar algo para que le vuelvan a aparecer los numeros.
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carroLength")); //lo agregue con local storage. esto me soluciona el problema de que cuando el usuario actualiza pagina, los nuumeros del carrito no le aparecen y tiene que volver a comprar algo para que le vuelvan a aparecer los numeros.
};
contadorCarrito(); //lo agregue con local storage. esto me soluciona el problema de que cuando el usuario actualiza pagina, los nuumeros del carrito no le aparecen y tiene que volver a comprar algo para que le vuelvan a aparecer los numeros.
