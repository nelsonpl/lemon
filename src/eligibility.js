const { cpf, cnpj, tiposDeConexao, classesDeConsumo, modalidadesTarifarias } = require('./tipos');

function validateInput(input) {
    const errors = [];

    // Validate numeroDoDocumento
    if (typeof input.numeroDoDocumento !== 'string' ||
        (!new RegExp(cpf.pattern).test(input.numeroDoDocumento) && !new RegExp(cnpj.pattern).test(input.numeroDoDocumento))) {
        errors.push('Número do documento inválido');
    }

    // Validate tipoDeConexao
    if (!tiposDeConexao.includes(input.tipoDeConexao)) {
        errors.push('Tipo de conexão inválido');
    }

    // Validate classeDeConsumo
    if (!classesDeConsumo.includes(input.classeDeConsumo)) {
        errors.push('Classe de consumo inválida');
    }

    // Validate modalidadeTarifaria
    if (!modalidadesTarifarias.includes(input.modalidadeTarifaria)) {
        errors.push('Modalidade tarifária inválida');
    }

    // Validate historicoDeConsumo
    if (!Array.isArray(input.historicoDeConsumo) ||
        input.historicoDeConsumo.length < 3 ||
        input.historicoDeConsumo.length > 12 ||
        input.historicoDeConsumo.some(item => typeof item !== 'number' || item < 0 || item > 9999)) {
        errors.push('Histórico de consumo inválido');
    }

    if (errors.length > 0) {
        return errors.join(', ');
    }

    return null;
}

function checkEligibility(input) {
    const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = input;

    let razoesDeInelegibilidade = [];

    if (!['comercial', 'residencial', 'industrial'].includes(classeDeConsumo)) {
        razoesDeInelegibilidade.push('Classe de consumo não aceita');
    }

    if (!['convencional', 'branca'].includes(modalidadeTarifaria)) {
        razoesDeInelegibilidade.push('Modalidade tarifária não aceita');
    }

    const mediaConsumo = historicoDeConsumo.reduce((sum, value) => sum + value, 0) / historicoDeConsumo.length;
    if (tipoDeConexao === 'monofasico' && mediaConsumo < 400) {
        razoesDeInelegibilidade.push('Consumo muito baixo para tipo de conexão');
    }
    if (tipoDeConexao === 'bifasico' && mediaConsumo < 500) {
        razoesDeInelegibilidade.push('Consumo muito baixo para tipo de conexão');
    }
    if (tipoDeConexao === 'trifasico' && mediaConsumo < 750) {
        razoesDeInelegibilidade.push('Consumo muito baixo para tipo de conexão');
    }

    if (razoesDeInelegibilidade.length > 0) {
        return {
            elegivel: false,
            razoesDeInelegibilidade,
        };
    }

    const economiaAnualDeCO2 = (mediaConsumo * 12) * 0.084;

    return {
        elegivel: true,
        economiaAnualDeCO2,
    };
}

module.exports = { validateInput, checkEligibility };