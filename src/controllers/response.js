const response = (ctx, code, dados) => {
	const status = code >= 200 && code <= 399 ? 'sucesso' : 'ero';
	ctx.status = code;
	ctx.body = {
		status,
		dados,
	};
};

module.exports = response;
