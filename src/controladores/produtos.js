const knex = require('../conexao');

const listarProdutos = async (req, res) => {
    // const { usuario } = req;
    // const { categoria } = req.query;

    try {

        // const listaProdutos = await knex('produtos').where({usuario_id: usuario.id}).where('categoria', 'ilike', `%${categoria}%`).debug()
        const listaProdutos = await knex('produtos')


        return res.status(200).json(listaProdutos);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message);
    }
}

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
    
        const listarProdutoUsuario = await knex('produtos')
        .where({usuario_id: usuario.id})
        .where({id})
        .debug()

        if(listarProdutoUsuario.length < 1){
            res.status(404).json({mensagem: 'Produto não encontrado'})
        }

        return res.status(200).json(listarProdutoUsuario);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message);
    }
}

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome) {
        return res.status(404).json('O campo nome é obrigatório');
    }

    if (!estoque) {
        return res.status(404).json('O campo estoque é obrigatório');
    }

    if (!preco) {
        return res.status(404).json('O campo preco é obrigatório');
    }

    if (!descricao) {
        return res.status(404).json('O campo descricao é obrigatório');
    }

    try {
   
        const novoProduto = {
            nome,
            estoque,
            preco,
            categoria,
            descricao,
            imagem,
            usuario_id: usuario.id
        }

        const inserirProduto = await knex('produtos').insert(novoProduto).returning('*').debug()

        if (inserirProduto < 1) {
            return res.status(400).json('O produto não foi cadastrado');
        }

        return res.status(200).json('O produto foi cadastrado com sucesso.');
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message);
    }
}

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
        return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
    }

    try {
    
        const localizaProduto = await knex('produtos').where({usuario_id: usuario.id}).where({id}).debug()

        if (localizaProduto.length < 1) {
            return res.status(404).json('Produto não encontrado');
        }

        const novoProduto = {
            nome,
            estoque,
            preco,
            categoria,
            descricao,
            imagem,
        }

        const inserirProduto = await knex('produtos').update(novoProduto).where({id}).where({usuario_id: usuario.id}).returning('*').debug()

        if (inserirProduto.length < 1) {
            return res.status(400).json('O produto não foi cadastrado');
        }


        return res.status(200).json('produto foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
    
        const localizaProduto = await knex('produtos').where({usuario_id: usuario.id}).where({id}).debug()

        if (localizaProduto.length < 1) {
            return res.status(404).json('Produto não encontrado');
        }

        const produtoExcluido = await knex('produtos').delete().where({usuario_id: usuario.id}).where({id}).debug()

        if (produtoExcluido.length < 1) {
            return res.status(400).json("O produto não foi excluido");
        }

        return res.status(200).json('Produto excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}