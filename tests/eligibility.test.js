const { checkEligibility } = require('../src/services/eligibility');

test('Elegível - Exemplo 1', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    };

    const result = checkEligibility(input);
    expect(result).toEqual({
        elegivel: true,
        economiaAnualDeCO2: 5553.24,
    });
});

test('Não elegível - Exemplo 2', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'espacoPublico',
        modalidadeTarifaria: 'laranja',
        historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160],
    };

    const result = checkEligibility(input);
    expect(result).toEqual({
        elegivel: false,
        razoesDeInelegibilidade: ['Classe de consumo não aceita', 'Modalidade tarifária não aceita'],
    });
});
