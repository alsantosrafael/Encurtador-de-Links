const urls = [];
const geraId = require('../utils/code.js');
const response = require('./response.js');
// Funções
/**
 * Função que confere a existência de uma URL
 */
const existeUrl = (codigo) => {
	for (let i = 0; i < urls.length; i++) {
		return urls[i][codigo]; // acessando propriedade
	}
	return null;
};
/**
 * Função responsável por encurtar uma URL
 */
const shorter = (ctx) => {
	const { url } = ctx.request.body; // Pegando a url que o usuário inseriu no arquivo json
	if (!url) {
		response(ctx, 400, { mensagem: 'Pedido mal-formatado' });
	} else {
		const id = geraId();
		// inserindo no array que contem as urls convertidas e originais
		urls.push({ [id]: url });
		// Retornando mensagem de sucesso e alterando status
		response(ctx, 201, {
			urlOriginal: url,
			urlEncurtada: `localhost:1306/encurta/${id}`,
		});
	}
};

/**
 * Função responsável pelo redirect
 */
const redirect = (ctx) => {
	const urlInserida = ctx.params.id; // Acessando propriedade de id
	const urlOriginal = existeUrl(urlInserida);

	if (urlOriginal) {
		ctx.status = 301;
		ctx.redirect(urlOriginal);
	} else {
		response(ctx, 404, { mentagem: 'Recurso não encontrado' });
	}
};

module.exports = { shorter, redirect };
