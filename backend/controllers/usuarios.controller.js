const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Cadastrar novo usuário
exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Validar campos obrigatórios
    if (!nome || !email || !senha) {
      return res.status(400).json({
        success: false,
        error: 'Nome, email e senha são obrigatórios'
      });
    }

    // Verificar se o email já existe
    const [usuariosExistentes] = await db.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (usuariosExistentes.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Este email já está cadastrado'
      });
    }

    // Criptografar senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Inserir novo usuário
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senhaCriptografada]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      data: {
        id: resultado.insertId,
        nome,
        email
      }
    });

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Validar campos
    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      });
    }

    // Buscar usuário
    const [usuarios] = await db.query(
      'SELECT id, nome, email, senha FROM usuarios WHERE email = ?',
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Email ou senha incorretos'
      });
    }

    const usuario = usuarios[0];

    // Verificar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        success: false,
        error: 'Email ou senha incorretos'
      });
    }

    // Login bem-sucedido
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};

// Obter perfil do usuário
exports.obterPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const [usuarios] = await db.query(
      'SELECT id, nome, email, created_at FROM usuarios WHERE id = ?',
      [id]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      data: usuarios[0]
    });

  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
};
