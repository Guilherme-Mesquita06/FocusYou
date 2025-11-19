var database = require("../database/config");


// Listar fichas
function lista(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
     SELECT u.nome AS nome,
		f.titulo,
		f.dataInicio,
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

// cadastrar
function cadastrarFicha(dataFinal, dataInicio, frequencia, idUsuario, titulo, descricao, status) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", dataFinal, dataInicio, frequencia, idUsuario, titulo, descricao, status);
    var instrucaoSql = `
        INSERT INTO ficha (dataFinal, dataInicio, frequencia ,fkUsuario, titulo, descricao, status) VALUES ('${dataFinal}', '${dataInicio}', '${frequencia}',${idUsuario}, '${titulo}', '${descricao}', ${status});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function editarStatus(status, idFicha) {


    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ",status, idFicha);
    var instrucaoSql = `
        UPDATE ficha SET status = '${status}' WHERE id = ${idFicha};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}








// // Listar ficha ativa
// function listarPorUsuario(idUsuario) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
//     var instrucaoSql = `
//         SELECT 
//             a.id AS idAviso,
//             a.titulo,
//             a.descricao,
//             a.fk_usuario,
//             u.id AS idUsuario,
//             u.nome,
//             u.email,
//             u.senha
//         FROM aviso a
//             INNER JOIN usuario u
//                 ON a.fk_usuario = u.id
//         WHERE u.id = ${idUsuario};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }



// function deletar(idAviso) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
//     var instrucaoSql = `
//         DELETE FROM aviso WHERE id = ${idAviso};
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    lista,
    cadastrarFicha,
    editarStatus

}
// dataFinal, dataInicio, idUsuario, titulo, descricao, status