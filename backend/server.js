const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
const atividadesRoutes = require('./routes/atividades.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

app.use('/api/atividades', atividadesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API HelloCoder funcionando!',
    version: '1.0.0',
    endpoints: {
      atividades: '/api/atividades'
    }
  });
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 API disponível em: http://localhost:${PORT}`);
  console.log(`📋 Atividades: http://localhost:${PORT}/api/atividades\n`);
});