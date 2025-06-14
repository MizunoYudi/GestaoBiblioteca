import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

const livroService = new LivroService();

export class LivroController {
    novoLivro(req: Request, res: Response) {
        try {
            const novoLivro = livroService.cadastrarLivro(req.body);
            res.status(201).json({
                mensagem: "Livro cadastrado com sucesso!",
                livro: novoLivro
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    exibirLivros(res: Response) {
        try {
            const livros = livroService.listarLivros();
            res.status(200).json({
                livros
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    filtrarLivroPorIsbn(req: Request, res: Response) {
        try {
            const livro = livroService.filtrarPorISBN(req.params.isbn);
            res.status(200).json({
                mensagem: "Livro encontrado!",
                livro: livro
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    atualizarLivro(req: Request, res: Response) {
        try {
            const livro = livroService.atualizarLivro(req.body, req.params.isbn);
            res.status(200).json({
                mensagem: "Livro atualizado com sucesso!",
                livro_atualizado: livro
            });
        } catch (e: any){
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    apagarLivro(req: Request, res: Response) {
        try {
            livroService.removerLivro(req.params.isbn);
            res.status(200).json({
                mensagem: "Livro removido com sucesso!"
            });
        } catch(e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}