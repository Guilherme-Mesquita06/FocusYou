var database = require("../database/config");


function cadastrar(nome, descricao, dificuldade,agrupamentoMuscular,numSeries, idTreino , equipamento ) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", nome, descricao, dificuldade,agrupamentoMuscular,numSeries, idTreino , equipamento);
    var instrucaoSql = `
        INSERT INTO exercicio (nome, descricao, dificuldade,agrupamentoMuscular,numSeries, fkTreino , equipamento) VALUES ('${nome}', '${descricao}', '${dificuldade}', '${agrupamentoMuscular}', ${numSeries}, ${idTreino}, '${equipamento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {

    cadastrar,
    
}