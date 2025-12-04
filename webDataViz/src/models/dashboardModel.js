var database = require("../database/config");

function cargaMes(idFicha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cargaMes(): ", idFicha);
  var instrucaoSql = `
SELECT 
	SUM(cargaRealizada)AS pesoLevantado
    FROM serie AS s
    JOIN exercicio AS e
    ON s.fkExercicio = e.id
    JOIN treino AS t
    ON e.fkTreino = t.id
    JOIN ficha AS f 
    ON t.fkFicha = f.id
		WHERE serieRealizada BETWEEN '2025/12/01' AND '2026/01/01' AND f.id = ${idFicha};
 `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function fichaAtiva(idUsuario) {
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

function seriesMes(idFicha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function seriesMes(): ", idFicha);

  var instrucaoSql = `
SELECT 
    COUNT(s.id) AS serieRealizada
        FROM serie AS s
	JOIN exercicio AS e
    ON s.fkExercicio = e.id
    JOIN treino AS t
    ON e.fkTreino = t.id
    JOIN ficha AS f 
    ON t.fkFicha = f.id
		WHERE f.id = ${idFicha} AND  s.serieRealizada BETWEEN '2025/12/01' AND '2026/01/01'
   GROUP BY week(serieRealizada , 1);
   
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function frequenciaMes(idFicha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function frequenciaMes(): ", idFicha);

  var instrucaoSql = `
     
        	SELECT 
		(SELECT frequencia FROM ficha WHERE id = ${idFicha}) AS frequencia,
	COUNT(DISTINCT DAY(serieRealizada)) AS treinosDia
    FROM serie AS s
	JOIN exercicio AS e
    ON s.fkExercicio = e.id
    JOIN treino AS t
    ON e.fkTreino = t.id
    JOIN ficha AS f 
    ON t.fkFicha = f.id
		WHERE serieRealizada BETWEEN '2025/12/01' AND '2026/01/01' AND f.id = ${idFicha};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function frequenciaSemana(idFicha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function frequenciaSemana(): ", idFicha);

  var instrucaoSql = `
     
	SELECT 
		(SELECT frequencia FROM ficha WHERE id = ${idFicha}) AS frequencia,
	COUNT(DISTINCT DAY(serieRealizada)) AS treinosDia
    FROM serie AS s
	JOIN exercicio AS e
    ON s.fkExercicio = e.id
    JOIN treino AS t
    ON e.fkTreino = t.id
    JOIN ficha AS f 
    ON t.fkFicha = f.id
		WHERE serieRealizada BETWEEN '2025/12/01' AND '2025/12/07' AND f.id = ${idFicha};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function variacaoCarga(idFicha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function frequenciaSemana(): ", idFicha);

  var instrucaoSql = `
     
    
SELECT
	WEEK(serieRealizada) AS Semana,
    SUM(cargaRealizada)AS cargaSemanal
    FROM serie AS s
    JOIN exercicio AS e
    ON s.fkExercicio = e.id
    JOIN treino AS t
    ON e.fkTreino = t.id
    JOIN ficha AS f 
    ON t.fkFicha = f.id
		WHERE serieRealizada BETWEEN '2025/12/01' AND '2025/12/15' AND f.id = ${idFicha}
	GROUP BY WEEK(serieRealizada)
	ORDER BY (Semana);

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function seriesporGrupo(idFicha) {
  console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function seriesPorGrupo(): ", idFicha);

  var instrucaoSql = `
     
    

 SELECT 
     e.agrupamento AS musculo,
     COUNT(s.id) AS totalSeries
 FROM serie AS s
 JOIN exercicio AS e ON s.fkExercicio = e.id
 JOIN treino AS t ON e.fkTreino = t.id
 JOIN ficha AS f ON t.fkFicha = f.id
 WHERE f.id = ${idFicha} AND  s.serieRealizada BETWEEN '2025/12/01' AND '2026/01/01'
 GROUP BY e.agrupamento
 ORDER BY musculo;

  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}









module.exports = {

  cargaMes,
  fichaAtiva,
  seriesMes,
  frequenciaMes,
  frequenciaSemana,
  variacaoCarga,
  seriesporGrupo
}