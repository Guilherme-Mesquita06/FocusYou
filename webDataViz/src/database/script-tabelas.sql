CREATE DATABASE focusYou;

USE focusYou;

CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR (50) NOT NULL,
	email VARCHAR (100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    peso DECIMAL (4,2) NOT NULL,
    dataTreino DATE NOT NULL
);


CREATE TABLE ficha (
id INT PRIMARY KEY AUTO_INCREMENT,
dataFinal DATE NOT NULL,
dataInicio DATE NOT NULL,
frequencia INT NOT NULL,
fkUsuario INT NOT NULL,
			CONSTRAINT usuarioFicha
			   FOREIGN KEY (fkUsuario)
                 REFERENCES usuario (id),
titulo VARCHAR (45) NOT NULL,
descricao VARCHAR(255),
status tinyint NOT NULL,                 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


SELECT * FROM ficha; 


CREATE TABLE treino (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR (45) NOT NULL,
observacao VARCHAR(255),
fkFicha INT NOT NULL,
	CONSTRAINT fichaTreino
		FOREIGN KEY (fkFicha)
          REFERENCES ficha (id)
);






CREATE TABLE exercicio (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (45)NOT NULL,
descricao VARCHAR (255),
dificuldade VARCHAR(45), CONSTRAINT chkDificuldade CHECK  (dificuldade IN( 'Facil', 'Medio', 'Dificil')) ,
agrupamentoMuscular VARCHAR(555) , CONSTRAINT Muscula CHECK  (agrupamentoMuscular IN( 'Peito' ,'Costas' ,'Lombar', 'Trapezio', 'Biceps' ,'Triceps', 'Ombro', 'Antebraço', 'Abdominal', 'Abdutor', 'Adutor' 
												,'Quadriceps', 'Posterior', 'Panturrilha' ,'Gluteo' ,'Tibia')), 
numSeries INT,
fkTreino INT,
CONSTRAINT exercicioTreino
						FOREIGN KEY (fkTreino)
							REFERENCES treino(id),
equipamento VARCHAR (75),
	CONSTRAINT chkEquipamento CHECK (equipamento IN ('Halteres', 'Maquina', 'Barra','Rolinho', 'Colchonete'))
                            
);

ALTER TABLE exercicio ADD COLUMN fkTreino INT ,
					 ADD CONSTRAINT exercicioTreino
						FOREIGN KEY (fkTreino)
							REFERENCES treino(id);
ALTER TABLE exercicio ADD COLUMN equipamento VARCHAR (75),
										  ADD CONSTRAINT chkEquipamento CHECK (equipamento IN ('Halteres', 'Maquina', 'Barra','Rolinho', 'Colchonete'));
                            





				
CREATE TABLE serie (
fkExercicio INT,
		CONSTRAINT serieExercicio
		  FOREIGN KEY (fkExercicio)
				REFERENCES exercicio (id),
tempoDescanso TIME,                
repeticoes INT,           
cargaRealizada INT      
);			


INSERT INTO ficha (dataFinal, dataInicio, frequencia, fkUsuario, titulo, descricao, status) VALUES
('2020-4-15', '2020-01-15', 4, 1, 'Hipertrofia 1', 'Treino de hipertrofia com foco em peitoral' , 1);

INSERT INTO treino (titulo,observacao, fkFicha ) VALUES
('Costas e biceps', 'LowerBack and braquial' , 1);


INSERT INTO exercicio (nome, descricao, dificuldade, agrupamentoMuscular, fkTreino, equipamento) VALUES
('Puxada alta', null, 'Medio', 'costas', 1, 'Maquina');

INSERT INTO serie (fkExercicio, tempoDescanso, repeticoes, cargaRealizada)VALUES
(1, '00:02:30', 15, 65 );



    
    


DROP TABLE ficha;



TRUNCATE TABLE usuario;
SELECT * FROM usuario;