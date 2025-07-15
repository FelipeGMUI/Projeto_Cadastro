-- Criação do banco de dados
CREATE DATABASE cadastro_pessoas;

-- Usar o banco criado
\c cadastro_pessoas;

-- Criação da tabela pessoas
CREATE TABLE pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    datanascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_cpf ON pessoas(cpf);
CREATE INDEX idx_nome ON pessoas(nome);

-- Dados de exemplo (opcional)
INSERT INTO pessoas (nome, datanascimento, cpf) VALUES 
('João Silva', '1990-05-15', '123.456.789-00'),
('Maria Santos', '1985-12-20', '987.654.321-00');