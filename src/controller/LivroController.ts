import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

const livroService = new LivroService();

export class LivroController{
    novoLivro(req: Request, res: Response){
        try{
            const novoLivro = livroService.cadastrarLivro(req.body);
            res.status(201).json({
                mensagem: "Livro cadastrado com sucesso!",
                livro: novoLivro
            });
        } catch(e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message});
        }
    }
}