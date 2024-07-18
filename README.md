# Futebol-clube

No Futebol-clube, foi desenvolvido um back-end dockerizado, o desenvolvimento respeitou regras de negócio providas no projeto e a API consegue ser consumida por um front-end já provido nesse projeto.

Neste projeto uso o **node.js** para a criação de uma **API REST** com um **CRUD**, utilizo **MySQL** para modelar dados atravez do **ORM Sequelize**.

## Rodando com Docker

Primeiro instale as dependências:

`````` bash
npm install
``````
Execute o compose para a aplicação funcionar:

`````` bash
npm run compose:up
``````

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado sendo renderizado no front-end.

Tambem é possivel acessar a **API** fazendo Download deste arquivo, onde esta documentado as rotas.

* [Futebol-clube.postman](https://drive.google.com/file/d/1GiYTVqUo15sAScWuIShoSbSt5wuY5zLw/view?usp=drive_link)

Importe na ferramenta do postmam e faça as requisições.

### Considerações

* ##### É importante destacar que a estrutura base do projeto foi criada pela trybe como pode ser visto no primeiro commit “Initial commit" be41f04a33d4b3321342e92bc42a222d1f3f59cf.
* ##### A partir do commit "feat: pré reqs, criando DockerFile", o código foi desenvolvido por mim.
