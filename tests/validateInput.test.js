const { validateInput } = require('../src/services/validateInput');
const { cpf, cnpj, tiposDeConexao, classesDeConsumo, modalidadesTarifarias } = require('../src/common/tipos');
const mensagens = require('../src/common/mensagens');

test('Validação bem-sucedida', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731],
    };

    const result = validateInput(input);
    expect(result).toBeNull();
});

test('Número do documento inválido', () => {
    const input = {
        numeroDoDocumento: '123',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760, 5976],
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.numeroDoDocumentoInvalido);
});

test('Tipo de conexão inválido', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'quadrafasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760, 5976],
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.tipoDeConexaoInvalido);
});

test('Classe de consumo inválida', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'luxo',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760, 5976],
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.classeDeConsumoInvalida);
});

test('Modalidade tarifária inválida', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'laranja',
        historicoDeConsumo: [3878, 9760, 5976],
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.modalidadeTarifariaInvalida);
});

test('Histórico de consumo inválido - não é array', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: 'não é array',
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.historicoDeConsumoInvalido);
});

test('Histórico de consumo inválido - menos de 3 itens', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760],
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.historicoDeConsumoInvalido);
});

test('Histórico de consumo inválido - mais de 12 itens', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597, 1234],
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.historicoDeConsumoInvalido);
});

test('Histórico de consumo inválido - valor fora do intervalo', () => {
    const input = {
        numeroDoDocumento: '14041737706',
        tipoDeConexao: 'bifasico',
        classeDeConsumo: 'comercial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [3878, -1, 5976],
    };

    const result = validateInput(input);
    expect(result).toEqual(mensagens.historicoDeConsumoInvalido);
});
