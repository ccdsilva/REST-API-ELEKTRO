const express = require('express');
const UsuarioController = require('./controllers/UsuarioController'); 
const CompraController = require('./controllers/CompraController'); 
const ProdutoController = require('./controllers/ProdutoController');

const router = express.Router();

// Rotas para Usuario
router.post('/usuario', UsuarioController.createUsuario);
router.get('/usuarios', UsuarioController.getAllUsuarios);
router.get('/usuario/:id', UsuarioController.getUsuarioById);
router.put('/usuario/:id', UsuarioController.updateUsuario);
router.delete('/usuario/:id', UsuarioController.deleteUsuario);

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

