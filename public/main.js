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
     <span><img src="${prod.imagenProd}" width="50px"></span>`)
    }).join('<br>'); 
    document.querySelector('#historial').innerHTML = HistoriaProd;
}
function render2(mensaje) {
    const HistoriaMsj= mensaje.map((msj)=>{
        return (`<span style='color:blue;'>
        <b>${msj.email}: </b>
        <span style='color:#804000;'>${msj.fecha}</span>
        <span style='color:green;font-style: italic;'>${msj.mesj} </span>`)
    }).join('<br>'); 
    document.querySelector('#mensajes').innerHTML = HistoriaMsj;
}
function enviarProducto() {
   
    const inputProducto = document.querySelector('#nombre');
    const inputPrecio = document.querySelector('#precio');
    const inputThumbail = document.querySelector('#imagenProd');

 
    const Fproducto = {
        nombre: inputProducto.value,
        precio: inputPrecio.value,
        imagenProd : inputThumbail.value
    }

   socket.emit('from-client-producto', Fproducto);
}
function enviarMensaje() {
    
    const inputMsj = document.querySelector('#mesj');

    const inputEmail = document.querySelector('#email');  
   //document.getElementbyId('fecha').value =Date.now() ;
    const inputFecha = document.querySelector('#fecha');
    
    const usuarios = {
        email: inputEmail.value,
        mesj: inputMsj.value,
        fecha: inputFecha.value 
    }
    
    socket.emit('from-client-mensaje', usuarios);
}
