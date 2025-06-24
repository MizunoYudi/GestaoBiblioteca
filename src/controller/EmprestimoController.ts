import { Request, Response } from "express";
import { EmprestimoService } from "../service/EmprestimoService";

const emprestimoService = new EmprestimoService();

export class EmprestimoController {
    novoEmprestimo(req: Request, res: Response) {
        try {
            const novoEmprestimo = emprestimoService.cadastrarEmprestimo(req.body);
            res.status(201).json({
                mensagem: "Emprestimo cadastrado com sucesso!",
                emprestimo: novoEmprestimo
            })
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    exibirEmprestimos(req: Request, res: Response) {
        try {
            const emprestimos = emprestimoService.listarEmprestimos();
            res.status(200).json({
                emprestimos
            })
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    atualizarEmprestimo(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            emprestimoService.atualizarEmprestimo(id);
            res.status(200).json({
                mensagem: "Emprestimo retornado!"
            })
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}