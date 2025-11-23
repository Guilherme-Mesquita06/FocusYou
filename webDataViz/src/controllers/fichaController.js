var fichaModel = require("../models/fichaModel");




function cadastrarFicha(req, res) {
    
    var dataInicio = req.body.dataInicio;
    var frequencia = req.body.frequencia;
    var objetivo = req.body.objetivo;
    var idUsuario = req.body.idUsuario;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var status = req.body.status;


     if (dataInicio == undefined) {
        res.status(400).send("dataInicio está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (titulo == undefined) {
        res.status(400).send("titulo está undefined!");
    } else if (status == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (frequencia == undefined) {
        res.status(400).send("frequencia está undefined!");
    }
    else if (objetivo == undefined) {
        res.status(400).send("idUsuario está undefined!");
    }  else {


        fichaModel.cadastrarFicha( dataInicio, frequencia, objetivo,idUsuario, titulo, descricao, status)
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


function listarFichas(req, res){
var idUsuario = req.params.idUsuario;

fichaModel.lista(idUsuario).then((resultado) => {
    res.status(200).json(resultado);

  })
}


function buscarTreinoPorFicha(req, res) {
    var idUsuario = req.params.idUsuario;

    fichaModel.buscarTreinoPorFicha(idUsuario).then((resultado) => {
        res.status(200).json(resultado);
    });
}


function editarStatus(req, res) {
    // Passar com params 
    var status = req.params.status;
    var idFicha = req.params.idFicha;

    fichaModel.editarStatus(status, idFicha)
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

function desativarFichas(req, res) {
    // Passar com params 
    var idFicha = req.params.idFicha;
    var idUsuario = req.params.idUsuario;

    fichaModel.desativarFichas( idFicha, idUsuario)
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
    buscarTreinoPorFicha,
    editarStatus,
    listarFichas,
    desativarFichas

}