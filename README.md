
# Sistema Escolar - Mediotec

Este projeto foi desenvolvido como parte do curso de **Análise e Desenvolvimento de Sistemas**, no **3º período**, da **Faculdade Senac**.

É um sistema escolar desenvolvido para o gerenciamento acadêmico e administrativo do colégio técnico Mediotec. A aplicação foi criada utilizando **React** para o frontend, enquanto o backend foi implementado utilizando **Node.js** com **Express** e **PostgreSQL** como banco de dados relacional. O sistema permite o cadastro, edição e visualização de usuários, turmas, disciplinas e conceitos, além da emissão de comunicados.

![Página de Login](https://github.com/RafaelMoura11/frontend-mediotec/blob/src/images/loginpage.png)

## Funcionalidades Principais

### Gerenciamento de Usuários:
- **Coordenadores**:
  - Podem cadastrar, editar e remover alunos, professores, outros coordenadores.
  - Gerenciam as permissões de acesso.
- **Professores**:
  - Visualizam informações de seus alunos e as disciplinas associadas.

### Gerenciamento Acadêmico:
- **Cadastro de Turmas e Disciplinas**:
  - Coordenadores podem criar e organizar turmas e disciplinas.
  - Podem associar professores e alunos conforme necessário.
- **Registro de Conceitos**:
  - Professores podem lançar, editar e visualizar os conceitos dos alunos em suas respectivas disciplinas.

### Comunicações:
- **Emissão de Comunicados**:
  - Tanto coordenadores quanto professores podem criar e divulgar comunicados para alunos e turmas específicas.
  - Os comunicados podem incluir informações sobre eventos, alterações no cronograma e outras notificações importantes.

## Tecnologias Utilizadas

### Frontend:
- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **CSS** e **Framework de UI**: Para estilização (Bootstrap).

### Backend:
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js.
- **PostgreSQL**: Banco de dados relacional para armazenar as informações de usuários, turmas, disciplinas, conceitos e comunicados.

### Link para o repositório do Backend:
- [Backend do Sistema Escolar](https://github.com/amaliacnasc/api-mediotec)

## Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/RafaelMoura11/frontend-mediotec.git
   ```
   
2. **Instale as dependências do frontend**:
   ```bash
   cd projeto-sistema-escolar
   npm install
   npm install bootstrap
   ```

3. **Inicie o servidor de desenvolvimento do frontend**:
   ```bash
   npm start
   ```

4. **Backend**:
   - Acesse o repositório do backend [aqui](https://github.com/amaliacnasc/api-mediotec) e siga as instruções para configurar o servidor com **Node.js**, **Express**, e **PostgreSQL**.

5. **Acesse a aplicação**:
   Abra seu navegador e vá até `http://localhost:3000` para ver a aplicação rodando localmente.

## Contribuindo

Contribuições são bem-vindas! Se você tiver sugestões de melhoria, correções de bugs ou novas funcionalidades, abra um pull request ou uma issue.

1. **Fork** o repositório.
2. Crie um **branch** para sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Faça o **commit** das suas alterações:
   ```bash
   git commit -m "Adiciona nova feature"
   ```
4. **Push** para o branch:
   ```bash
   git push origin feature/nome-da-feature
   ```
5. Abra um **Pull Request**.
