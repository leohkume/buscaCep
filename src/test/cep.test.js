const Correios = require('../models/correios');

test('find cep', async done => {
    await new Correios().findCep({ "cep": "02074000" })
    done()
});