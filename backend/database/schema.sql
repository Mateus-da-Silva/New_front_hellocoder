-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS hellocoder_db;
USE hellocoder_db;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de atividades
CREATE TABLE IF NOT EXISTS atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    materia VARCHAR(100) NOT NULL,
    data_entrega DATE,
    hora_entrega TIME,
    tempo_estimado VARCHAR(50),
    prioridade ENUM('baixa', 'media', 'alta') DEFAULT 'media',
    status ENUM('pendente', 'em_andamento', 'concluida') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de sessões de estudo (pomodoro)
CREATE TABLE IF NOT EXISTS sessoes_estudo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    atividade_id INT,
    duracao_minutos INT NOT NULL,
    tipo ENUM('pomodoro', 'intervalo_curto', 'intervalo_longo') DEFAULT 'pomodoro',
    data_sessao DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME,
    concluida BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE SET NULL
);

-- Tabela de revisões
CREATE TABLE IF NOT EXISTS revisoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    atividade_id INT,
    materia VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_revisao DATE NOT NULL,
    concluida BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE SET NULL
);

-- Índices para melhorar performance
CREATE INDEX idx_atividades_usuario ON atividades(usuario_id);
CREATE INDEX idx_atividades_status ON atividades(status);
CREATE INDEX idx_atividades_data ON atividades(data_entrega);
CREATE INDEX idx_sessoes_usuario ON sessoes_estudo(usuario_id);
CREATE INDEX idx_revisoes_usuario ON revisoes(usuario_id);

-- Banco de dados criado sem dados de exemplo
-- Usuários e atividades serão criados através do sistema de cadastro