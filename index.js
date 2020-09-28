//Variáveis e requisições de bibliotecas
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router = require("./src/routes.js"); //Instanciando o Router
const server = new Koa();

require('dotenv').config()
const PORT = process.env.PORT || 1306;
//Conversor do JSON
server.use(bodyparser());

//Permitindo as rotas a serem reconhecidas através do middleware
server.use(router.routes());

//Liberando porta para o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
