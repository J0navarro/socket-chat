const crearMensaje = (nombre, mensaje, sala) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}

module.exports = {
    crearMensaje
}