"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../config/auth"));
const prisma = new client_1.PrismaClient();
class UsuarioController {
    // Create Usuario
    async createUsuario(req, res) {
        const { email, name, senha, cpf, tipo_usuario, telefone } = req.body;
        const { hash, salt } = auth_1.default.generatePassword(senha);
        try {
            const newUsuario = await prisma.usuario.create({
                data: {
                    email,
                    name,
                    hash,
                    salt,
                    cpf,
                    tipo_usuario,
                    telefone,
                },
            });
            res.status(201).json(newUsuario);
        }
        catch (error) {
            res.status(400).json({ error: 'Erro ao criar usuário' });
        }
    }
    // Get all Usuarios
    async getAllUsuarios(req, res) {
        try {
            const usuarios = await prisma.usuario.findMany();
            res.status(200).json(usuarios);
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }
    // Get um só Usuario por ID
    async getUsuarioById(req, res) {
        const { id } = req.params;
        try {
            const usuario = await prisma.usuario.findUnique({
                where: { id: Number(id) },
            });
            if (usuario) {
                res.status(200).json(usuario);
            }
            else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }
    // Update Usuario
    async updateUsuario(req, res) {
        const { id } = req.params;
        const { email, name, hash, salt, cpf, tipo_usuario, telefone } = req.body;
        try {
            const updatedUsuario = await prisma.usuario.update({
                where: { id: Number(id) },
                data: {
                    email,
                    name,
                    hash,
                    salt,
                    cpf,
                    tipo_usuario,
                    telefone,
                },
            });
            res.status(200).json(updatedUsuario);
        }
        catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar usuário' });
        }
    }
    // Delete Usuario
    async deleteUsuario(req, res) {
        const { id } = req.params;
        try {
            await prisma.usuario.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const usuario = await prisma.usuario.findUnique({
                where: { email: email }
            });
            if (!usuario)
                return res.status(400).json({ message: "usuário não existe" });
            const { hash, salt } = usuario;
            if (!auth_1.default.checkPassword(password, hash, salt)) {
                return res.status(400).json({ message: "Senha incorreta" });
            }
            const token = auth_1.default.generateJWT(usuario);
            return res.status(201).json({ message: "Token enviado", token: token });
        }
        catch (error) {
            return res.status(500).json({ message: "Server Error" });
        }
    }
    async testeAutenticacao(req, res) {
        const email = req.user;
        if (!email)
            return res.status(401).json({ message: "Não autorizado" });
        return res.status(201).json({ message: "acesso autorizado" });
    }
}
exports.default = UsuarioController;
