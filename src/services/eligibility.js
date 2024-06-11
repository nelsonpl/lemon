const mensagens = require('../common/mensagens');
const round = require('../common/round');

function checkEligibility(input) {
    const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = input;

    let razoesDeInelegibilidade = [];

    if (!['comercial', 'residencial', 'industrial'].includes(classeDeConsumo)) {
        razoesDeInelegibilidade.push(mensagens.classeDeConsumoNaoAceita);
    }

    if (!['convencional', 'branca'].includes(modalidadeTarifaria)) {
        razoesDeInelegibilidade.push(mensagens.modalidadeTarifariaNaoAceita);
    }

    const mediaConsumo = historicoDeConsumo.reduce((sum, value) => sum + value, 0) / historicoDeConsumo.length;
    if (tipoDeConexao === 'monofasico' && mediaConsumo < 400) {
        razoesDeInelegibilidade.push(mensagens.consumoBaixo);
    }
    if (tipoDeConexao === 'bifasico' && mediaConsumo < 500) {
        razoesDeInelegibilidade.push(mensagens.consumoBaixo);
    }
    if (tipoDeConexao === 'trifasico' && mediaConsumo < 750) {
        razoesDeInelegibilidade.push(mensagens.consumoBaixo);
    }

    if (razoesDeInelegibilidade.length > 0) {
        return {
            elegivel: false,
            razoesDeInelegibilidade,
        };
    }

    const economiaAnualDeCO2 = round((mediaConsumo * 12) * 0.084);

    return {
        elegivel: true,
        economiaAnualDeCO2,
    };
}

module.exports = { checkEligibility };