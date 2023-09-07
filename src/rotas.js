const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const produtos = require('./controladores/produtos');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

// cadastro de usuario
rotas.post('/usuarios', usuarios.cadastrarUsuario); //feito knex

// login
rotas.post('/login', login.login); //feito knex

// filtro para verificar usuario logado
// rotas.use(verificaLogin); //feito knex

// obter e atualizar perfil do usuario logado
rotas.get('/perfil', usuarios.obterPerfil); //Não precisa de Knex
rotas.put('/perfil', usuarios.atualizarPerfil); //feito knex

// crud de produtos
rotas.get('/produtos', produtos.listarProdutos);//feito knex
rotas.get('/produtos/:id', produtos.obterProduto);//feito knex
rotas.post('/produtos', produtos.cadastrarProduto); //feito knex
rotas.put('/produtos/:id', produtos.atualizarProduto);//feito knex
rotas.delete('/produtos/:id', produtos.excluirProduto); //feito knex

module.exports = rotas;