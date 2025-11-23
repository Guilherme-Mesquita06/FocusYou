var express = require("express");
var router = express.Router();

var fichaController = require("../controllers/fichaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    fichaController.cadastrarFicha(req, res);
})
// QUANDO FOR CADASTRAR FAZER COM QUE O ID DA FICHA FIQUE N SESSEION STORAGE

router.get("buscar/temFicha/:idUsuario" ,function(req, res){
    fichaController.temFicha(req, res);
})
router.put("/editar/:idFicha/:idUsuario", function (req,res){
        fichaController.desativarFichas(req, res);

})

router.get("/buscar/:idUsuario", function (req, res) {
    fichaController.listarFichas(req, res);
})

router.put("/editar/:idFicha/:status", function (req, res) {
    fichaController.editarStatus(req, res);
})

router.get("/buscar/:idFicha" , function (req, res){
fichaController.buscarAtiva(req,res);

})
module.exports = router;