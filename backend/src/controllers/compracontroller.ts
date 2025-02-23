import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';


const prisma = new PrismaClient();

class CompraController {
  // Create Compra
  async createCompra(req: Request, res: Response) {
    const { valor_total, produtos_comprados, status_compra, forma_pgto, id_usuario } = req.body;
    try {
      const newCompra = await prisma.compra.create({
        data: {
          valor_total,
          produtos_comprados,
          status_compra,
          forma_pgto,
          id_usuario,
        },
      });
      res.status(201).json(newCompra);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar compra' });
    }
  }

  // Get all Compras
  async getAllCompras(req: Request, res: Response) {
    try {
      const compras = await prisma.compra.findMany();
      res.status(200).json(compras);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar compras' });
    }
  }

  // Get a single Compra by ID
  async getCompraById(req: Request, res: Response) {
    const { id_com } = req.params;
    try {
      const compra = await prisma.compra.findUnique({
        where: { id_com: Number(id_com) },
      });
      if (compra) {
        res.status(200).json(compra);
      } else {
        res.status(404).json({ error: 'Compra não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar compra' });
    }
  }

  // Update Compra
  async updateCompra(req: Request, res:Response) {
    const { id_com } = req.params;
    const { valor_total, produtos_comprados, status_compra, forma_pgto, id_usuario } = req.body;
    try {
      const updatedCompra = await prisma.compra.update({
        where: { id_com: Number(id_com) },
        data: {
          valor_total,
          produtos_comprados,
          status_compra,
          forma_pgto,
          id_usuario,
        },
      });
      res.status(200).json(updatedCompra);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar compra' });
    }
  }

  // Delete Compra
  async deleteCompra(req: Request, res: Response) {
    const { id_com } = req.params;
    try {
      await prisma.compra.delete({
        where: { id_com: Number(id_com) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar compra' });
    }
  }
}

export default new CompraController();
