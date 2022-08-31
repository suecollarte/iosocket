const socket = io();

socket.on('from-server-saludo', data => {
    alert(data);
});

socket.on('from-server-mensaje', data => {
    document.querySelector('#mensajeRecibido').innerHTML = data
});

const input = document.querySelector('#mensajeEnvia');
input.addEventListener('input', ()=>{
    socket.emit('from-client-mensaje', input.value);
});
