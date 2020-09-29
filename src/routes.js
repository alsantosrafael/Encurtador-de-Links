const Router = require('koa-router'); /* Pegando o pacote que cria rotas */
const { shorter } = require('./controllers/short.js');
const { redirect } = require('./controllers/short.js');

const router = new Router(); // Instanciando o Router

// Rotas
// criando rota do encurtador
router.post('/encurta', shorter);
// criando rota de usar o link encurtado e redirecionar para o site
router.get('/encurta/:id', redirect);

module.exports = router;
