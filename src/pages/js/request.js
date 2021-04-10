const message = require('./js/message');

async function registrarPonto() {
    const axios = require('axios');
    const db = require('../data/db');
    const params = require('../config/params');

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

    const url = await db.getParam(params.URL_REST);
    
    await axios.post(url, {
        matricula: matricula.value,
        senha: senha.value
    }).then(res => {
        console.log(res)
        matricula.value = "";
        senha.value = "";
    }).catch(error => {
        console.log(error)
    });
    
    return false;
}