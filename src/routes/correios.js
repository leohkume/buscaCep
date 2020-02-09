module.exports = function (app) {
   var correios = require('../controllers/correios');
   // messages Routes
   app.route('/correios')
      .post(correios.consultar_cep)
      .get(correios.consultar_logs)
};