var express = require('express');
var router = express.Router();
let GraficosMessesControler = require('../controllers/graficos-meses')
let GraficosMessesGeralControler = require('../controllers/geral-meses')



/* GET home page. */
router.get('/meses/orgao', GraficosMessesControler);
router.get('/meses', GraficosMessesGeralControler);

module.exports = router;
