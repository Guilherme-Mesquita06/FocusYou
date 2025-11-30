var database = require("../database/config");

function cargaMes(idFicha){
        console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cargaMes(): ", idFicha);
 var instrucaoSql = `
	SELECT
		SUM(cargaRealizada) AS pesoLevantado
          FROM serie  AS s
          JOIN exercicio AS e
        ON s.fkExercicio = e.id
          JOIN treino AS t
        ON e.fkTreino = t.id
          JOIN ficha AS f
        ON t.fkFicha = f.id
          JOIN usuario AS u
        ON f.fkUsuario = u.id
			WHERE serieRealizada BETWEEN '2025/02/01' AND '2025/03/01' AND f.id = ${idFicha};
 `;
     console.log("Executando a instrução SQL: \n" + instrucaoSql);
     return database.executar(instrucaoSql);
}

function fichaAtiva (idUsuario){
        console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function fichaAtiva(): ", idUsuario);

  var instrucaoSql = `
  
    SELECT 
		   	f.id AS idFicha
         FROM usuario AS u
		     JOIN ficha AS f
	       ON f.fkUsuario = u.id
            WHERE  f.status  = 1 AND u.id = ${idUsuario};
  `;
     console.log("Executando a instrução SQL: \n" + instrucaoSql);
     return database.executar(instrucaoSql);
}

module.exports = {

cargaMes,
fichaAtiva
}