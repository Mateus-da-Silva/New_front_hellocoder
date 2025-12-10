const db = require('../config/database');

class Atividade {

  // Buscar todas as atividades de um usuário
  static async findByUserId(userId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM atividades WHERE usuario_id = ? ORDER BY data_entrega ASC, created_at DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Buscar atividades por data
  static async findByDate(userId, date) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM atividades WHERE usuario_id = ? AND data_entrega = ? ORDER BY hora_entrega ASC',
        [userId, date]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Buscar atividades de hoje
  static async findToday(userId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM atividades WHERE usuario_id = ? AND data_entrega = CURDATE() AND status != "concluida" ORDER BY hora_entrega ASC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Buscar atividades estudadas hoje
  static async findCompletedToday(userId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM atividades WHERE usuario_id = ? AND DATE(updated_at) = CURDATE() AND status = "concluida" ORDER BY updated_at DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Buscar atividades de ontem
  static async findYesterday(userId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM atividades WHERE usuario_id = ? AND data_entrega = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND status = "concluida" ORDER BY hora_entrega ASC',
        [userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Buscar uma atividade por ID
  static async findById(id) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM atividades WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Criar nova atividade
  static async create(data) {
    try {
      const [result] = await db.query(
        `INSERT INTO atividades
        (usuario_id, titulo, descricao, materia, data_entrega, hora_entrega, tempo_estimado, prioridade, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.usuario_id,
          data.titulo,
          data.descricao || null,
          data.materia,
          data.data_entrega,
          data.hora_entrega || null,
          data.tempo_estimado || null,
          data.prioridade || 'media',
          data.status || 'pendente'
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar atividade
  static async update(id, data) {
    try {
      const fields = [];
      const values = [];

      if (data.titulo !== undefined) {
        fields.push('titulo = ?');
        values.push(data.titulo);
      }
      if (data.descricao !== undefined) {
        fields.push('descricao = ?');
        values.push(data.descricao);
      }
      if (data.materia !== undefined) {
        fields.push('materia = ?');
        values.push(data.materia);
      }
      if (data.data_entrega !== undefined) {
        fields.push('data_entrega = ?');
        values.push(data.data_entrega);
      }
      if (data.hora_entrega !== undefined) {
        fields.push('hora_entrega = ?');
        values.push(data.hora_entrega);
      }
      if (data.tempo_estimado !== undefined) {
        fields.push('tempo_estimado = ?');
        values.push(data.tempo_estimado);
      }
      if (data.prioridade !== undefined) {
        fields.push('prioridade = ?');
        values.push(data.prioridade);
      }
      if (data.status !== undefined) {
        fields.push('status = ?');
        values.push(data.status);
      }

      values.push(id);

      const [result] = await db.query(
        `UPDATE atividades SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Deletar atividade
  static async delete(id) {
    try {
      const [result] = await db.query(
        'DELETE FROM atividades WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Marcar como concluída
  static async markAsCompleted(id) {
    try {
      const [result] = await db.query(
        'UPDATE atividades SET status = "concluida" WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Atividade;