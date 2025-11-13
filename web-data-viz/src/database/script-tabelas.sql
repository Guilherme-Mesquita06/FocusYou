CREATE DATABASE focusYou;

USE focusYou;

CREATE TABLE usuario (
	nome VARCHAR (50) NOT NULL,
	email VARCHAR (100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    peso DECIMAL (4,2) NOT NULL,
    dataTreino DATE NOT NULL,
    fotoPerfil VARCHAR (999)
);
