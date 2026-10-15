CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_nombre VARCHAR(100) NOT NULL
);

CREATE TABLE alergenos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE platos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ingredientes VARCHAR(150) NOT NULL,
    precio DECIMAL(5,2) NOT NULL,
    destacados TINYINT(1) NOT NULL DEFAULT 0,
    categoria_id INT NOT NULL,
    imagen VARCHAR(255)
);

CREATE TABLE platos_alergenos (
    plato_id INT NOT NULL,
    alergeno_id INT NOT NULL,
    PRIMARY KEY (plato_id, alergeno_id)
);

ALTER TABLE platos
ADD CONSTRAINT fk_platos_categoria
FOREIGN KEY (categoria_id)
REFERENCES categorias(id)
ON DELETE RESTRICT
ON UPDATE RESTRICT;

ALTER TABLE platos_alergenos
ADD CONSTRAINT fk_platos_alergenos_plato
FOREIGN KEY (plato_id)
REFERENCES platos(id)
ON DELETE CASCADE
ON UPDATE RESTRICT;

ALTER TABLE platos_alergenos
ADD CONSTRAINT fk_platos_alergenos_alergeno
FOREIGN KEY (alergeno_id)
REFERENCES alergenos(id)
ON DELETE CASCADE
ON UPDATE RESTRICT;

INSERT INTO categorias (categoria_nombre) VALUES
('entrantes'),
('pasta y arroz'),
('carnes'),
('pescados'),
('sushi');

INSERT INTO alergenos (nombre) VALUES
('Gluten'),
('Marisco');