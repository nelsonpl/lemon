const { cpf, cnpj, tiposDeConexao, classesDeConsumo, modalidadesTarifarias } = require('../common/tipos');
const mensagens = require('../common/mensagens');

function validateInput(input) {
    const errors = [];

    if (typeof input.numeroDoDocumento !== 'string' ||
        (!new RegExp(cpf.pattern).test(input.numeroDoDocumento) && !new RegExp(cnpj.pattern).test(input.numeroDoDocumento))) {
        errors.push(mensagens.numeroDoDocumentoInvalido);
    }

    if (!tiposDeConexao.includes(input.tipoDeConexao)) {
        errors.push(mensagens.tipoDeConexaoInvalido);
    }

    if (!classesDeConsumo.includes(input.classeDeConsumo)) {
        errors.push(mensagens.classeDeConsumoInvalida);
    }

    if (!modalidadesTarifarias.includes(input.modalidadeTarifaria)) {
        errors.push(mensagens.modalidadeTarifariaInvalida);
    }

    if (!Array.isArray(input.historicoDeConsumo) ||
        input.historicoDeConsumo.length < 3 ||
        input.historicoDeConsumo.length > 12 ||
        input.historicoDeConsumo.some(item => typeof item !== 'number' || item < 0 || item > 9999)) {
        errors.push(mensagens.historicoDeConsumoInvalido);
    }

    if (errors.length > 0) {
        return errors.join(', ');
    }

    return null;
}

module.exports = { validateInput };