const message = require('./js/message');
const rp = window.require('../src/service/registrarPontoService');

async function registrarPonto() {  
    document.getElementById('reg-btn').disabled = true;
    
    document.getElementById('spin-btn').style.display = "inline-block";
    
    const matricula = document.getElementById('matricula');
    const senha = document.getElementById('senha');
    
    if (!matricula.value || matricula.value.trim() === "" || 
        !senha.value || senha.value.trim() === "") 
    {
        document.getElementById('reg-btn').disabled = false;
        document.getElementById('spin-btn').style.display = "none";

        message.createMessage(
            message.ERROR,
            "Os campos matrícula e senha devem ser preenchidos"
        );

        return false;
    }
    
    rp.registrarPonto(matricula.value, senha.value)
    .then(({ data }) => {
        const hourDate = new Date(data.horario);
        const hour = hourDate.getHours() < 10? "0" + hourDate.getHours(): hourDate.getHours();
        const min  = hourDate.getMinutes();
        
        console.log(data);

        message.createMessage(
            message.SUCCESS,
            `<u>${data.localBatida}</u><br />
             <u>Funcionário:</u> ${data.nome}<br/>
             <u>Acesso em:</u> 
             ${(new Date(data.data)).toLocaleDateString("pt-BR")} ${hour}:${min} <br />
             `
        );
        
        matricula.value = "";
        senha.value = "";
    })
    .catch(({ response }) => {
        var ms = "Algo deu errado. Contate o administrador do sistema"
        
        if (!response || !response.status) {
            ms = "Servidor demorou muito a responder. Contate o administrador do sistema";
        } else if (response.status === 401) {
            ms = "Usuário não autorizado"
        } else if (response.status === 400) {
            ms = "Alguma informação foi enviada incorretamente"
        } else if (response.status >= 500) {
            ms = "Erro no servidor de aplicação. Contate o administrador"
        }

        message.createMessage(message.ERROR, ms);
    }).finally(() => {
        document.getElementById('reg-btn').disabled = false;
        document.getElementById('spin-btn').style.display = "none";
    });
    
    return false;
}