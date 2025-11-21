var usuarioModel = require("../models/usuarioModel");
var treinoModel = require("../models/treinoModel");
var fichaModel = require("../models/fichaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;



    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");

    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        fichaModel.temFicha(resultadoAutenticar[0].idUsuario)
                            .then((resultadoFicha) => {
                                if (resultadoFicha.length > 0) {

                                    if(resultadoFicha[0]['temFicha'] > 0){

                         var idFicha = resultadoFicha[0]['idFicha'];  

                        treinoModel.buscarTreinoPorFicha(idFicha, 1)
                            .then((resultadoTreinos) => {
                                if (resultadoTreinos.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        nome: resultadoAutenticar[0].nome,
                                        email: resultadoAutenticar[0].email,
                                        senha: resultadoAutenticar[0].senha,
                                        usuario: resultadoAutenticar,
                                        possuiFicha: true,

                                    });

                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        equipamento: resultadoAutenticar[0].equipamento,
                                        nome: resultadoAutenticar[0].nomeExercicio,
                                        agrupamentoMuscular: resultadoAutenticar[0].agrupamentoMuscular,
                                        treino: resultadoAutenticar,
                                        possuiFicha: true,
                                    });

                                    
                                } else {
                                    res.status(204).json({ treino: [] }, {
                                        possuiFicha: false,
                                    });
                                }
                            });


                            }
                        }
                    });

        

                    }

                    else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var peso = req.body.pesoServer;
    var dataTreino = req.body.dataTreinoServer
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (peso == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    }
    else if (dataTreino == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, peso, dataTreino)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}