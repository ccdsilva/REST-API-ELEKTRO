import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
const prisma = new PrismaClient();
//import auth from "../config/auth";

class UsuarioController {
  // Create Usuario
  async createUsuario(req: Request, res: Response) {
    const { email, name, hash, salt, cpf, tipo_usuario, telefone } = req.body;
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
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar usuário' });
    }
  }

  // Get all Usuarios
  async getAllUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  // Get um só Usuario por ID
  async getUsuarioById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) },
      });
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  // Update Usuario
  async updateUsuario(req: Request, res: Response) {
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
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  // Delete Usuario
  async deleteUsuario(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.usuario.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}

module.exports = new UsuarioController();
