(() => {
    setTimeout(async () => {
      const paramService = window.require('../src/service/paramService');
      const hasConfig = await paramService.hasConfig(); 
      
      const sec = hasConfig? 'form-index': 'form-setup';
      
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
        e.target.value = e.target.value.replace(/[^0-9.]/g, ''); 
    }
})();