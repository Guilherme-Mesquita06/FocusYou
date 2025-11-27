var database = require("../database/config");



function cadastrar(titulo, observacao, idFicha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, observacao, idFicha);
    var instrucaoSql = `
        INSERT INTO treino (titulo, observacao, fkFicha) VALUES ('${titulo}', '${observacao}', ${idFicha});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listar(idFicha){
    console.log("ACESSEI O AVISO MODEL \n \n\tidFicha\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ",  idFicha);

    var instrucaoSql = `
  SELECT 
	    t.titulo AS titulo,
        t.observacao AS observacao
        FROM ficha AS f
        JOIN treino AS t
        ON t.fkFicha = f.id
        WHERE f.id = ${idFicha}; 
        `;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarTreinoPorFicha(idFicha, statusFicha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n buscarTreinoPorFicha ()", idFicha, statusFicha);
    var instrucaoSql = `
       SELECT 
       f.status AS statusFicha,
	   f.id AS idFicha,
       t.id AS idTreino,
       t.titulo AS titulo
        FROM ficha AS f
        JOIN treino AS t ON t.fkFicha = f.id
        JOIN exercicio AS e ON e.fkTreino = t.id
        WHERE f.id = ${idFicha} AND f.status  = ${statusFicha};
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
   console.log("Executando a instrução SQL: \n" + instrucaoSql2);
   console.log("Executando a instrução SQL: \n" + instrucaoSql3);
   
   console.log("Executando a instrução SQL: \n" + instrucaoSql);
    database.executar(instrucaoSql)
    database.executar(instrucaoSql2)
    return database.executar(instrucaoSql3);
}


module.exports = {

    cadastrar,
    buscarTreinoPorFicha,
    deletar,
    listar
}