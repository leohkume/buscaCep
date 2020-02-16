const Correios = require('../models/correios');

test('find cep', async done => {
    let cep = await new Correios().findCep({ "cep": "02074000" })
    expect(typeof cep === "object").toBe(true);
    expect(cep.cep == "02074000").toBe(true);
    expect(cep.end.trim()).toEqual("Rua do Imperador - até 639/640");
    expect(cep.bairro).toBeDefined();
    expect(cep.local.trim() === "São Paulo/SP").toBe(true);
    done()
});