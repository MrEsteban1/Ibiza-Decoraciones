$(document).ready(() => {
  compras = JSON.parse(localStorage.getItem("compras"));
  cargarPantallaCompras(compras);
});

const cargarPantallaCompras = (compras) => {
  $("#carritoCompras").empty();
  let comprasCarrito = ordenarCompras(compras);
  console.log(comprasCarrito);
  let listaComprasHTML = ``;
  for (const compra of comprasCarrito) {
    console.log(compra);
    listaComprasHTML += `<li class="list-group-item"><img src="${compra.imagen}" style="width: 6rem; height: 6rem;" alt="...">${compra.nombre} </li>`;
  }

  console.log(listaComprasHTML);

  let carrito = `<div class="card">
      <div class="card-header bg-info">Compras:</div>
        <ul class="list-group list-group-flush">
          ${listaComprasHTML}
        </ul>
    </div>`;

  $("#carritoCompras").append(carrito);
};

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
