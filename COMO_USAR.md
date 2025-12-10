# Como Usar o HelloCoder - Sistema Completo

## 🚀 Início Rápido

### 1. Iniciar o Backend

Abra um terminal e execute:

```bash
cd backend
npm run dev
```

Você deve ver:
```
✅ Conectado ao banco de dados MySQL
🚀 Servidor rodando na porta 3000
```

### 2. Iniciar o Frontend

Abra **outro terminal** (mantenha o backend rodando) e execute:

```bash
npx http-server -p 8000
```

### 3. Acessar o Sistema

Abra seu navegador e acesse:

**http://localhost:8000/Pages/Login/index.html**

---

## 📝 Fluxo de Uso do Sistema

### Primeira Vez Usando

1. **Criar uma Conta**
   - Acesse: `http://localhost:8000/Pages/Cadastro/index.html`
   - Preencha seus dados (nome, email, senha)
   - Clique em "Criar Conta"
   - Você será redirecionado para a tela de login

2. **Fazer Login**
   - Digite seu email e senha
   - Clique em "Entrar"
   - Você será redirecionado para a Home

3. **Explorar o Sistema**
   - Use o menu lateral para navegar entre as páginas
   - Clique em "Atividades" para gerenciar suas tarefas

### Gerenciando Atividades

1. **Adicionar Nova Atividade**
   - Na página de Atividades, clique no botão **+** na sidebar
   - Preencha o formulário:
     - Título: Nome da atividade
     - Matéria: Disciplina relacionada
     - Data de Entrega
     - Tempo Estimado (ex: 1hr, 30min)
     - Prioridade (baixa, média, alta)
   - Clique em "Salvar Atividade"

2. **Visualizar Atividades**
   - **Agendado para hoje**: Atividades com entrega hoje
   - **Estudado hoje**: Atividades concluídas hoje
   - **Estudado ontem**: Atividades concluídas ontem

3. **Ver Detalhes de uma Atividade**
   - Clique em qualquer card de atividade para ver os detalhes

### Usando o Pomodoro

1. Acesse "Pomodoro" no menu lateral
2. Clique em "COMEÇAR" para iniciar o timer
3. Configure os tempos clicando no ícone de configurações
4. O timer alternará automaticamente entre foco e descanso

### Calendário

1. Acesse "Calendário" no menu
2. Visualize suas atividades organizadas por data

### Sair do Sistema

- Clique no botão "Sair" no final da sidebar
- Ou simplesmente feche o navegador

---

## 🔐 Segurança

- Todas as senhas são criptografadas no banco de dados
- Apenas usuários autenticados podem acessar o sistema
- Cada usuário vê apenas suas próprias atividades
- Suas informações ficam salvas no navegador (localStorage)

---

## 🛠️ Solução de Problemas

### Backend não conecta ao banco de dados

1. Verifique se o MySQL está rodando
2. Confira as credenciais no arquivo `backend/.env`
3. Certifique-se de que o banco `hellocoder_db` existe

### Frontend não carrega atividades

1. Verifique se o backend está rodando (porta 3000)
2. Abra o Console do navegador (F12) para ver erros
3. Certifique-se de estar logado no sistema

### "Você precisa estar logado"

- Seu login expirou ou foi removido
- Faça login novamente

### Esqueci minha senha

- Atualmente não há recuperação de senha
- Você pode criar uma nova conta ou atualizar a senha diretamente no banco de dados MySQL

---

## 📱 Páginas Disponíveis

| Página | URL | Descrição |
|--------|-----|-----------|
| Login | `/Pages/Login/index.html` | Fazer login no sistema |
| Cadastro | `/Pages/Cadastro/index.html` | Criar nova conta |
| Home | `/Pages/Home1/index.html` | Página inicial |
| Atividades | `/Pages/Atividades/index.html` | Gerenciar atividades |
| Pomodoro | `/Pages/Pomodoro/index.html` | Timer de estudo |
| Calendário | `/Pages/calendario/index.html` | Visualizar atividades por data |
| Revisões | `/Pages/Revisoes/index.html` | Gerenciar revisões |
| Notificações | `/Pages/Notificacoes/index.html` | Ver notificações |
| Perfil | `/Pages/Perfil_usu/index.html` | Ver perfil do usuário |

---

## 💡 Dicas de Uso

1. **Organize seu tempo**
   - Use o Pomodoro para sessões de estudo focadas
   - Cadastre todas as atividades com antecedência

2. **Priorize suas tarefas**
   - Marque atividades urgentes como "alta prioridade"
   - Use o calendário para visualizar prazos

3. **Mantenha-se consistente**
   - Acesse o sistema diariamente
   - Atualize o status das atividades conforme avança

---

## 🎯 Funcionalidades Principais

✅ Sistema de autenticação completo (cadastro + login)
✅ Gerenciamento de atividades por usuário
✅ Timer Pomodoro personalizável
✅ Calendário de atividades
✅ Sistema de notificações
✅ Proteção de rotas (apenas usuários logados)
✅ Navegação integrada entre páginas
✅ Interface responsiva e moderna

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique o [GUIA_DE_INSTALACAO.md](./GUIA_DE_INSTALACAO.md)
2. Confira os logs do backend no terminal
3. Abra o Console do navegador (F12) para ver erros do frontend

---

**Desenvolvido para ajudar estudantes a se organizarem melhor! 📚**
