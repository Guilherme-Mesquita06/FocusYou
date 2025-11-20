var database = require("../database/config");



function cadastrar(titulo, observacao, idFicha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, observacao, idFicha);
    var instrucaoSql = `
        INSERT INTO treino (titulo, observacao, fkFicha) VALUES ('${titulo}', '${observacao}', ${idFicha});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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
  // Aqui como a camada está acima preciso fazer a subquery para retornar o valor correto que quero apagar 
    var instrucaoSql = `
   DELETE FROM serie WHERE fkExercicio IN (SELECT id FROM exercicio WHERE fkTreino = ${idTreino});
   `;
    var instrucaoSql2 = `
   DELETE FROM exercicio WHERE fkTreino IN (SELECT id FROM treino WHERE id = ${idTreino});
   
   `;
    var instrucaoSql3 = `    
         DELETE FROM treino WHERE id = ${idTreino});
   
   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    console.log("Executando a instrução SQL: \n" + instrucaoSql3);

    database.executar(instrucaoSql)
    database.executar(instrucaoSql2)
    return database.executar(instrucaoSql3);
}
// }
//    DELETE FROM exercicio WHERE fkTreino IN (SELECT id FROM treino WHERE fkTreino = ${idTreino});
//    DELETE FROM treino WHERE id = ${idTreino});



module.exports = {

    cadastrar,
    lista,
    deletar
}