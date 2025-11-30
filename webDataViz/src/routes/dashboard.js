var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscar/carga/:idFicha", function (req, res) {
    dashboardController.cargaLevantada(req, res);
});

router.get("/buscar/fichaAtiva/:idUsuario", function (req, res) {
    dashboardController.fichaAtiva(req, res);
})


module.exports = router;