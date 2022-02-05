/*
========================
CLASES
========================
*/

class Cliente {
  constructor(nombre, telefono, calle, compra) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.calle = calle;
    this.compra = compra;
  }
}

class Producto {
  constructor(id, nombre, tipo, precio) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio = precio;
    this.imagen = "assets/imagen" + id + ".jpg";
  }
}

/*
========================
VARIABLES
========================
*/

let compras = [];
let productoTipo;
let productos = {
  lamparas: [
    new Producto(1, "Lampara Colgante", "Lamparas", 500),
    new Producto(2, "Lampara de escritorio", "Lamparas", 1500),
    new Producto(3, "Lampara larga", "Lamparas", 800),
    new Producto(10, "Lampara redonda", "Lamparas", 1800),
    new Producto(11, "Lampara antique", "Lamparas", 600),
    new Producto(12, "Lampara Techo Negra", "Lamparas", 600),
    new Producto(13, "Lampara Pie Cruz", "Lamparas", 1600),
  ],
  adornos: [
    new Producto(4, "Cuadro", "Adornos", 500),
    new Producto(5, "Llavero colgante", "Adornos", 1500),
    new Producto(6, "Florero", "Adornos", 800),
    new Producto(14, "Cuadro", "Adornos", 500),
    new Producto(15, "Llavero colgante", "Adornos", 1500),
    new Producto(16, "Florero", "Adornos", 800),
  ],
  luces: [
    new Producto(7, "Blancas", "Luces", 500),
    new Producto(8, "Led", "Luces", 1500),
    new Producto(9, "Calidas", "Luces", 800),
    new Producto(17, "Coloridas", "Luces", 500),
    new Producto(18, "infrarojo", "Luces", 1500),
  ],
};

let botones = document.getElementsByClassName("botonProducto");

for (const boton of botones) {
  boton.onclick = () => {
    mostrarProductos(productos[boton.value.toString()]);
  };
}

let botonesCompra;

/*
========================
FUNCIONES
========================
*/

function mostrarProductos(productos, inicio = false) {
  //let productosHTML = document.getElementById("productos");

  let i = 1;
  let catalogo = "";
  if (!inicio) {
    $("#productos").empty();
  }

  for (const producto of productos) {
    catalogo += `<div class="card col-8 col-sm-4 col-lg-2 p-2 m-4">
						<img src="${
              producto.imagen
            }" class="card-img-top" alt="..." style="height: 16rem;">
					  	<div class="card-body">
						    <h5 class="card-title">${i++}. ${producto.nombre}</h5>
						    <span class="d-block m-2">Precio: $ ${producto.precio}</span>
						    <button type="button" onclick="cargarCompra(${
                  producto.id
                })" class="btn btn-primary botonCompra">Comprar</button>
		  				</div>
		  			</div>`;
  }

  $("#productos").append(`<h3>${productos[0].tipo}:</h3>
								<div class="row justify-content-left" id="catalogo" >
									${catalogo}
								</div>`);
  console.log("QUE LLEGA???");
  productoTipo = productos[0].tipo.toString().toLowerCase();
}

/* **********************************
COMPRAS
*************************************/

function mostrarError() {
  $("#productos").append(
    `<li class="list-group-item bg-danger ">No se encontro el producto</li>`
  );
}

function cargarCompra(id) {
  let producto = productos[productoTipo];
  producto = producto.find((e) => e.id === parseInt(id, 10));
  compras.push(producto);
  console.log(compras);
  implementarCompra();

  localStorage.setItem("compras", JSON.stringify(compras));
}

function implementarCompra() {
  let i = 1;
  let total = 0;
  let comprasHtml = ``;
  let acumulador = [];
  let cantidadCompra = [];
  //ordenarCompras(compras);

  compras.map((dato) => {
    if (!acumulador.includes(dato.nombre)) {
      acumulador.push(dato.nombre);
      cantidadCompra.push({ id: dato.id, nombre: dato.nombre, cantidad: 1 });
    } else {
      cantidadCompra[cantidadCompra.findIndex((e) => e.nombre === dato.nombre)]
        .cantidad++;
    }
    total += dato.precio;
  });

  for (const compra of cantidadCompra) {
    comprasHtml += `<li class="list-group-item px-4">${compra.cantidad} X ${compra.nombre} 
      <button type="button" id="borrarCompras" onclick="borrarCompra('${compra.id}')"  class="btn btn-danger mx-2 botonProducto h-50">Borrar</button>
      </li>`;
  }

  let listaCarrito = `<li class="list-group-item bg-warning">Total : ${total}</li>`;

  listaCarrito += comprasHtml;
  listaCarrito += `<li class="list-group-item"><a href="./compra.html" class="btn btn-success">Comprar</button></a>`;

  $(totalCarrito).empty();
  $(totalCarrito).append(compras.length);
  //comprasHtml += `<span class="d-block">Monto total: $ ${total}</span>`;

  $("#compras").empty();
  $("#compras").append(listaCarrito);
}

function resetearCompras() {
  localStorage.removeItem("compras");
  $("#compras").empty();
  inicializarCompras();
  resetContadorCompra();
}

const resetContadorCompra = (numero = 0) => {
  $(totalCarrito).empty();
  $(totalCarrito).append(numero);
};

const borrarCompra = (id) => {
  localStorage.removeItem("compras");

  if (compras.length === 1) {
    inicializarCompras();
    resetContadorCompra();
    localStorage.removeItem("compras");
    compras = [];
    return;
  }

  console.log(compras);

  let comprasRefactor = compras.filter((d) => d.id != parseInt(id, 10));

  compras = comprasRefactor;

  localStorage.setItem("compras", JSON.stringify(comprasRefactor));
  inicializarCompras(comprasRefactor);
  resetContadorCompra(comprasRefactor.length);
};

function inicializarCompras(item = false) {
  if (item) {
    implementarCompra(compras);
  } else {
    $("compras").empty();
    let comprasHtml = document.getElementById("compras");
    comprasHtml.innerHTML = `<li class="list-group-item">No se agrego elementos al carrito </li>`;
    compras = [];
  }
}

const ordenarCompras = (compras) => {
  return compras.sort(function (a, b) {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    return 0;
  });
};

const cargarPantallaCompras = (compras) => {
  $("carritoCompras").empty();
  let comprasCarrito = ordenarCompras(compras);
  let listaComprasHTML = "";
  for (let compra of comprasCarrito) {
    listaComprasHTML = +`<li class="list-group-item">${comprasCarrito}</li>`;
  }

  let carrito = `<div class="card">
    <div class="card-header bg-info">Compras:</div>
      <ul class="list-group list-group-flush">
        ${listaComprasHTML}
      </ul>
  </div>`;

  $("carritoCompras").append(carrito);
};

/****************************
 * BUSCADOR
 */

const searchProduct = (nombre) => {
  if (nombre === "") {
    return;
  } else {
    $("#productos").hide();
    $("#productos").empty();
    let arrayProductos = [];

    for (const tipo in productos) {
      for (let producto of productos[tipo]) {
        if (producto.nombre.toLowerCase().indexOf(nombre) > -1) {
          arrayProductos.push(producto);
          console.log("tipo: " + tipo);
          console.log(producto.nombre.toLowerCase);
          console.log("CUMPLE!!");
        }
      }
    }

    arrayProductos.length > 0
      ? mostrarProductos(arrayProductos, (inicio = true))
      : $("#productos").append(
          "<h3>No se encontraron productos relacionados...</h3>"
        );
  }

  $("#productos").show();
};

/*
========================
Programa
========================
*/

$(document).ready(() => {
  compras = JSON.parse(localStorage.getItem("compras"));
  inicializarCompras(Array.isArray(compras));
  mostrarProductos(productos["lamparas"]);
  $("#busqueda").click(() => searchProduct($("#nombreBuscado").val()));
});

cargarPantallaCompras(compras);
