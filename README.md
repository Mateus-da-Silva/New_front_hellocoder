# HelloCoder - Sistema de Gerenciamento de Estudos

Sistema completo para estudantes gerenciarem suas atividades acadêmicas, com timer Pomodoro, calendário, notificações e sistema de revisões.

## Tecnologias Utilizadas

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Design responsivo e moderno
- Integração com API REST

### Backend
- Node.js + Express
- MySQL (Banco de Dados)
- API RESTful
- CORS habilitado

## Funcionalidades

- Cadastro e gerenciamento de atividades
- Timer Pomodoro para sessões de estudo
- Calendário de atividades
- Sistema de notificações
- Controle de revisões
- Perfil de usuário
- Estatísticas de estudo

## Como Usar

### Instalação Rápida

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/New_front_hellocoder.git
   cd New_front_hellocoder
   ```

2. **Siga o guia completo de instalação:**

   Leia o arquivo [GUIA_DE_INSTALACAO.md](GUIA_DE_INSTALACAO.md) para instruções detalhadas.

### Iniciar o Sistema

1. **Inicie o Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Abra o Frontend:**
   - Use um servidor local ou abra `Pages/Atividades/index.html` no navegador

## Estrutura do Projeto

```
New_front_hellocoder/
├── backend/              # API Node.js + Express
│   ├── config/           # Configurações
│   ├── controllers/      # Lógica de negócio
│   ├── database/         # Scripts SQL
│   ├── models/           # Models do banco
│   ├── routes/           # Rotas da API
│   └── README.md         # Documentação da API
│
├── Pages/                # Todas as páginas do frontend
│   ├── Atividades/       # Gerenciamento de atividades
│   ├── Pomodoro/         # Timer Pomodoro
│   ├── calendario/       # Calendário de estudos
│   ├── Notificacoes/     # Sistema de notificações
│   ├── Revisoes/         # Controle de revisões
│   ├── Home1/            # Página inicial
│   ├── Login/            # Tela de login
│   ├── Cadastro/         # Tela de cadastro
│   └── Perfil_usu/       # Perfil do usuário
│
└── assets/               # Recursos (imagens, ícones, áudio)
```

## Documentação

- [Guia de Instalação Completo](GUIA_DE_INSTALACAO.md)
- [Documentação da API](backend/README.md)

## Endpoints Principais da API

```
GET    /api/atividades              - Lista todas as atividades
GET    /api/atividades/hoje         - Atividades de hoje
GET    /api/atividades/ontem        - Atividades de ontem
POST   /api/atividades              - Cria nova atividade
PUT    /api/atividades/:id          - Atualiza atividade
DELETE /api/atividades/:id          - Deleta atividade
PATCH  /api/atividades/:id/concluir - Marca como concluída
```

## Requisitos

- Node.js (v14+)
- MySQL (v5.7+)
- Navegador moderno

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto é de código aberto para fins educacionais.

---

**Desenvolvido para ajudar estudantes a se organizarem melhor!**
