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

let numeroImg = 0;

class Producto {
  constructor(id, nombre, tipo, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio = precio;
    this.imagen = "assets/imagen" + numeroImg++ + ".jpg";
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
  ],
  adornos: [
    new Producto(4, "Cuadro", "Adornos", 500),
    new Producto(5, "Llavero colgante", "Adornos", 1500),
    new Producto(6, "Florero", "Adornos", 800),
  ],
  luces: [
    new Producto(7, "Blancas", "Luces", 500),
    new Producto(8, "Led", "Luces", 1500),
    new Producto(9, "Calidas", "Luces", 800),
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
    catalogo += `<div class="card" style="width: 18rem;">
						<img src="${
              producto.imagen
            }" class="card-img-top" alt="..." style="height: 18rem;">
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
								<div class="row justify-content-evenly" id="catalogo" >
									${catalogo}
								</div>`);
  console.log("QUE LLEGA???");
  console.log(productos);
  productoTipo = productos[0].tipo.toString().toLowerCase();
}

function cargarCompra(id) {
  let producto = productos[productoTipo];

  producto = producto.find((e) => e.id === parseInt(id, 10));
  compras.push(producto);
  console.log(compras);
  implementarCompra(compras);

  localStorage.setItem("compras", JSON.stringify(compras));
}

function mostrarError() {
  $("#productos").append(
    `<li class="list-group-item bg-danger ">No se encontro el producto</li>`
  );
}

function implementarCompra(compras) {
  let i = 1;
  let total = 0;
  let comprasHtml = ``;
  let acumulador = [];
  let cantidadCompra = [];

  ordenarCompras(compras);

  compras.map((dato) => {
    if (!acumulador.includes(dato.nombre)) {
      acumulador.push(dato.nombre);
      cantidadCompra.push({ nombre: dato.nombre, cantidad: 1 });
    } else {
      cantidadCompra[cantidadCompra.findIndex((e) => e.nombre === dato.nombre)]
        .cantidad++;
    }
    total += dato.precio;
  });

  for (const compra of cantidadCompra) {
    comprasHtml += `<li class="list-group-item px-4">${compra.cantidad} X ${compra.nombre} 
      <button type="button" id="borrarCompras" onclick="borrarCompra('${compra.nombre}')"  class="btn btn-danger mx-2 botonProducto h-50">Borrar</button>
      </li>`;
  }

  let listaCarrito = `<li class="list-group-item bg-primary">Total : ${total}</li>`;

  listaCarrito += comprasHtml;

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

const resetContadorCompra = () => {
  $(totalCarrito).empty(0);
  $(totalCarrito).append(0);
};

const borrarCompra = (nombre) => {
  compras = JSON.parse(localStorage.getItem("compras"));
  comprasRefactor;
  localStorage.removeItem("compras");
  let idBusqueda = compras.map((dato, id) => {
    if (dato.nombre === nombre) return id;
  });

  for (let i = 0; i < comprasRefactor.length; i++) {}

  console.log("compras :");
  console.log(compras);

  localStorage.setItem("compras", JSON.stringify(compras));
  resetContadorCompra();
  inicializarCompras();
};

function inicializarCompras() {
  compras = JSON.parse(localStorage.getItem("compras"));
  console.log(compras);

  if (compras) {
    implementarCompra();
  } else {
    let comprasHtml = document.getElementById("compras");
    comprasHtml.innerHTML = `<li class="list-group-item">No se agrego elementos al carrito </li>`;
    compras = [];
  }
}

const searchProduct = (nombre) => {
  $("#productos").hide();
  $("#productos").empty();

  if (nombre === "") {
    $("#productos").append(
      "<h3>No se encontraron productos relacionados...</h3>"
    );
  } else {
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

const ordenarCompras = (compras) => {
  compras.sort(function (a, b) {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    // a must be equal to b
    return 0;
    console.log(compras);
  });
};
/*
========================
Programa
========================
*/

$(document).ready(() => {
  inicializarCompras();
  mostrarProductos(productos["luces"], (inicio = true));
  $("#busqueda").click(() => searchProduct($("#nombreBuscado").val()));
});

/*
$("form").submit( function (e) {
	e.preventDefault();

	console.log("PASO POR ACA")
	let valor = $(e.target).children()
	
	//searchProduct(hijo[0].value);
	
} )*/
