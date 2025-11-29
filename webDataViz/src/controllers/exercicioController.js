var exercicioModel = require("../models/exercicioModel");




function cadastrar(req, res) {

    var idTreino = req.body.idTreinoServer;
    var agrupamento = req.body.agrupamentoServer;
    var nomeExercicio = req.body.nomeExercicioServer;
    var equipamento = req.body.equipamentoServer;
    var descricao = req.body.descricaoServer;
    var dificuldade = req.body.dificuldadeServer;



    if (idTreino == undefined) {
        res.status(400).send("idTreino está undefined!");
    } else if (equipamento == undefined) {
        res.status(400).send("Equipamento está undefined!");

    } else if (nomeExercicio == undefined) {
        res.status(400).send("nomeExercicio está undefined!");

    }

    else if (dificuldade == undefined) {
        res.status(400).send("dificuldade está undefined!");

    }

    else if (agrupamento == undefined) {
        res.status(400).send("agrupamentoMuscular está undefined!");

    }
    else {


        exercicioModel.cadastrar(nomeExercicio, descricao, dificuldade,agrupamento, idTreino , equipamento )
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


function lista(req, res) {
    var idUsuario = req.params.idUsuario;

    exercicioModel.lista(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function buscarPorTreino(req, res) {
  var idTreino = req.params.idTreino;

  exercicioModel.buscarPorTreino(idTreino).then((resultado) => {
    res.status(200).json(resultado);
  });
}



function deletar(req, res) {
    var idExercicio = req.params.idExercicio;

    exercicioModel.deletar(idExercicio)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    buscarPorTreino,
    deletar,
    lista
}