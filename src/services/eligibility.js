const mensagens = require('../common/mensagens');
const round = require('../common/round');
const { classesDeConsumo, modalidadesTarifarias } = require('../common/tipos');

function checkEligibility(input) {
    let razoesDeInelegibilidade = [];

    if (!classesDeConsumo.includes(input.classeDeConsumo)) {
        razoesDeInelegibilidade.push(mensagens.classeDeConsumoNaoAceita);
    }

    if (!modalidadesTarifarias.includes(input.modalidadeTarifaria)) {
        razoesDeInelegibilidade.push(mensagens.modalidadeTarifariaNaoAceita);
    }

    const mediaConsumo = input.historicoDeConsumo.reduce((sum, value) => sum + value, 0) / input.historicoDeConsumo.length;
    if (input.tipoDeConexao === 'monofasico' && mediaConsumo < 400) {
        razoesDeInelegibilidade.push(mensagens.consumoBaixo);
    }
    if (input.tipoDeConexao === 'bifasico' && mediaConsumo < 500) {
        razoesDeInelegibilidade.push(mensagens.consumoBaixo);
    }
    if (input.tipoDeConexao === 'trifasico' && mediaConsumo < 750) {
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