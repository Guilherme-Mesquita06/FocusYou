var database = require("../database/config");


function cadastrar(idExercicio, tempoDescanso, repeticoes, cargaRealizada) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ",idExercicio, tempoDescanso, repeticoes, cargaRealizada);
    var instrucaoSql = `
        INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada) VALUES ('${idExercicio}', '${tempoDescanso}', ${repeticoes}, ${cargaRealizada});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarPorExercicio (idExercicio){
        console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ",idExercicio);

    var sql = `SELECT * FROM serie WHERE fkExercicio = ${idExercicio};`

       console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

module.exports = {
    cadastrar,  
    listarPorExercicio 
}