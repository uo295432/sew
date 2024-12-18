-- Crear la base de datos con codificación UTF-8 si no existe
CREATE DATABASE IF NOT EXISTS creador
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_spanish_ci;

-- Seleccionar la base de datos
USE creador;

-- Crear las tablas con codificación UTF-8 si no existen
CREATE TABLE IF NOT EXISTS Equipos (
    nombreEquipo VARCHAR(100) NOT NULL PRIMARY KEY,
    pais VARCHAR(100) NOT NULL,
    numeroFans INT NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE IF NOT EXISTS Pilotos (
    numero INT NOT NULL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    nacionalidad VARCHAR(100) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE IF NOT EXISTS Coches (
    matricula VARCHAR(100) NOT NULL PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE IF NOT EXISTS FormaParte (
    numeroPiloto INT NOT NULL,
    nombreEquipoPiloto VARCHAR(100) NOT NULL,
    PRIMARY KEY (numeroPiloto, nombreEquipoPiloto),
    FOREIGN KEY (numeroPiloto) REFERENCES Pilotos(numero),
    FOREIGN KEY (nombreEquipoPiloto) REFERENCES Equipos(nombreEquipo)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

CREATE TABLE IF NOT EXISTS Tiene (
    numeroPilotoCoche INT NOT NULL,
    matriculaCoche VARCHAR(100) NOT NULL,
    PRIMARY KEY (numeroPilotoCoche, matriculaCoche),
    FOREIGN KEY (numeroPilotoCoche) REFERENCES Pilotos(numero),
    FOREIGN KEY (matriculaCoche) REFERENCES Coches(matricula)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;

