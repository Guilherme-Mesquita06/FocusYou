var database = require("../database/config");


function cadastrar(nomeExercicio, descricao, dificuldade,agrupamento, idTreino , equipamento ) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", nomeExercicio, descricao, dificuldade,agrupamento, idTreino , equipamento);
    var instrucaoSql = `
        INSERT INTO exercicio (nome, descricao, dificuldade,agrupamento, fkTreino , equipamento ) VALUES ('${nomeExercicio}', '${descricao}','${dificuldade}', '${agrupamento}', ${idTreino}, '${equipamento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function lista(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
  SELECT 
        e.*
        FROM exercicio AS e 
          JOIN treino AS t
           ON e.fkTreino = t.id
          JOIN ficha AS f
           ON t.fkFicha = f.id
          JOIN usuario AS u
           ON f.fkUsuario = u.id
		WHERE u.id = ${idUsuario};

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorTreino(idTreino) {
      console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorTreino()");

  var instrucaoSql = `
	SELECT 
		e.agrupamento AS agrupamento,
		e.nome AS nomeExercicio,
        e.equipamento AS equipamento,
        e.dificuldade AS dificuldade,
        e.descricao AS descricao,
        e.id AS idExercicio
        FROM treino AS t
        JOIN exercicio AS e
        ON e.fkTreino = t.id
        WHERE t.id = ${idTreino};
  `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}

function buscarExercicioPorTreino (statusFicha, idUsuario, idTreino){

        console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n buscarExercicioPorTreino ()", statusFicha, idUsuario, idTreino);
    var instrucaoSql = `
SELECT
    t.titulo AS treino,
    e.id AS idExercicio,
		 e.agrupamentoMuscular AS agrupamentoMuscular,
	   e.nome AS nomeExercicio,
     e.equipamento AS equipamento,
     e.dificuldade AS dificuldade
		FROM ficha AS f
    JOIN treino AS t
      ON t.fkFicha = f.id
    JOIN usuario AS u
      ON f.fkUsuario = u.id
    JOIN exercicio AS e
      ON e.fkTreino = t.id
        WHERE u.id = ${idUsuario} AND f.status  = ${statusFicha} AND t.id = ${idTreino};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}


function deletar(idExercicio) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idExercicio);
    var instrucaoSql = `
   DELETE FROM serie WHERE fkExercicio =  ${idExercicio};
   `;
    var instrucaoSql2 = `
   DELETE FROM exercicio WHERE id = ${idExercicio};
   
   `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("Executando a instrução SQL: \n" + instrucaoSql2);

    database.executar(instrucaoSql)
    return database.executar(instrucaoSql2);
}

//     var instrucaoSql = `
//    DELETE FROM serie WHERE fkExercicio IN (SELECT id FROM exercicio WHERE fkTreino = ${idTreino});
//    `;
//     var instrucaoSql2 = `
//    DELETE FROM exercicio WHERE fkTreino IN (SELECT id FROM treino WHERE fkTreino = ${idTreino});
   
//    `;
module.exports = {

cadastrar,
buscarExercicioPorTreino,
buscarPorTreino ,
deletar,
lista
}