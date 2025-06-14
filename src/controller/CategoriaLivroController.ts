import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/CategoriaLivroService";

const categoriaLivroService = new CategoriaLivroService();

export class CategoriaLivroController{
    exibirCategoriaLivro(req: Request, res: Response){
        try{
            const categoria_livros = categoriaLivroService.listarCategoriaLivro();
            res.status(200).json({
                categoria_livros
            });
        } catch(e: any){
            res.status(400).json({Status: "Error", mensagem: e.message});
        }
    }
}