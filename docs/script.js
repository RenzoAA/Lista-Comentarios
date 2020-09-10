const lista = document.querySelector('#lista-tweets');

llamarEventos();
function llamarEventos(){
    document.getElementById('formulario').addEventListener('submit', enviarComentario);
    lista.addEventListener('click', borrarMensaje);
    document.addEventListener('DOMContentLoaded', cargarMensajes);
}
function enviarComentario(e){
    e.preventDefault();
    let mensaje = document.getElementById('tweet').value;
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X'
    const li = document.createElement('li');
    li.innerText = mensaje;
    li.appendChild(botonBorrar);
    lista.appendChild(li);
    if(mensaje === ""){
        console.log('vacio')
        lista.removeChild(li);
        return false;
    }
    agregarMensajeLs(mensaje);
}
function cargarMensajes(){
    let mensajes;
    mensajes = obtencionMensajesLs();
    mensajes.forEach(function(mensaje){
        const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X'
    const li = document.createElement('li');
    li.innerText = mensaje;
    li.appendChild(botonBorrar);
    lista.appendChild(li);
    })
}
function borrarMensaje(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarMensajeLS(e.target.parentElement.innerText)
    }
}
function agregarMensajeLs(mensaje){
    let mensajes;
    mensajes = obtencionMensajesLs();
    mensajes.push(mensaje);
    localStorage.setItem('mensajes',JSON.stringify(mensajes));
}
function obtencionMensajesLs(){
    let mensajes;
    if(localStorage.getItem('mensajes')===null){
        mensajes = [];
    }else{
        mensajes = JSON.parse(localStorage.getItem('mensajes'))
    }
    return mensajes;
}
function borrarMensajeLS(mensaje){
    let mensajes, mensajeA;
    mensajeA = mensaje.substring(0, mensaje.length - 1);
    mensajes = obtencionMensajesLs();
    mensajes.forEach(function(mensaje, index){
        if(mensajeA === mensaje){
            mensajes.splice(index, 1)
        }
    })
    localStorage.setItem('mensajes', JSON.stringify(mensajes))
}