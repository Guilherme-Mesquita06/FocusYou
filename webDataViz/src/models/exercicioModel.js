var database = require("../database/config");


function cadastrar(nome, descricao, dificuldade,agrupamentoMuscular,numSeries, idTreino , equipamento ) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", nome, descricao, dificuldade,agrupamentoMuscular,numSeries, idTreino , equipamento);
    var instrucaoSql = `
        INSERT INTO exercicio (nome, descricao, dificuldade,agrupamentoMuscular,numSeries, fkTreino , equipamento) VALUES ('${nome}', '${descricao}', '${dificuldade}', '${agrupamentoMuscular}', ${numSeries}, ${idTreino}, '${equipamento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarPorId(idTreino) {
  var instrucaoSql = `
  	SELECT 
		e.*
        FROM treino AS t
        JOIN exercicio AS e
        ON e.fkTreino = t.id
        WHERE t.id = ${idTreino};
  `;

  return database.executar(instrucaoSql);
}


function lista(idUsuario, idFicha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
  SELECT 
        f.titulo AS 'Nome Ficha',
        t.titulo,
        t.observacao
        FROM ficha AS f
        JOIN treino AS t
        ON t.fkFicha = f.id
        JOIN usuario AS u
        ON f.fkUsuario = u.id
        WHERE u.id = ${idUsuario} AND f.id = ${idFicha};

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idTreino) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idTreino);
    var instrucaoSql = `
   DELETE FROM serie WHERE fkExercicio IN (SELECT id FROM exercicio WHERE fkTreino = ${idExercicio});
   `;
    var instrucaoSql2 = `
   DELETE FROM exercicio WHERE fkTreino = ${idExercicio};
   
   `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("Executando a instrução SQL: \n" + instrucaoSql2);

    return database.executar(instrucaoSql, instrucaoSql2);
}

//     var instrucaoSql = `
//    DELETE FROM serie WHERE fkExercicio IN (SELECT id FROM exercicio WHERE fkTreino = ${idTreino});
//    `;
//     var instrucaoSql2 = `
//    DELETE FROM exercicio WHERE fkTreino IN (SELECT id FROM treino WHERE fkTreino = ${idTreino});
   
//    `;
module.exports = {

    cadastrar,
buscarPorId    
}