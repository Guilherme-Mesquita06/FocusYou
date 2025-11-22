var usuarioModel = require("../models/usuarioModel");
var treinoModel = require("../models/treinoModel");
var fichaModel = require("../models/fichaModel");
var exercicioModel = require("../models/exercicioModel");


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

                                    if (resultadoFicha[0]['temFicha'] > 0) {

                                        // para entender melhor o comportamento do json assisti este video: https://www.youtube.com/watch?v=3MREC-YEQG4
                                        // Cujo onde aprendi que o resultado[0] Seria a primeira ocorrencia e busco o campo pelo .campo
                                        treinoModel.buscarTreinoPorFicha(resultadoFicha[0].idFicha, 1)
                                            .then((resultadoTreinos) => {
                                                if (resultadoTreinos.length > 0) {
                                                    var statusFicha = resultadoTreinos[0]['statusFicha'];

                                                    exercicioModel.buscarExercicioPorTreino(resultadoTreinos[0].idTreino,statusFicha, resultadoAutenticar[0].idUsuario)
                                                        .then((resultadoExercicios) => {
                                                            if (resultadoExercicios.length > 0) {

                                                                
                                                                // treino = [1,2,3,4]
                                                                //      i    0 1 2 3 
                                                                // treino = 1 
                                                                // exercio = [1,2,3,4]
                                                                //      j     0 1 2 3



                                                                for(var i = 0 ; i < resultadoTreinos.length ;i++){
                                                                    for(var j = 0; j < resultadoExercicios.length; j++)
                                                                        
                                                                 res.json({
                                                                    id: resultadoAutenticar[0].id,
                                                                    nome: resultadoAutenticar[0].nome,
                                                                    email: resultadoAutenticar[0].email,
                                                                    senha: resultadoAutenticar[0].senha,
                                                                    usuario: resultadoAutenticar,

                                                                    idTreino : resultadoTreinos[i].idTreino,
                                                                    titulo: resultadoTreinos[i].titulo,
                                                                    treino: resultadoTreinos[i],
                                                                    possuiFicha: true,
                                                                    treino:resultadoTreinos,

                                                                    idExercicio:resultadoExercicios[j].idExercicio,
                                                                    agrupamentoMuscular: resultadoExercicios[j].agrupamentoMuscular,
                                                                    nomeExercicio: resultadoExercicios[j].nomeExercicio,
                                                                    equipamento: resultadoExercicios[j].equipamento,
                                                                    dificuldade:resultadoExercicios[j].dificuldade,
                                                                    exercicio: resultadoExercicios,

                                                                });

                                                                }
                                         




                                                            } else {
                                                                res.status(204).json({ treino: [] }, { usuario: [] }, {
                                                                    possuiFicha: false,
                                                                });
                                                            }


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