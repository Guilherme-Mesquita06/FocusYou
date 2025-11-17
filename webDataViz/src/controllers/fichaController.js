var fichaModel = require("../models/fichaModel");




function cadastrarFicha(req, res) {
    var dataFinal = req.body.dataFinal;
    var dataInicio = req.body.dataInicio;
    var frequencia = req.body.frequencia;
    var idUsuario = req.body.idUsuario;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var status = req.body.status;


if (dataFinal == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (dataInicio == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (titulo == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (status == undefined) {
        res.status(400).send("idUsuario está undefined!");
    }else if (frequencia == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else {


        fichaModel.cadastrarFicha(dataFinal, dataInicio, frequencia ,idUsuario, titulo, descricao, status)
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


function buscarPorId(req, res) {
  var idUsuario = req.params.idUsuario;

  fichaModel.buscarPorId(idUsuario).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function editar(req, res) {
    var status = req.body.status;
    var idFicha = req.params.idFicha;

    fichaModel.editar(status, idFicha)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

module.exports = {
    cadastrarFicha,
    buscarPorId,
    editar
}