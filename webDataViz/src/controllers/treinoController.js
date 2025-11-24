var treinoModel = require("../models/treinoModel");




function cadastrar(req, res) {
    var titulo = req.body.tituloTreinoVar;
    var observacao = req.body.observacaoTreinoVar;
    var idFicha = req.body.idFichaVar;



 if (idFicha == undefined) {
        res.status(400).send("idUsuario está undefined!");
    } else if (titulo == undefined) {
        res.status(400).send("idUsuario está undefined!");

    } else {


        treinoModel.cadastrar(titulo, observacao,idFicha)
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


function buscarTreinoPorFicha(req, res) {
    var idUsuario = req.params.idUsuario;
    var statusFicha = req.params.statusFicha

    treinoModel.buscarTreinoPorFicha(idUsuario, statusFicha)
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
function deletar(req, res) {
    var idTreino = req.params.idTreino;

    treinoModel.deletar(idTreino)
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
    buscarTreinoPorFicha,
    deletar
}