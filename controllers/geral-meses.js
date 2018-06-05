
const { sequelize } = require('../models');
const _  = require("lodash");

module.exports = function (req, res, next) {
    let result = {};
    let sql = `select COUNT(a.id) as total,SUM(vf.valor_realizado) as soma
    FROM viagem_solicitacao a 
    inner join viagem_fechamento vf on vf.codigo_solicitacao = a.codigo_solicitacao
   GROUP BY MONTH(a.data_hora_saida) ASC`;


    sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT })
        .then(result => {
           
            let r = _.map(result, 'total');
            let soma = _.map(result, 'soma');
           
            res.status(200).json({
                soma:soma,
                total:r
            });

        })
}