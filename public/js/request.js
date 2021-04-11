const message = require('./js/message');
const rp = window.require('../src/service/registrarPontoService');

async function registrarPonto() {  
    const matricula = document.getElementById('matricula');
    const senha = document.getElementById('senha');
    
    if (!matricula.value || matricula.value.trim() === "" || 
        !senha.value || senha.value.trim() === "") 
    {
        message.createMessage(
            message.ERROR,
            "Os campos matrícula e senha devem ser preenchidos!"
        );

        return false;
    }
    
    rp.registrarPonto(matricula.value, senha.value)
    .then(res => {
        console.log(res)
        matricula.value = "";
        senha.value = "";
    })
    .catch(error => {
        console.log(error)
    });;
    
    return false;
}