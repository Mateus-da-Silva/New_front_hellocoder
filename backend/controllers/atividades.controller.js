const Atividade = require('../models/atividade.model');

class AtividadesController {

  // Listar todas as atividades do usuário
  async listarTodas(req, res) {
    try {
      const userId = req.query.usuario_id || 1; // Por enquanto usuário fixo
      const atividades = await Atividade.findByUserId(userId);
      res.json({
        success: true,
        data: atividades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar atividades: ' + error.message
      });
    }
  }

  // Buscar atividades de hoje
  async listarHoje(req, res) {
    try {
      const userId = req.query.usuario_id || 1;
      const atividades = await Atividade.findToday(userId);
      res.json({
        success: true,
        data: atividades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar atividades de hoje: ' + error.message
      });
    }
  }

  // Buscar atividades concluídas hoje
  async listarConcluidasHoje(req, res) {
    try {
      const userId = req.query.usuario_id || 1;
      const atividades = await Atividade.findCompletedToday(userId);
      res.json({
        success: true,
        data: atividades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar atividades concluídas: ' + error.message
      });
    }
  }

  // Buscar atividades de ontem
  async listarOntem(req, res) {
    try {
      const userId = req.query.usuario_id || 1;
      const atividades = await Atividade.findYesterday(userId);
      res.json({
        success: true,
        data: atividades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar atividades de ontem: ' + error.message
      });
    }
  }

  // Buscar por data específica
  async listarPorData(req, res) {
    try {
      const userId = req.query.usuario_id || 1;
      const { data } = req.params;
      const atividades = await Atividade.findByDate(userId, data);
      res.json({
        success: true,
        data: atividades
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar atividades por data: ' + error.message
      });
    }
  }

  // Buscar uma atividade específica
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const atividade = await Atividade.findById(id);

      if (!atividade) {
        return res.status(404).json({
          success: false,
          error: 'Atividade não encontrada'
        });
      }

      res.json({
        success: true,
        data: atividade
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar atividade: ' + error.message
      });
    }
  }

  // Criar nova atividade
  async criar(req, res) {
    try {
      const {
        titulo,
        descricao,
        materia,
        data_entrega,
        hora_entrega,
        tempo_estimado,
        prioridade,
        status
      } = req.body;

      // Validação básica
      if (!titulo || !materia || !data_entrega) {
        return res.status(400).json({
          success: false,
          error: 'Título, matéria e data de entrega são obrigatórios'
        });
      }

      const usuario_id = req.body.usuario_id || 1; // Por enquanto usuário fixo

      const novaAtividadeId = await Atividade.create({
        usuario_id,
        titulo,
        descricao,
        materia,
        data_entrega,
        hora_entrega,
        tempo_estimado,
        prioridade,
        status
      });

      const novaAtividade = await Atividade.findById(novaAtividadeId);

      res.status(201).json({
        success: true,
        message: 'Atividade criada com sucesso',
        data: novaAtividade
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao criar atividade: ' + error.message
      });
    }
  }

  // Atualizar atividade
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const atividadeExiste = await Atividade.findById(id);
      if (!atividadeExiste) {
        return res.status(404).json({
          success: false,
          error: 'Atividade não encontrada'
        });
      }

      await Atividade.update(id, data);
      const atividadeAtualizada = await Atividade.findById(id);

      res.json({
        success: true,
        message: 'Atividade atualizada com sucesso',
        data: atividadeAtualizada
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar atividade: ' + error.message
      });
    }
  }

  // Marcar como concluída
  async marcarConcluida(req, res) {
    try {
      const { id } = req.params;

      const atividadeExiste = await Atividade.findById(id);
      if (!atividadeExiste) {
        return res.status(404).json({
          success: false,
          error: 'Atividade não encontrada'
        });
      }

      await Atividade.markAsCompleted(id);
      const atividadeAtualizada = await Atividade.findById(id);

      res.json({
        success: true,
        message: 'Atividade marcada como concluída',
        data: atividadeAtualizada
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao marcar atividade como concluída: ' + error.message
      });
    }
  }

  // Deletar atividade
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const atividadeExiste = await Atividade.findById(id);
      if (!atividadeExiste) {
        return res.status(404).json({
          success: false,
          error: 'Atividade não encontrada'
        });
      }

      await Atividade.delete(id);

      res.json({
        success: true,
        message: 'Atividade deletada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao deletar atividade: ' + error.message
      });
    }
  }
}

module.exports = new AtividadesController();