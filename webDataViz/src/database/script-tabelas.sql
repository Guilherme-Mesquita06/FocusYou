USE focusYou;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    peso DECIMAL(4,2) NOT NULL,
    dataTreino DATE NOT NULL,
    CONSTRAINT chk_email CHECK (email LIKE '%@%' AND email LIKE '%.com')
);

CREATE TABLE ficha (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dataFinal TIMESTAMP NULL DEFAULT NULL,
    dataInicio DATE NOT NULL,
    frequencia INT NOT NULL,
    objetivo VARCHAR(45),
    fkUsuario INT NOT NULL,
    titulo VARCHAR(45) NOT NULL,
    descricao VARCHAR(255),
    status TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_objetivo CHECK (objetivo IN ('Hipertrofia','Emagrecimento','Recuperacao','Forca')),
    CONSTRAINT fk_ficha_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario(id)
);

CREATE TABLE treino (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    observacao VARCHAR(255),
    fkFicha INT NOT NULL,
    CONSTRAINT fk_treino_ficha FOREIGN KEY (fkFicha) REFERENCES ficha(id)
);

CREATE TABLE exercicio (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    descricao VARCHAR(255),
    dificuldade VARCHAR(45),
    agrupamentoMuscular VARCHAR(45) NOT NULL,
    fkTreino INT NOT NULL,
    equipamento VARCHAR(75),

    CONSTRAINT chk_dificuldade CHECK (dificuldade IN ('Facil','Medio','Dificil')),
    CONSTRAINT chk_musculo CHECK (
        agrupamentoMuscular IN ('Peito','Costas','Lombar','Trapezio','Biceps','Triceps',
                                'Ombro','Antebraço','Abdominal','Abdutor','Adutor','Quadriceps',
                                'Posterior','Panturrilha','Gluteo','Tibia')
    ),
    CONSTRAINT chk_equipamento CHECK (equipamento IN ('Halteres','Maquina','Barra','Rolinho','Colchonete')),
    CONSTRAINT fk_exercicio_treino FOREIGN KEY (fkTreino) REFERENCES treino(id)
);

CREATE TABLE serie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tempoDescanso TIME NOT NULL,
    repeticoes INT NOT NULL,
    cargaRealizada DECIMAL(4,1) NOT NULL,
    serieRealizada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fkExercicio INT NOT NULL,

    CONSTRAINT fk_serie_exercicio FOREIGN KEY (fkExercicio) REFERENCES exercicio(id)
);


-- --------------------------------------------------------------------------------


INSERT INTO usuario (nome, email, senha, peso, dataTreino) VALUES
('Guilherme', 'gui@gmail.com', '123', 78.5, '2025-01-10'),
('Ana', 'ana@gmail.com', '123', 62.3, '2025-01-11'),
('Carlos', 'carlos@gmail.com', '123', 85.0, '2025-01-12');




      INSERT INTO ficha (dataFinal, dataInicio, frequencia, objetivo, fkUsuario, titulo, descricao, status)
VALUES
(NULL, '2025-02-15', 5, 'Hipertrofia', 1, 'Hipertrofia A', 'Bloco de peito e braço', 1),
(NULL, '2025-02-20', 4, 'Hipertrofia', 2, 'Hipertrofia B', 'Treino de costas e bíceps', 1),
(NULL, '2025-02-25', 3, 'Hipertrofia', 3, 'Hipertrofia C', 'Treino de perna completo', 1);

	
      

-- Ficha 1
INSERT INTO treino (titulo, observacao, fkFicha) VALUES
('Peito e Tríceps', 'Carga moderada', 1),
('Costas e Bíceps', 'Foco em execução', 1),
('Perna', 'Intenso', 1);

-- Ficha 2
INSERT INTO treino (titulo, observacao, fkFicha) VALUES
('Costas e Bíceps', 'Volume alto', 2),
('Peito e Ombro', 'Alongamento antes', 2),
('Perna', 'Desafio', 2);

-- Ficha 3
INSERT INTO treino (titulo, observacao, fkFicha) VALUES
('Perna Completa', 'Foco em quadríceps', 3),
('Posterior e Glúteo', 'Amplitude total', 3),
('Panturrilha + Abdômen', 'Alta repetição', 3);




INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Supino Reto', 'Dificil', 'Peito',  1, 'Barra'),
('Crucifixo', 'Medio', 'Peito',  1, 'Halteres'),
('Tríceps Corda', 'Medio', 'Triceps',  1, 'Maquina'),
('Tríceps Testa', 'Medio', 'Triceps',  1, 'Barra');

-- Treino 2
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Puxada Aberta', 'Medio', 'Costas',  2, 'Maquina'),
('Remada Baixa', 'Dificil', 'Costas',  2, 'Maquina'),
('Rosca Direta', 'Medio', 'Biceps',  2, 'Barra'),
('Rosca Alternada', 'Facil', 'Biceps',  2, 'Halteres');

-- Treino 3
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Agachamento Livre','Dificil','Quadriceps',3,'Barra'),
('Leg Press','Medio','Quadriceps',3,'Maquina'),
('Mesa Flexora','Medio','Posterior',3,'Maquina'),
('Panturrilha Sentado','Facil','Panturrilha',3,'Maquina');

-- Treino 4
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Barra Fixa','Dificil','Costas',4,'Barra'),
('Serrote','Medio','Costas',4,'Halteres'),
('Rosca Martelo','Medio','Biceps',4,'Halteres'),
('Rosca Scott','Medio','Biceps',4,'Maquina');

-- Treino 5
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Supino Inclinado','Medio','Peito',5,'Barra'),
('Voador','Facil','Peito',5,'Maquina'),
('Elevação Lateral','Medio','Ombro',5,'Halteres'),
('Desenvolvimento','Dificil','Ombro',5,'Barra');

-- Treino 6
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Agachamento Hack','Medio','Quadriceps',6,'Maquina'),
('Cadeira Extensora','Facil','Quadriceps',6,'Maquina'),
('Stiff','Dificil','Posterior',6,'Barra'),
('Panturrilha em Pé','Facil','Panturrilha',6,'Maquina');

-- Treino 7
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Agachamento Livre','Dificil','Quadriceps',7,'Barra'),
('Avanço','Medio','Quadriceps',7,'Halteres'),
('Mesa Flexora','Medio','Posterior',7,'Maquina'),
('Extensora','Facil','Quadriceps',7,'Maquina');

-- Treino 8
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular, fkTreino, equipamento)
VALUES
('Stiff','Dificil','Posterior',8,'Barra'),
('Glúteo Máquina','Medio','Gluteo',8,'Maquina'),
('Abdutora','Facil','Abdutor',8,'Maquina'),
('Abdutora Invertida','Facil','Adutor',8,'Maquina');

-- Treino 9
INSERT INTO exercicio (nome, dificuldade, agrupamentoMuscular,  fkTreino, equipamento)
VALUES
('Panturrilha Sentado','Facil','Panturrilha',9,'Maquina'),
('Panturrilha em Pé','Facil','Panturrilha',9,'Maquina'),
('Abdominal Infra','Facil','Abdominal',9,'Colchonete'),
('Prancha','Medio','Abdominal',9,'Colchonete');

	
  
      INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada)
SELECT id, '00:01:00', 12, 40.0 FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada)
SELECT id, '00:01:20', 10, 45.0 FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada)
SELECT id, '00:01:30', 8, 50.0 FROM exercicio;





INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:00', 12, 30.0, '2025-01-05 10:00:00'
FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:00', 10, 35.0, '2025-01-05 10:05:00'
FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:00', 8, 40.0, '2025-01-05 10:10:00'
FROM exercicio;



INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:10', 12, 32.5, '2025-01-12 10:00:00'
FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:10', 10, 37.5, '2025-01-12 10:05:00'
FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:10', 8, 42.5, '2025-01-12 10:10:00'
FROM exercicio;




INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:20', 12, 35.0, '2025-01-19 10:00:00'
FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:20', 10, 40.0, '2025-01-19 10:05:00'
FROM exercicio;

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada, serieRealizada)
SELECT id, '00:01:20', 8, 45.0, '2025-01-19 10:10:00';


-- -----------------------------------------------------------------------------------------------------------------------------------

-- ----------------------------------------------------- INSERTS , SELECTS , UPDATES , DELETES ----------------------------------------------------------------------------

-- Observação : selects serão feitos em blocos por tabela seguindo a seguinte estrutura
-- usuario -> ficha -> treino -> exercicio -> serie
-- Ordem de comandos DML : INSERT , SELECT , UPDATE , DELETES 
-- --------------------------------------------------------------------------------	usuario ------------------------------------------------------------------------------------------

        SELECT id, nome, email FROM usuario WHERE email = email AND senha = senha;



        SELECT DISTINCT
         u.id AS idUsuario,
         u.email AS email,
         u.senha AS senha,
		 f.id AS idFicha,
         t.id AS idTreino
      FROM usuario AS u
       JOIN ficha AS f
	  ON f.fkUsuario = u.id
       JOIN treino AS t
      ON t.fkFicha = f.id
	  WHERE email = 'gui@gmail.com' AND senha = '123';
      
      SELECT id AS idUsuario, nome, email FROM usuario WHERE email = 'gui@gmail.com' AND senha = '123';


SELECT * FROM usuario;

SELECT * FROM usuario WHERE email = 'ju@gmail.com' AND senha ='123';








SELECT * FROM usuario WHERE email = 'gui@gmail.com' AND senha = '123';

-- ------------------------------------------------ FICHAS ---------------------------------------------------------------------------------------------------------------





-- Conta quantas fichas o usuario tem no total
SELECT u.nome AS 'Nome do usuario',
         COUNT(f.titulo)  AS 'Quantidade de fichas'
        FROM usuario AS u
        JOIN ficha AS f
        ON f.fkUsuario = u.id
        WHERE u.id = 1
        GROUP BY u.nome; -- Apenas nos campos que não tem operação matematica
        
   -- lista todas as fichas que o usuario tem     
  SELECT u.nome AS 'Nome do usuario',
		f.dataFinal AS dataFinal,
        f.frequencia AS frequencia,
        f.objetivo AS objetivo,
        f.titulo AS titufloFicha,
        f.status AS status,
        f.created_at AS dtInicio
        FROM usuario AS u
        JOIN ficha AS f
        ON f.fkUsuario = u.id
        WHERE u.id = 1;
        

        
        SELECT f.*,
			  u.id AS idUsuariio
        FROM usuario AS u
        JOIN ficha AS f
        ON u.id = f.fkUsuario
        WHERE u.id = 1;
        
        
        
        UPDATE ficha SET status = 1
			WHERE id = 4;
            
		UPDATE ficha AS f SET status = 0
		WHERE id <> 1 AND (SELECT id FROM usuario WHERE id = 1);
	

        SELECT 
         u.nome AS nome,
         t.titulo AS tituloTreino
      FROM usuario AS u
      JOIN ficha AS f
	  ON f.fkUsuario = u.id
      JOIN treino AS t
      ON t.fkFicha = f.id
        WHERE f.id = 1 AND f.status  = 1;
        
        -- ELECIONA A FICHA EM ESPECIFICO
  SELECT * FROM ficha WHERE id = 1;
  
  
  
   UPDATE ficha SET status = 1 WHERE id =  1;

-- -------------------------------------------------------------------------------------TREINOS ------------------------------------------------------------------------------------------------
  SELECT COUNT(f.id) AS temFicha
        FROM usuario AS u
		JOIN ficha AS f
        ON f.fkUsuario = u.id
      WHERE u.id =6;


-- Treino 1 

  SELECT 
	    t.*
        FROM ficha AS f
        JOIN treino AS t
        ON t.fkFicha = f.id
        JOIN usuario AS u
        ON f.fkUsuario = u.id
        WHERE u.id = 1 AND f.status = 1
        GROUP BY t.id, t.titulo;

        
	SELECT
    t.titulo AS treino,
		e.*
		FROM ficha AS f
        JOIN treino AS t
        ON t.fkFicha = f.id
        JOIN usuario AS u
        ON f.fkUsuario = u.id
        JOIN exercicio AS e
        ON e.fkTreino = t.id
        WHERE f.status = 1 AND u.id = 1;
        
SELECT
       t.titulo AS treino,
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
	    WHERE f.status = 1 AND u.id = 1 AND t.id = 3;
        
        
		
        
        
    SELECT 
    t.id,
    t.titulo,
    COUNT(e.id) AS totalExercicios
	FROM treino t
    LEFT JOIN exercicio e 
    ON t.id = e.fkTreino
    WHERE t.fkFicha = 1
GROUP BY t.id, t.titulo;


       SELECT 
       f.status AS statusFicha,
	   f.id AS idFicha,
       t.id AS idTreino,
       t.titulo AS titulo
        FROM ficha AS f
        JOIN treino AS t ON t.fkFicha = f.id
        JOIN exercicio AS e ON e.fkTreino = t.id
        WHERE f.id = 1 AND f.status  = 1;

   
   
   
   
       
    -- Deleto todas as series relacionadas aos exercicios do treino 1 
  DELETE FROM serie WHERE fkExercicio IN (SELECT id FROM exercicio WHERE fkTreino = 3);
       -- Deleto todas os exercicios relacionadas ao treino  1 
   DELETE FROM exercicio WHERE fkTreino IN (SELECT id FROM treino WHERE fkTreino = 3);
   DELETE FROM treino WHERE id = 3;


   
   -- ---------------------------------------------------------------------------Exercicios -------------------------------------------------------------------------------------------------------
   
   SELECT * FROM  serie WHERE fkExercicio IN (SELECT id FROM exercicio WHERE id = 7);
   SELECT * FROM exercicio WHERE id = 34;
   SELECT * FROM serie WHERE fkExercicio = 34;
   
   
  -- DELETE FROM serie WHERE fkExercicio = 45;
   
   
   
        
-- exercicios do 
  SELECT 
		f.titulo AS 'Nome Fiacha',
        t.titulo,
		e.*
        FROM ficha AS f
        JOIN treino AS t
        ON t.fkFicha = f.id
        JOIN usuario AS u
        ON f.fkUsuario = u.id
        JOIN exercicio AS e
        ON e.fkTreino = t.id
        WHERE t.id = 9;
        
	SELECT 
		e.agrupamentoMuscular AS agrupamentoMuscular,
		e.nome AS nomeExercicio,
        e.equipamento AS equipamento,
        e.dificldade AS dificuldade
        FROM treino AS t
        JOIN exercicio AS e
        ON e.fkTreino = t.id
        WHERE t.id = 9;
        
        
        
           
   DELETE FROM serie WHERE fkExercicio IN (SELECT id FROM exercicio WHERE id = 40);
   DELETE FROM exercicio WHERE id = 40;
        DELETE FROM exercicio WHERE id = 46;
        
        

        
        
	



  SELECT u.nome AS 'Nome do usuario',
         f.* 
        FROM usuario AS u
        JOIN ficha AS f
        ON f.fkUsuario = u.id
        WHERE u.id = 1 AND MAX(f.id);
        
-- ------------------------------------------------------------------------------------------------------------- SERIES ----------------------------------------------------------------------------------------

FROM exercicio;

SELECT 
	week( serieRealizada , 1) AS Semanas,
    COUNT(id) AS serieRealizada
    FROM serie
		WHERE serieRealizada BETWEEN '2025/01/01' AND '2025/02/01'
   GROUP BY week(serieRealizada , 1)    
   ORDER BY week(serieRealizada , 1);




      
      SELECT * FROM serie WHERE fkExercicio = 4;
        
        
        
-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SELECT f.titulo , COUNT(*) FROM ficha AS f WHERE fkUsuario = 1 GROUP BY f.titulo;
SELECT * FROM treino WHERE id= 3;
SELECT * FROM treino WHERE id= 2;

-- FOCO NO USER 1
SELECT * FROM usuario;
SELECT * FROM ficha;
SELECT * FROM treino;
SELECT * FROM exercicio;
SELECT * FROM serie;



