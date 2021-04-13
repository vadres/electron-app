const md5 = require('md5');

const axios = require('../adapter/axios');
const paramService = require('./paramService');
const params = require('../../src/config/params');

module.exports = {
  registrarPonto: async (matricula, senha) => {
    const url = await paramService.getParam(params.URL_REST);
    const ipLocal = await paramService.getParam(params.IPV4);
    const isnFilial = await paramService.getParam(params.FILIAL);
    
    return axios.post(url.value, {
        numMatricula: matricula,
        dscSenha: senha,
        ipLocal: ipLocal.value,
        isnFilial: isnFilial.value 
       } , {
        headers: {
          "Authorization": "25f698d1385a76111957a3a199b4dde9"
        }       
    });
  }
}