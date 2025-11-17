var treinoModel = require("../models/treinoModel");




function cadastrar(req, res) {
    var titulo = req.body.titulo;
    var observacao = req.body.observacao;
    var idFicha = req.body.idFicha;



 if (idFicha == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (titulo == undefined) {
        res.status(400).send("idUsuario está undefined!");

    } else {


        treinoModel.cadastrar(titulo, observacao,idFicha, )
            .then((resultado) => {
                res.status(201).json(resultado);
            }
            ).catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar
}