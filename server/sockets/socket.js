const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

let usuario = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }
        client.join(data.sala);

        let personas = usuario.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersonas', usuario.getPersonasPorSala(data.sala));
        callback(usuario.getPersonasPorSala(data.sala));

    });

    client.on('crearMensaje', (data) => {

        let persona = usuario.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    });

    client.on('mensajePrivado', (data) => {
        // if (!data.para) {
        //     return callback({
        //         error: true,
        //         mensaje: 'El id es necesario'
        //     })
        // }
        let persona = usuario.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let personaBorrada = usuario.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} se ha desconectado`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuario.getPersonasPorSala(personaBorrada.sala));

    });


});