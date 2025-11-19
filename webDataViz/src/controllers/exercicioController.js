var exercicioModel = require("../models/exercicioModel");




function cadastrar(req, res) {

    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var dificuldade = req.body.dificuldade;
    var agrupamentoMuscular = req.body.agrupamentoMuscular;
    var numSeries = req.body.numSeries;
    var idTreino = req.body.idTreino;
    var equipamento = req.body.equipamento;



    if (idTreino == undefined) {
        res.status(400).send("idTreino está undefined!");
    } else if (equipamento == undefined) {
        res.status(400).send("Equipamento está undefined!");

    } else if (nome == undefined) {
        res.status(400).send("nome está undefined!");

    }

    else if (dificuldade == undefined) {
        res.status(400).send("dificuldade está undefined!");

    }
    else if (numSeries == undefined) {
        res.status(400).send("numSeries está undefined!");

    }
    else if (agrupamentoMuscular == undefined) {
        res.status(400).send("agrupamentoMuscular está undefined!");

    }
    else {


        exercicioModel.cadastrar(nome, descricao, dificuldade,agrupamentoMuscular,numSeries, idTreino , equipamento )
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
  var idTreino = req.params.idTreino;

  exercicioModel.buscarPorId(idTreino).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
    cadastrar,
    buscarPorId
}