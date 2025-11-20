var serieModel = require("../models/serieModel");




function cadastrar(req, res) {
    var idExercicio = req.body.idExercicio;
    var tempoDescanso = req.body.tempoDescanso;
    var repeticoes = req.body.repeticoes;
    var cargaRealizada = req.body.cargaRealizada;



 if (idExercicio == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (tempoDescanso == undefined) {
        res.status(400).send("idUsuario está undefined!");

    } else if (repeticoes == undefined) {
        res.status(400).send("idUsuario está undefined!");

    } else if (cargaRealizada == undefined) {
        res.status(400).send("idUsuario está undefined!");

    }else {


        serieModel.cadastrar(idExercicio, tempoDescanso, repeticoes, cargaRealizada )
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


function listarPorExercicio(req, res) {
  var idExercicio = req.params.idExercicio;

  serieModel.listarPorExercicio(idExercicio).then((resultado) => {
    res.status(200).json(resultado);
  });
}


module.exports = {
    cadastrar,
    listarPorExercicio,
}