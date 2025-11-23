var database = require("../database/config");







// cadastrar
function cadastrarFicha(dataInicio, frequencia, objetivo, idUsuario, titulo, descricao, status) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", dataInicio, frequencia, objetivo, idUsuario, titulo, descricao, status);
    var instrucaoSql = `
        INSERT INTO ficha ( dataInicio, frequencia ,objetivo,fkUsuario, titulo, descricao, status) VALUES ( '${dataInicio}', ${frequencia},'${objetivo}',${idUsuario}, '${titulo}', '${descricao}', ${status});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function temFicha(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function temLista()", idUsuario);


    var instrucaoSql = `
        SELECT 
        COUNT(f.id) AS temFicha ,
        f.id AS idFicha,
        f.status AS status
        FROM usuario AS u
		JOIN ficha AS f
        ON f.fkUsuario = u.id
      WHERE u.id =${idUsuario}
      GROUP BY f.id;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}

function temFicha(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function temLista()", idUsuario);


    var instrucaoSql = `
        SELECT 
        COUNT(f.id) AS temFicha ,
        f.id AS idFicha,
        f.status AS status
        FROM usuario AS u
		JOIN ficha AS f
        ON f.fkUsuario = u.id
      WHERE u.id =${idUsuario}
      GROUP BY f.id;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);

}

function temFichaAtiva(idUsuario){
        console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function temFichaAtiva()", idUsuario);
    var instrucaoSql = `
       SELECT 
       COUNT(*) AS qtd,
    fkUsuario AS idUsuario
    FROM ficha WHERE status = 1 AND fkUsuario = ${idUsuario};
   `
   console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}



function desativarFichas(idFicha, idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function ativarFicha()");

    var instrucaoSql = `UPDATE ficha AS f SET status = 0
		WHERE id <> ${idFicha} AND fkUsuario = ${idUsuario};`;     

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
   
   
    return database.executar(instrucaoSql);
}

// Listar fichas
function lista(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
     SELECT u.nome AS nome,
		f.titulo,
		f.dataInicio,
        f.id AS idFicha,
		f.dataFinal,
        f.frequencia,
        f.descricao,
		f.fkUsuario AS idUsuario
        FROM usuario AS u
        JOIN ficha AS f
        ON f.fkUsuario = u.id
        WHERE u.id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function editarStatus(status, idFicha) {


    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", status, idFicha);
    var instrucaoSql = `
        UPDATE ficha SET status = '${status}' WHERE id = ${idFicha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





module.exports = {
    lista,
    cadastrarFicha,
    editarStatus,
    temFicha,
    desativarFichas,
    temFichaAtiva

}
// dataFinal, dataInicio, idUsuario, titulo, descricao, status