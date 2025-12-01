var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscar/carga/:idFicha", function (req, res) {
    dashboardController.cargaLevantada(req, res);
});

router.get("/buscar/fichaAtiva/:idUsuario", function (req, res) {
    dashboardController.fichaAtiva(req, res);
})
router.get('/buscar/series/mes/:idFicha', function (req, res) {
        dashboardController.seriesMes(req, res);

})
router.get('/buscar/frequencia/mes/:idFicha', function (req, res) {
        dashboardController.diasTreinados(req, res);
})

router.get('/buscar/frequencia/semana/:idFicha', function (req, res) {
        dashboardController.diasTreinadosSemana(req, res);
})

module.exports = router;