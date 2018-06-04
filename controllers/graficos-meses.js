
const { sequelize } = require('../models');
const _  = require("lodash");

let mesRef = {
    1: 'JAN',
    2: 'FEV',
    3: 'MAR',
    4: 'ABR',
    5: 'MAI',
    6: 'JUN',
    7: 'JUL',
    8: 'AGO',
    9: 'SET',
    10: 'OUT',
    11: 'NOV',
    12: 'DEZ'
}
let arrayMeses = {
    'JAN': [],
    'FEV': [],
    'MAR': [],
    'ABR': [],
    'MAI': [],
    'JUN': [],
    'JUL': [],
    'AGO': [],
    'SET': [],
    'OUT': [],
    'NOV': [],
    'DEZ': []
}

module.exports = function (req, res, next) {
    let result = {};
    let sqlSiglas = `select a.sigla_solicitante FROM viagem_solicitacao a 
    GROUP BY a.sigla_solicitante ASC`;
    let sqlTotal = `select COUNT(a.id) as total, a.sigla_solicitante as sigla, MONTH(a.data_hora_saida) as mes
    FROM viagem_solicitacao a 
   GROUP BY a.sigla_solicitante ASC, MONTH(a.data_hora_saida) DESC`

    sequelize.query(sqlSiglas,
        { type: sequelize.QueryTypes.SELECT })
        .then(siglas => {
            siglas.forEach(element => {
                let key = element.sigla_solicitante.trim();
                result[key] = {
                    'JAN': 0,
                    'FEV': 0,
                    'MAR': 0,
                    'ABR': 0,
                    'MAI': 0,
                    'JUN': 0,
                    'JUL': 0,
                    'AGO': 0,
                    'SET': 0,
                    'OUT': 0,
                    'NOV': 0,
                    'DEZ': 0
                }
            });
            sequelize.query(sqlTotal,
                { type: sequelize.QueryTypes.SELECT })
                .then(total => {
                    total.forEach(item => {
                        let mes = mesRef[item.mes];
                        let key = item.sigla.trim();
                        result[key][mes] = item.total

                    });
                    _.forIn(result,(value,key) => {
                        _.forIn(value,(value,key) => {
                            arrayMeses[key].push(value)
                        })
                        
                    })
                    res.status(200).json({
                        labels:_.keys(result),
                        valores:arrayMeses
                    });
                })

        })
}