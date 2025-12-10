# 📋 Guia de Uso - Sistema de Atividades

## 🎯 Funcionalidades Implementadas

### 1. **Criar Atividade (Home)**
Na página inicial, você encontrará um botão **"Criar Atividade"** no canto superior direito.

**Como usar:**
1. Acesse a Home: `http://localhost:8000/Pages/Home1/index.html`
2. Clique no botão verde **"Criar Atividade"**
3. Preencha o formulário:
   - **Título** (obrigatório): Nome da atividade
   - **Matéria** (obrigatório): Disciplina relacionada
   - **Descrição** (opcional): Detalhes adicionais
   - **Data de Entrega** (obrigatório): Quando deve ser entregue
   - **Hora** (opcional): Horário específico
   - **Tempo Estimado** (opcional): Ex: "1hr", "30min"
   - **Prioridade**: Baixa, Média ou Alta
4. Clique em **"Salvar Atividade"**
5. A atividade será salva no banco de dados

### 2. **Visualizar Atividades**
As atividades criadas aparecem automaticamente na página de Atividades.

**Como acessar:**
1. Na sidebar (menu lateral), clique em **"Página Inicial"** para abrir o submenu
2. Clique em **"Atividades"**
3. Ou acesse diretamente: `http://localhost:8000/Pages/Atividades/index.html`

**Organização:**
- **Agendado para hoje**: Atividades com data de entrega para o dia atual (status pendente)
- **Estudado hoje**: Atividades marcadas como concluídas hoje
- **Estudado ontem**: Atividades concluídas ontem

### 3. **Ver Detalhes da Atividade**
**Como usar:**
1. Na página de Atividades, clique em qualquer **card de atividade**
2. Um modal será aberto mostrando:
   - Matéria
   - Título
   - Descrição (se houver)
   - Data de Entrega
   - Hora (se houver)
   - Tempo Estimado (se houver)
   - Prioridade (com cor: Verde=Baixa, Amarelo=Média, Vermelho=Alta)
   - Status (Pendente ou Concluída)

### 4. **Editar Atividade**
**Como usar:**
1. Abra os detalhes da atividade (clique no card)
2. Clique no botão azul **"Editar"**
3. Modifique os campos desejados
4. Clique em **"Salvar Alterações"**
5. A atividade será atualizada

### 5. **Marcar como Concluída**
**Como usar:**
1. Abra os detalhes de uma atividade **pendente**
2. Clique no botão verde **"Marcar como Concluída"**
3. Confirme a ação
4. A atividade mudará para o status "Concluída"
5. Ela aparecerá na seção "Estudado hoje"

### 6. **Excluir Atividade**
**Como usar:**
1. Abra os detalhes da atividade
2. Clique no botão vermelho **"Excluir"**
3. Confirme a exclusão (ação irreversível)
4. A atividade será removida permanentemente

## 🎨 Navegação pelo Menu

### Sidebar (Menu Lateral)
**Página Inicial** (com submenu):
- Clique para abrir/fechar o submenu
- **Atividades**: Vai para a página de atividades
- **Meu Usuário**: Vai para o perfil do usuário
- **Pomodoro**: Vai para o timer Pomodoro

**Outros menus** (clique direto):
- **Calendário**: Visualização de calendário
- **Revisões**: Página de revisões
- **Notificações**: Alertas e notificações

## 🔧 Configuração do Backend

Certifique-se de que o backend está rodando:

```bash
cd backend
npm install
node server.js
```

O backend deve estar rodando em: `http://localhost:3000`

## 📊 Estrutura de Dados

### Campos da Atividade:
- **id**: Identificador único (gerado automaticamente)
- **usuario_id**: ID do usuário (padrão: 1)
- **titulo**: Nome da atividade
- **materia**: Disciplina/Matéria
- **descricao**: Descrição detalhada (opcional)
- **data_entrega**: Data de entrega (YYYY-MM-DD)
- **hora_entrega**: Hora de entrega (HH:MM)
- **tempo_estimado**: Tempo estimado para conclusão
- **prioridade**: baixa | media | alta
- **status**: pendente | concluida
- **created_at**: Data de criação (automático)
- **updated_at**: Data de atualização (automático)

## 🐛 Resolução de Problemas

### Problema: Sidebar não abre o submenu
**Solução**: Verifique se o JavaScript está carregado corretamente. Abra o console do navegador (F12) e veja se há erros.

### Problema: Atividade não aparece após criar
**Solução**:
1. Verifique se o backend está rodando
2. Abra o console do navegador (F12) e veja se há erros de conexão
3. Confirme que a URL da API está correta: `http://localhost:3000/api`

### Problema: Erro ao editar/excluir atividade
**Solução**: Verifique se o backend tem as rotas configuradas corretamente:
- PUT `/api/atividades/:id` para editar
- DELETE `/api/atividades/:id` para excluir
- PUT `/api/atividades/:id/concluir` para marcar como concluída

## 🎯 Funcionalidades Futuras (Sugestões)

- [ ] Filtros por matéria, prioridade, status
- [ ] Busca de atividades
- [ ] Notificações de prazos próximos
- [ ] Anexar arquivos às atividades
- [ ] Comentários e anotações
- [ ] Estatísticas e relatórios
- [ ] Integração com calendário
- [ ] Compartilhamento de atividades

---

**Desenvolvido com Claude Code** 🤖
