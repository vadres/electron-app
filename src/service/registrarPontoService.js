const axios = require('axios');
const paramService = require('./paramService');
const params = require('../../src/config/params');

module.exports = {
  registrarPonto: async (matricula, senha) => {
    const url = await paramService.getParam(params.URL_REST);
    
    return axios.post(url, {
        matricula: matricula.value,
        senha: senha.value
    });
  }
}