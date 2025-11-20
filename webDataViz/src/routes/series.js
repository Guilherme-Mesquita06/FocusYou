var express = require("express");
var router = express.Router();

var serieController = require("../controllers/serieController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    serieController.cadastrar(req, res);
})

router.get("/lista/:idExercicio", function (req, res) {
    serieController.listarPorExercicio(req,res)
})

module.exports = router;