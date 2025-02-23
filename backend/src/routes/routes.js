"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Router } from "express";
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//import UsuarioController from "../controllers/usuariocontroller";
//import CompraController from "../controllers/compracontroller";
//import ProdutoController from "../controllers/produtocontroller";
const UsuarioController = require('../controllers/usuariocontroller').default;
const CompraController = require('../controllers/compracontroller').default;
const ProdutoController = require('../controllers/produtocontroller').default;
// Rotas para Usuario
router.post('/usuario', UsuarioController.createUsuario);
router.get('/usuarios', UsuarioController.getAllUsuarios);
router.get('/usuario/:id', UsuarioController.getUsuarioById);
router.put('/usuario/:id', UsuarioController.updateUsuario);
router.delete('/usuario/:id', UsuarioController.deleteUsuario);
router.get("/usuario", passport_1.default.authenticate("jwt", { session: false }), UsuarioController.testeAutenticacao);
router.get("/login", UsuarioController.login);
// Rotas para Compra
router.post('/compra', CompraController.createCompra);
router.get('/compras', CompraController.getAllCompras);
router.get('/compra/:id_com', CompraController.getCompraById);
router.put('/compra/:id_com', CompraController.updateCompra);
router.delete('/compra/:id_com', CompraController.deleteCompra);
// Rotas para Produto
router.post('/produto', ProdutoController.createProduto);
router.get('/produtos', ProdutoController.getAllProdutos);
router.get('/produto/:id', ProdutoController.getProdutoById);
router.put('/produto/:id', ProdutoController.updateProduto);
router.delete('/produto/:id', ProdutoController.deleteProduto);
module.exports = router;
exports.default = router;
