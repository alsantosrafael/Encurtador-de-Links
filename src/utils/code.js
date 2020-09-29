/**
 * Função que gera Id para uma URL encurtada
 */
const geraId = () => Math.random().toString(36).substring(2, 9);
module.exports = geraId;
