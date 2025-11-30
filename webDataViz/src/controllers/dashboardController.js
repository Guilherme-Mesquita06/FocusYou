var dashboardModel = require("../models/dashboardModel");

function cargaLevantada(req, res) {
  var idFicha = req.params.idFicha;

  dashboardModel.cargaMes(idFicha).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function fichaAtiva (req,res){
  var idUsuario = req.params.idUsuario;
  
  dashboardModel.fichaAtiva(idUsuario).then((resultado) => {
    res.status(200).json(resultado);
  });


}


module.exports = {
cargaLevantada,
fichaAtiva
};
