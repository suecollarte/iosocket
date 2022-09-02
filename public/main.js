const socket = io();

socket.on('from-server-producto', producto => {
    console.log('productos:', producto.PRODUCTO_DB);
    render(producto.PRODUCTO_DB); 
    
});
socket.on('from-server-mensaje', mensaje => {
    console.log('Usuarios:', mensaje.MENSAJE_DB);
    render2(mensaje.MENSAJE_DB); 
    
});
function render(productos) {
    const HistoriaProd = productos.map((prod)=>{
     return (`<span>
     <b>${prod.nombre}: </b>
     <span>${prod.precio}</span> 
     <span><img src="${prod.thumbail}" width="50px"></span>`)
    }).join('<br>'); 
    document.querySelector('#historial').innerHTML = HistoriaProd;
}
function render2(mensaje) {
    const HistoriaMsj= mensaje.map((msj)=>{
        return (`<span style='color:blue;'>
        <b>${msj.email}: </b>
        <span style='color:#804000;'>${msj.fecha}</span>
        <span style='color:green;font-style: italic;'>${msj.mens} </span>`)
    }).join('<br>'); 
    //console.log(HistoriaMsj);  
    document.querySelector('#mensaje').innerHTML = HistoriaMsj;
}
function enviarProducto() {
    //alert('se apreto opcion');
    const inputProducto = document.querySelector('#producto');
    const inputPrecio = document.querySelector('#precio');
    const inputThumbail = document.querySelector('#thumbail');


    const producto = {
        nombre: inputProducto.value,
        precio: inputPrecio.value,
        thumbail : inputThumbail.value
    }

    socket.emit('from-client-producto', producto);
}
function enviarMensaje() {
    alert('se apreto opcion mensaje');
   
    const inputEmail = document.querySelector('#email');
    //document.getElementbyId('fecha').value =Date.now() ;
    const inputFecha = document.querySelector('#fecha');
    alert (inputFecha.value);
    
    const usuarios = {
        email: inputEmail.value,
        fecha: inputFecha.value
    }
console.log(usuarios);
    socket.emit('from-client-mensaje', usuarios);
}
