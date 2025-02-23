"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProdutoController {
    // Create Produto
    async createProduto(req, res) {
        const { nome, descricao, preco, avaliacao, categoria, quantidade, id_cp } = req.body;
        try {
            const newProduto = await prisma.produto.create({
                data: {
                    nome,
                    descricao,
                    preco,
                    avaliacao,
                    categoria,
                    quantidade,
                    id_cp,
                },
            });
            res.status(201).json(newProduto);
        }
        catch (error) {
            res.status(400).json({ error: 'Erro ao criar produto' });
        }
    }
    // Get all Produtos
    async getAllProdutos(req, res) {
        try {
            const produtos = await prisma.produto.findMany();
            res.status(200).json(produtos);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    }
    // Get a single Produto by ID
    async getProdutoById(req, res) {
        const { id } = req.params;
        try {
            const produto = await prisma.produto.findUnique({
                where: { id: Number(id) },
            });
            if (produto) {
                res.status(200).json(produto);
            }
            else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }
    // Update Produto
    async updateProduto(req, res) {
        const { id } = req.params;
        const { nome, descricao, preco, avaliacao, categoria, quantidade, id_cp } = req.body;
        try {
            const updatedProduto = await prisma.produto.update({
                where: { id: Number(id) },
                data: {
                    nome,
                    descricao,
                    preco,
                    avaliacao,
                    categoria,
                    quantidade,
                    id_cp,
                },
            });
            res.status(200).json(updatedProduto);
        }
        catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar produto' });
        }
    }
    // Delete Produto
    async deleteProduto(req, res) {
        const { id } = req.params;
        try {
            await prisma.produto.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}
exports.default = ProdutoController;
