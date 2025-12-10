# HelloCoder - Backend API

Sistema de gerenciamento de atividades para estudantes com backend em Node.js + Express e MySQL.

## Índice
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Executar o Servidor](#executar-o-servidor)
- [Endpoints da API](#endpoints-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## Requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MySQL](https://www.mysql.com/) (versão 5.7 ou superior)
- [Git](https://git-scm.com/) (opcional)

---

## Instalação

### 1. Instalar as dependências do Node.js

Abra o terminal na pasta `backend` e execute:

```bash
npm install
```

Isso instalará todas as dependências necessárias:
- `express` - Framework web
- `mysql2` - Driver MySQL
- `cors` - Middleware para CORS
- `dotenv` - Gerenciamento de variáveis de ambiente
- `body-parser` - Parser de requisições HTTP
- `nodemon` - Auto-restart do servidor (dev)

---

## Configuração do Banco de Dados

### 1. Criar o Banco de Dados

Abra o MySQL (pode usar MySQL Workbench, phpMyAdmin ou linha de comando):

```bash
mysql -u root -p
```

Execute o script SQL localizado em `backend/database/schema.sql`:

```sql
source C:/Users/Matheus/Documents/GitHub/New_front_hellocoder/backend/database/schema.sql
```

Ou copie e cole o conteúdo do arquivo diretamente no MySQL.

### 2. Configurar as Credenciais

Edite o arquivo `.env` na pasta `backend` com suas credenciais do MySQL:

```env
# Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=hellocoder_db
DB_PORT=3306
```

**IMPORTANTE:** Troque `DB_PASSWORD` pela senha do seu MySQL.

---

## Executar o Servidor

### Modo Desenvolvimento (com auto-restart):

```bash
npm run dev
```

### Modo Produção:

```bash
npm start
```

Você verá a mensagem:

```
✅ Conectado ao banco de dados MySQL
🚀 Servidor rodando na porta 3000
📡 API disponível em: http://localhost:3000
📋 Atividades: http://localhost:3000/api/atividades
```

---

## Endpoints da API

Base URL: `http://localhost:3000/api`

### **Atividades**

#### 1. Listar todas as atividades
```http
GET /atividades?usuario_id=1
```

**Resposta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "usuario_id": 1,
      "titulo": "Trabalho de SQL",
      "descricao": "Criar queries avançadas",
      "materia": "BANCO DE DADOS II",
      "data_entrega": "2025-12-09",
      "hora_entrega": "23:59:00",
      "tempo_estimado": "23min",
      "prioridade": "alta",
      "status": "pendente",
      "created_at": "2025-12-09T...",
      "updated_at": "2025-12-09T..."
    }
  ]
}
```

#### 2. Buscar atividades de hoje
```http
GET /atividades/hoje?usuario_id=1
```

#### 3. Buscar atividades concluídas hoje
```http
GET /atividades/concluidas-hoje?usuario_id=1
```

#### 4. Buscar atividades de ontem
```http
GET /atividades/ontem?usuario_id=1
```

#### 5. Buscar atividades por data
```http
GET /atividades/data/2025-12-15?usuario_id=1
```

#### 6. Buscar uma atividade específica
```http
GET /atividades/:id
```

#### 7. Criar nova atividade
```http
POST /atividades
Content-Type: application/json

{
  "usuario_id": 1,
  "titulo": "Estudar React",
  "descricao": "Componentes e hooks",
  "materia": "DESENVOLVIMENTO WEB",
  "data_entrega": "2025-12-15",
  "hora_entrega": "18:00:00",
  "tempo_estimado": "2hr",
  "prioridade": "media",
  "status": "pendente"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Atividade criada com sucesso",
  "data": { ... }
}
```

#### 8. Atualizar atividade
```http
PUT /atividades/:id
Content-Type: application/json

{
  "titulo": "Novo título",
  "status": "em_andamento"
}
```

#### 9. Marcar como concluída
```http
PATCH /atividades/:id/concluir
```

#### 10. Deletar atividade
```http
DELETE /atividades/:id
```

---

## Estrutura do Projeto

```
backend/
├── config/
│   └── database.js          # Configuração da conexão MySQL
├── controllers/
│   └── atividades.controller.js  # Lógica de controle das atividades
├── database/
│   └── schema.sql           # Script de criação do banco
├── models/
│   └── atividade.model.js   # Model de atividades
├── routes/
│   └── atividades.routes.js # Rotas da API
├── .env                     # Variáveis de ambiente
├── package.json             # Dependências do projeto
├── server.js                # Servidor Express
└── README.md                # Esta documentação
```

---

## Banco de Dados

### Tabelas Criadas:

1. **usuarios** - Informações dos estudantes
2. **atividades** - Atividades cadastradas
3. **sessoes_estudo** - Registro de sessões Pomodoro
4. **revisoes** - Sistema de revisões

### Campos da Tabela `atividades`:

- `id` - ID único
- `usuario_id` - ID do usuário
- `titulo` - Título da atividade
- `descricao` - Descrição detalhada (opcional)
- `materia` - Nome da matéria
- `data_entrega` - Data de entrega
- `hora_entrega` - Hora de entrega (opcional)
- `tempo_estimado` - Tempo estimado (ex: "1hr", "30min")
- `prioridade` - baixa, media, alta
- `status` - pendente, em_andamento, concluida
- `created_at` - Data de criação
- `updated_at` - Data da última atualização

---

## Testando a API

### Usando o navegador:

Acesse: `http://localhost:3000/api/atividades/hoje`

### Usando curl:

```bash
# Listar atividades de hoje
curl http://localhost:3000/api/atividades/hoje

# Criar nova atividade
curl -X POST http://localhost:3000/api/atividades \
  -H "Content-Type: application/json" \
  -d "{\"usuario_id\":1,\"titulo\":\"Test\",\"materia\":\"TEST\",\"data_entrega\":\"2025-12-15\"}"
```

### Usando Postman ou Insomnia:

Importe os endpoints acima e teste cada um.

---

## Solução de Problemas

### Erro: "Cannot connect to database"
- Verifique se o MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Verifique se o banco `hellocoder_db` foi criado

### Erro: "Port 3000 already in use"
- Mude a porta no arquivo `.env`: `PORT=3001`
- Ou encerre o processo que está usando a porta 3000

### Erro: "Table doesn't exist"
- Execute novamente o script `schema.sql` no MySQL

---

## Próximos Passos

1. Implementar autenticação de usuários (JWT)
2. Adicionar upload de arquivos para atividades
3. Criar notificações automáticas
4. Integrar com calendário externo
5. Adicionar estatísticas e relatórios

---

## Suporte

Para dúvidas ou problemas, entre em contato ou abra uma issue no repositório.

---

**Desenvolvido para o projeto HelloCoder**
