# Projeto Fullstack - Quadro Societário

Este projeto foi desenvolvido como parte de um estudo prático de desenvolvimento fullstack. A aplicação consiste em um backend desenvolvido em Symfony (PHP) e um frontend em React, permitindo o cadastro de empresas e seus respectivos quadros societários.

---

## Tecnologias Utilizadas

### Backend (Symfony)
- **PHP 8.1**: Linguagem de programação utilizada.
- **Symfony 6.4**: Framework PHP para desenvolvimento web (Última versão LTS).
- **Doctrine ORM**: Para mapeamento objeto-relacional e persistência de dados.
- **PostgreSQL (versão 17)**: Banco de dados relacional utilizado.
- **NelmioCorsBundle**: Para habilitar CORS e permitir comunicação com o frontend.
- **Symfony Security**: Para autenticação e permissionamento.

### Frontend (React)
- **Node.js 18.20.6**: Ambiente de execução JavaScript utilizado para gerenciar as dependências e scripts do frontend.
- **React 19**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material-UI (MUI)**: Biblioteca de componentes React para design.
- **Axios**: Cliente HTTP para consumir a API do backend.
- **React Router DOM**: Para gerenciamento de rotas no frontend.

---

## Estrutura do Projeto

### Backend
- **`src/Controller/`**: Contém os controladores da API.
- **`src/Entity/`**: Entidades do Doctrine (Empresa, Sócio, etc.).
- **`src/Repository/`**: Repositórios para acesso aos dados.
- **`src/Migrations/`**: Migrações do banco de dados.
- **`config/`**: Configurações do Symfony, incluindo rotas e serviços.
- **`public/`**: Ponto de entrada da aplicação (arquivo `index.php`).

### Frontend
- **`src/components/`**: Componentes React reutilizáveis.
- **`src/context/`**: Contextos React para gerenciamento de estado.
- **`src/routes/`**: Configuração das rotas.
- **`src/services/`**: Serviços para comunicação com a API.
- **`src/views/`**: Páginas da aplicação.

---

## Funcionalidades Implementadas

### Backend (Symfony)
- **Autenticação**:
  - Endpoints para login (`/api/usuarios/login`) e registro (`/api/usuarios/registrar`).
  - Geração e validação de tokens JWT.
- **Empresas**:
  - CRUD completo para empresas (`/api/empresas`).
  - Validação de dados e integração com PostgreSQL.
- **Sócios**:
  - CRUD completo para sócios (`/api/socios`).
  - Vinculação de sócios a empresas.

### Frontend (React)
- **Autenticação**:
  - Telas de login (`/login`) e registro (`/registrar`).
  - Armazenamento do token JWT no localStorage.
- **Dashboard**:
  - Página inicial (`/dashboard`) com resumo de dados.
  - Layout comum com barra de navegação e menu lateral.
- **Empresas**:
  - Listagem de empresas (`/empresas`).
  - Formulários para adicionar, editar e excluir empresas.
- **Sócios**:
  - Listagem de sócios (`/socios`).
  - Formulários para adicionar, editar e excluir sócios.
- **Proteção de Rotas**:
  - Rotas privadas protegidas pelo componente `PrivateRoute`.
  - Redirecionamento para `/login` se o usuário não estiver autenticado.
- **Redirecionamento**:
  - Rota `*` redireciona para `/` em caso de rotas inválidas.

---

## Como Executar o Projeto

### Pré-requisitos
- **PHP 8.1** ou superior.
- **Composer** (para gerenciamento de dependências do PHP).
- **Node.js 18** ou superior e **npm** (para o frontend).
- **PostgreSQL** (banco de dados).

---

### Passo a Passo

#### 1. Configuração do Backend (Symfony)

> 1. Clone o repositório  
>    ```bash
>    git clone https://github.com/PedroLucca/quadro-societario.git
>    cd quadro-societario/backend
>    ```

> 2. Instale as dependências:  
>    ```bash
>    composer install
>    ```

> 3. Configure o banco de dados:  
>    - Crie um banco de dados no PostgreSQL.  
>    - Atualize o arquivo `.env` com as credenciais do banco de dados:  
>      ```env
>      DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?serverVersion=17&charset=utf8"
>      ```

> 4. Execute as migrações:  
>    ```bash
>    php bin/console doctrine:migrations:migrate
>    ```

> 5. Inicie o servidor Symfony:  
>    ```bash
>    symfony server:start
>    ```
>    O backend estará disponível em `http://localhost:8000`.

---

#### 2. Configuração do Frontend (React)

> 1. Navegue até a pasta do frontend:  
>    ```bash
>    cd ../frontend
>    ```

> 2. Instale as dependências:  
>    ```bash
>    npm install
>    ```

> 3. Configure a URL da API:  
>    - No arquivo `src/services/api.js`, atualize a URL da API para apontar para o backend:  
>      ```javascript
>      const api = axios.create({
>        baseURL: 'http://localhost:8000/api', // URL do backend
>      });
>      ```

> 4. Inicie o servidor de desenvolvimento:  
>    ```bash
>    npm start
>    ```
>    O frontend estará disponível em `http://localhost:3000`.

---

## Contato

Caso tenha dúvidas, sugestões ou deseje trocar ideias:

- **Nome**: Pedro Lucca Monteiro Soares  
- **E-mail**: pedrolucca27@gmail.com  
- **LinkedIn**: [linkedin.com/in/pedro-lucca-dev](https://www.linkedin.com/in/pedro-lucca-dev/)

---

## Conclusão

Este projeto foi uma excelente oportunidade para estudar conceitos de desenvolvimento fullstack moderno, com foco em boas práticas, autenticação, relacionamentos complexos entre entidades e interfaces amigáveis. Ele pode servir como base para projetos mais robustos e profissionais no futuro.
