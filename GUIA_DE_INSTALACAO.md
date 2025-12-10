# Guia de Instalação - HelloCoder

Este guia vai te ajudar a configurar e rodar o sistema HelloCoder completo (Frontend + Backend + Banco de Dados).

## Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação do MySQL](#instalação-do-mysql)
3. [Instalação do Node.js](#instalação-do-nodejs)
4. [Configurar o Banco de Dados](#configurar-o-banco-de-dados)
5. [Configurar o Backend](#configurar-o-backend)
6. [Executar o Sistema](#executar-o-sistema)
7. [Testar o Sistema](#testar-o-sistema)
8. [Solução de Problemas](#solução-de-problemas)

---

## Pré-requisitos

Você precisará instalar:
- ✅ Node.js (v14 ou superior)
- ✅ MySQL (v5.7 ou superior)
- ✅ Um navegador web moderno (Chrome, Firefox, Edge)

---

## Instalação do MySQL

### Windows:

1. **Baixe o MySQL:**
   - Acesse: https://dev.mysql.com/downloads/mysql/
   - Escolha "MySQL Installer for Windows"
   - Baixe a versão "mysql-installer-web-community"

2. **Instale o MySQL:**
   - Execute o instalador baixado
   - Escolha "Developer Default" ou "Server only"
   - Clique em "Next" até chegar na configuração
   - **IMPORTANTE:** Anote a senha que você criar para o usuário `root`
   - Continue clicando em "Next" e "Execute" até finalizar

3. **Verifique a instalação:**
   ```bash
   mysql --version
   ```

   Você deve ver algo como: `mysql Ver 8.0.x`

---

## Instalação do Node.js

### Windows:

1. **Baixe o Node.js:**
   - Acesse: https://nodejs.org/
   - Baixe a versão LTS (recomendada)

2. **Instale o Node.js:**
   - Execute o instalador
   - Clique em "Next" até finalizar
   - Deixe todas as opções padrão marcadas

3. **Verifique a instalação:**
   ```bash
   node --version
   npm --version
   ```

   Você deve ver as versões instaladas.

---

## Configurar o Banco de Dados

### Passo 1: Acessar o MySQL

Abra o **Command Prompt** ou **PowerShell** e execute:

```bash
mysql -u root -p
```

Digite a senha que você criou durante a instalação do MySQL.

### Passo 2: Criar o Banco de Dados

Você tem duas opções:

**Opção A - Copiar e Colar o SQL:**

1. Abra o arquivo `backend/database/schema.sql` em um editor de texto
2. Copie todo o conteúdo
3. Cole no terminal do MySQL
4. Pressione Enter

**Opção B - Executar o arquivo diretamente:**

No MySQL, execute:

```sql
source C:/Users/Matheus/Documents/GitHub/New_front_hellocoder/backend/database/schema.sql
```

**Ajuste o caminho** de acordo com onde seu projeto está localizado.

### Passo 3: Verificar se foi criado

```sql
SHOW DATABASES;
USE hellocoder_db;
SHOW TABLES;
```

Você deve ver as tabelas: `usuarios`, `atividades`, `sessoes_estudo`, `revisoes`

### Passo 4: Sair do MySQL

```sql
EXIT;
```

---

## Configurar o Backend

### Passo 1: Navegar até a pasta backend

No terminal:

```bash
cd C:\Users\Matheus\Documents\GitHub\New_front_hellocoder\backend
```

### Passo 2: Instalar as dependências

```bash
npm install
```

Aguarde a instalação terminar. Pode demorar alguns minutos.

### Passo 3: Configurar o arquivo .env

Abra o arquivo `backend/.env` e edite com suas informações:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUA_SENHA_MYSQL_AQUI
DB_NAME=hellocoder_db
DB_PORT=3306
```

**IMPORTANTE:** Troque `SUA_SENHA_MYSQL_AQUI` pela senha do seu MySQL.

---

## Executar o Sistema

### Passo 1: Iniciar o Backend

No terminal, na pasta `backend`:

```bash
npm run dev
```

Você deve ver:

```
✅ Conectado ao banco de dados MySQL
🚀 Servidor rodando na porta 3000
📡 API disponível em: http://localhost:3000
```

**Deixe este terminal aberto!** O servidor precisa estar rodando.

### Passo 2: Abrir o Frontend

Abra um **NOVO terminal** (não feche o anterior) e navegue até a pasta do projeto:

```bash
cd C:\Users\Matheus\Documents\GitHub\New_front_hellocoder
```

Agora você tem duas opções para abrir o frontend:

**Opção A - Usando Node.js http-server (Recomendado):**

```bash
npx http-server -p 8000
```

Depois abra no navegador: `http://localhost:8000/Pages/Login/index.html`

**Opção B - Usando Python (se você tiver instalado):**

```bash
python -m http.server 8000
```

Depois abra no navegador: `http://localhost:8000/Pages/Login/index.html`

**IMPORTANTE:** O sistema agora requer autenticação. Sempre comece pela página de Login ou Cadastro!

---

## Testar o Sistema

### 1. Verificar se o Backend está rodando:

Abra no navegador: `http://localhost:3000/api/atividades/hoje`

Você deve ver algo como:

```json
{
  "success": true,
  "data": [...]
}
```

### 2. Testar o Frontend:

**Passo 1: Criar uma conta**

1. Abra `http://localhost:8000/Pages/Cadastro/index.html`
2. Preencha o formulário:
   - Nome completo: "Seu Nome"
   - Email: "seu@email.com"
   - Senha: mínimo 6 caracteres
   - Telefone: (opcional)
3. Clique em "Criar Conta"
4. Você será redirecionado para o login

**Passo 2: Fazer Login**

1. Use o email e senha que você cadastrou
2. Clique em "Entrar"
3. Você será redirecionado para a Home

**Passo 3: Gerenciar Atividades**

1. Na Home, clique em "Atividades" no menu lateral
2. Clique no botão **+** (adicionar) na sidebar
3. Preencha o formulário de nova atividade:
   - Título: "Teste de Sistema"
   - Matéria: "TESTES"
   - Data: Escolha hoje
   - Clique em "Salvar Atividade"
4. A nova atividade deve aparecer na lista!

### 3. Verificar no Banco de Dados:

Abra o MySQL novamente:

```bash
mysql -u root -p
```

Execute:

```sql
USE hellocoder_db;
SELECT * FROM atividades;
```

Você deve ver todas as atividades, incluindo a que você acabou de criar!

---

## Solução de Problemas

### ❌ Erro: "Cannot connect to database"

**Solução:**
1. Verifique se o MySQL está rodando
2. No Windows, abra "Serviços" (services.msc) e veja se "MySQL80" está iniciado
3. Verifique a senha no arquivo `.env`

### ❌ Erro: "Port 3000 already in use"

**Solução:**
1. Algum programa já está usando a porta 3000
2. Mude no arquivo `.env`: `PORT=3001`
3. Atualize também no frontend (`Atividades/script.js` linha 4): `const API_URL = 'http://localhost:3001/api';`

### ❌ Erro: "CORS policy"

**Solução:**
Use um servidor local (Python ou Node.js http-server):

```bash
npm install -g http-server
http-server
```

Depois acesse: `http://localhost:8080/Pages/Atividades/index.html`

### ❌ Erro: "Table 'hellocoder_db.atividades' doesn't exist"

**Solução:**
Execute novamente o script SQL:

```bash
mysql -u root -p hellocoder_db < backend/database/schema.sql
```

### ❌ Frontend não carrega atividades

**Solução:**
1. Verifique se o backend está rodando (deve estar em `http://localhost:3000`)
2. Abra o Console do navegador (F12) e veja se há erros
3. Verifique se a URL da API está correta em `Pages/Atividades/script.js`

---

## Estrutura de Pastas

```
New_front_hellocoder/
├── backend/                 # Backend Node.js
│   ├── config/              # Configurações
│   ├── controllers/         # Controladores
│   ├── database/            # Scripts SQL
│   ├── models/              # Models
│   ├── routes/              # Rotas da API
│   ├── .env                 # Variáveis de ambiente
│   ├── package.json         # Dependências
│   └── server.js            # Servidor principal
│
├── Pages/                   # Todas as páginas do frontend
│   ├── Atividades/          # Página de Atividades
│   │   ├── index.html
│   │   ├── script.js        # JavaScript (integrado com API)
│   │   └── style.css
│   ├── Home1/               # Página inicial
│   ├── Pomodoro/            # Timer Pomodoro
│   ├── Login/               # Tela de login
│   ├── Cadastro/            # Tela de cadastro
│   └── ... (outras páginas)
│
└── assets/                  # Recursos compartilhados
    ├── img/                 # Imagens
    └── audio/               # Áudio
```

---

## Próximos Passos

Agora que o sistema está funcionando, você pode:

1. ✅ Cadastrar novas atividades
2. ✅ Visualizar atividades de hoje, concluídas e de ontem
3. ✅ Editar e deletar atividades (via API)
4. 🔄 Implementar sistema de login
5. 🔄 Adicionar autenticação JWT
6. 🔄 Integrar outras páginas (Pomodoro, Calendário, etc.)

---

## Comandos Úteis

### Backend:
```bash
cd backend
npm run dev          # Modo desenvolvimento
npm start            # Modo produção
```

### MySQL:
```bash
mysql -u root -p                    # Acessar MySQL
mysql> SHOW DATABASES;              # Listar bancos
mysql> USE hellocoder_db;           # Usar banco
mysql> SHOW TABLES;                 # Listar tabelas
mysql> SELECT * FROM atividades;    # Ver atividades
mysql> EXIT;                        # Sair
```

### Servidor Local (Frontend):
```bash
python -m http.server 8000
# ou
npx http-server
```

---

## Parabéns! 🎉

Seu sistema HelloCoder está funcionando! Agora você pode estudar de forma organizada e registrar todas as suas atividades.

**Desenvolvido para ajudar estudantes a se organizarem melhor!**
