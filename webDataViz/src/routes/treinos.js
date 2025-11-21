var express = require("express");
var router = express.Router();

var treinoController = require("../controllers/treinoController");


//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    treinoController.cadastrar(req, res);
})
router.get("/buscar/:idUsuario/:statusFicha", function(req, res){
    treinoController.buscarTreinoPorFicha(req,res)

})
router.delete("/delete/:idTreino" , function(req, res ){
    treinoController.deletar(req,res)
})

module.exports = router;