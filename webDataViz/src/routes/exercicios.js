var express = require("express");
var router = express.Router();

var exercicioController = require("../controllers/exercicioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    exercicioController.cadastrar(req, res);
})

router.get("/buscar/:idTreino", function (req, res){
    exercicioController.buscarPorId(req, res);
})

router.delete("/delete/:idExercicio", function (req, res ){
    exercicioController.deletar(req,res);
})

module.exports = router;