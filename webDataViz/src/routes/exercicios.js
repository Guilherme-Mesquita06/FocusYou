var express = require("express");
var router = express.Router();

var exercicioController = require("../controllers/exercicioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    exercicioController.cadastrar(req, res);
})


// Lista de todos os exercicios cadastratados pelo usuario
router.get("/lista/:idUsuario", function (req, res) {
    exercicioController.lista(req, res);
})
// Lista de todos os exercicios do treino selecionado
router.get("/buscar/:idTreino", function (req, res) {
    exercicioController.buscarPorTreino(req, res);
})
// listando todos os exercicios de cada treino do usuario
router.get("/buscar/:idUsuario/:statusFicha/:idTreino", function (req, res) {
    exercicioController.buscarExercicioPorTreino(req, res)

})


// deletar exercicio
router.delete("/delete/:idExercicio", function (req, res) {
    exercicioController.deletar(req, res);
})

module.exports = router;