
const Correios = require("../models/correios")

exports.consultar_cep = async function(req, res) {
   let correios = new Correios()

   let end = await correios.findCep(req.body)

   res.json(end);
};
exports.consultar_logs = async function(req, res) {
   let correios = new Correios()

   let logs = await correios.showLogs()

   res.json(logs);
};