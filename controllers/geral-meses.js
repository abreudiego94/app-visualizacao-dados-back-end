
const { sequelize } = require('../models');
const _  = require("lodash");

module.exports = function (req, res, next) {
    let result = {};
    let sql = `select COUNT(a.id) as total
    FROM viagem_solicitacao a 
   GROUP BY MONTH(a.data_hora_saida) ASC`;


    sequelize.query(sql,
        { type: sequelize.QueryTypes.SELECT })
        .then(result => {
           
            let r = _.map(result, 'total');
           
            res.status(200).json(r);

        })
}