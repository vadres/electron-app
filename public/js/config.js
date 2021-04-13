const saveConfig = () => {
  const paramService = window.require('../src/service/paramService');
  const ip = document.getElementById('ip').value;
  const filial = document.getElementById('filial').value;
  
  if (!ip || ip.trim() === "" || !filial || filial.trim() === "") { 
    message.createMessage(
        message.ERROR,
        "Os campos IP e FILIAL devem ser preenchidos!"
    );

    return false;
  }

  if (!/^(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})$/.test(ip)) {
      message.createMessage(
          message.ERROR,
          "IP digitado não é válido"
      );

    return false;
      
  }

  (async () => {
    await paramService.saveConfig(ip, filial);
    document.getElementById('form-setup').style.display = 'none';
    document.getElementById('form-index').style.display = 'flex';
  })()
}