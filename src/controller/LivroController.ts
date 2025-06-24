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

    exibirLivros(req: Request, res: Response) {
        try {
            let livros;

            if (req.query["titutlo"]) {
                livros = livroService.listarLivros(1, req.query.titulo);
            } else if (req.query["autor"]) {
                livros = livroService.listarLivros(2, req.query.autor);
            } else if (req.query["editora"]) {
                livros = livroService.listarLivros(3, req.query.editora);
            } else if (req.query["edicao"]) {
                livros = livroService.listarLivros(4, req.query.edicao);
            } else {
                livros = livroService.listarLivros();
            }

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
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    apagarLivro(req: Request, res: Response) {
        try {
            livroService.removerLivro(req.params.isbn);
            res.status(200).json({
                mensagem: "Livro removido com sucesso!"
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}