# Tarefas+

## 📖 Descrição

**Tarefas+** é um sistema de gerenciamento de tarefas desenvolvido com **Next.js**, **Firebase** e **NextAuth**. Este projeto foi criado para **aperfeiçoar meu conhecimento** em desenvolvimento web, explorando funcionalidades como autenticação, manipulação de dados em tempo real e renderização estática e dinâmica.

Com **Tarefas+**, os usuários podem:

- **Criar Tarefas**: Adicione e gerencie suas tarefas pessoais.
- **Privacidade Flexível**: Defina tarefas como públicas ou privadas.
- **Comentários Interativos**: Adicione e visualize comentários nas tarefas.
- **Compartilhamento Fácil**: Compartilhe tarefas específicas através de links personalizados.
- **Autenticação Segura**: Faça login com sua conta Google via **NextAuth**.

## 🚀 Tecnologias Utilizadas

- **Next.js**: Framework React para renderização estática e server-side.
- **Firebase Firestore**: Banco de dados NoSQL para armazenamento eficiente de dados.
- **NextAuth.js**: Implementação de autenticação segura.
- **TypeScript**: Tipagem estática para um código mais robusto.
- **React Hooks**: Gerenciamento de estado e efeitos de forma eficiente.
- **CSS Modules**: Estilização modular e escalável.

## 🛠️ Como Executar o Projeto

### 🔧 Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- Conta no **Firebase** para configurar o Firestore
- Credenciais de **Google OAuth** para autenticação

### 📦 Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/marcusvramos/tasks-plus-next
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd tasks-plus-next
   ```

3. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

4. Crie um `.env` na raiz do projeto e adicione:
   ```bash
    GOOGLE_CLIENT_ID=your_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=your_GOOGLE_CLIENT_SECRET
    NEXT_AUTH_URL=http://localhost:3000
    JWT_SECRET=your_jwt_secret
    NEXT_PUBLIC_URL=http://localhost:3000
   ```

### 🚀 Executando o Projeto

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

2. Abra o navegador e acesse:
    ```bash
    http://localhost:3000

    ```
