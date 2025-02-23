import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, response } from 'express';

const prisma = new PrismaClient();

//função para verificar se será um usuário logado(true), ou visitante(false(default))
async function tipo_usuario(req:Request, res: Response, next: NextFunction) {

    try{
        const {email}= req.body 
        const usuario = await prisma.usuario.findUnique({
            where:
            { email: email}
        })

        if (usuario?.tipo_usuario){
            next()
        }else{
            return res
        }

    }catch(error: any){
        return res.status(500).json({message:error.message})
    }
    
}
