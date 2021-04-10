
const saveConfig = () => {
    const db = window.require('../data/db');
    const ip = document.getElementById('ip').value;
    const filial = document.getElementById('filial').value;

    (async () => {
      await db.saveConfig(ip, filial);
      document.getElementById('form-setup').style.display = 'none';
      document.getElementById('form-index').style.display = 'flex';
    })()
}

(() => {
    setTimeout(async () => {
      const db = window.require('../data/db');
      const isFirstAccess = await db.config();  
      
      const sec = isFirstAccess? 'form-index': 'form-setup';
      
      document.getElementById('loader').classList.add('fadeOut');
      document.getElementById(sec).style.display = 'none';
      
      setTimeout(() => {
        document.getElementById('loader').remove();
      }, 400);

    }, 800)

    document.getElementById('filial').onkeyup = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
    }

    document.getElementById('ip').onkeyup = (e) => {
        e.target.value = e.target.value.replace(/[^0-9\.]/g, ''); 
    }
})();