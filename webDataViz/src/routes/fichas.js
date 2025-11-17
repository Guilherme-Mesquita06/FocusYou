var express = require("express");
var router = express.Router();

var fichaController = require("../controllers/fichaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    fichaController.cadastrarFicha(req, res);
})

router.get("/buscar/:idUsuario", function (req, res) {
    fichaController.buscarPorId(req, res);
})

router.put("/buscar/:idFicha", function (req, res) {
    fichaController.buscarPorId(req, res);
})

module.exports = router;