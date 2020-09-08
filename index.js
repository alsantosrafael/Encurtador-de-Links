
//Funções
const geraId = () => Math.random().toString(36).substring(2, 9)

const existeUrl = (codigo) => {
    for(let i = 0; i < urls.length; i++) {
        return urls[i][codigo] // acessando propriedade 
    }
    return null;
}
//Variáveis e requisições de bibliotecas
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const server = new Koa();
const urls = [];

//Conversor do JSON
server.use(bodyparser());
//criando servidor
server.use((ctx) => {
    //Aqui conferimos o caminho que o usuario está tentando fazer
    //Em seguida conferimos se o método usado é o correto para fazer uma edição
    //Se não for, exibe erro
    if(ctx.url.includes("/encurtador")) {
        if(ctx.method === "POST") {
            const url = ctx.request.body.url;//Pegando a url que o usuário inseriu no arquivo json
            if(!url) {
                ctx.status = 400;
                ctx.body = {
                    status: "Erro",
                    dados: {
                        mensagem: "Pedido mal-formatado"
                    }
                }
            } else {
                const id = geraId()
                //inserindo no array que contem as urls convertidas e originais
                urls.push({ [id]: url })
                //Retornando mensagem de sucesso e alterando status
                ctx.status = 201;
                ctx.body = {
                    status: 'Sucesso!',
                    dados: {
                        mensagem: 'Url encurtada com sucesso!',
                        url_original: url,
                        url_encurtada: "localhost:8081/" + id
                    }
                }
            }
        }
    } else if (ctx.method === "GET") {
        const url_inserida = ctx.url.split("/")[1]
        const url_original = existeUrl(url_inserida)
        if(url_original) {
            ctx.status = 301;
            ctx.redirect(url_original); 
        } else {
            ctx.status = 404
            ctx.body = {
            status: 'Erro',
            dados: {
                mensagem: 'Conteúdo não encontrado'
                }
            }
        }
    } else {
        ctx.status = 404
        ctx.body = {
            status: 'Erro',
            dados: {
                mensagem: 'Conteúdo não encontrado'
            }
        }
    }
})
//Liberando porta para o servidor
server.listen(8081, () => {
    console.log('Servidor rodando na porta 8081.')
})