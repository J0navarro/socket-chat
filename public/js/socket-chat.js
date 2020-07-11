var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala es requerido');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', (usuario), function(resp) {
        console.log(resp);

    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});




// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

socket.on('crearMensaje', function(mensaje) {

    console.log(mensaje);

});
socket.on('listaPersonas', function(mensaje) {

    console.log(mensaje);

});

// Enviar información
// socket.emit('crearMensaje', {

//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });


// Enviar información
socket.on('mensajePrivado', function(mensaje) {
    console.log(mensaje);
});