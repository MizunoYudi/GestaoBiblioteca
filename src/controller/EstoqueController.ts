import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoqueService";

const estoqueService = new EstoqueService();

export class EstoqueController {
    novoExemplar(req: Request, res: Response){
        try{
            const novoExemplar = estoqueService.cadastrarExemplar(req.body);
            res.status(201).json({
                mensagem: "Exemplar cadastrado!",
                Exemplar: novoExemplar
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    exibirExemplares(req: Request, res: Response){
        try{
            const exemplares = estoqueService.listarExemplares();
            res.status(200).json({
                exemplares
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    filtrarExemplarPorId(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            const exemplar = estoqueService.filtrarPorId(id);
            res.status(200).json({
                mensagem: "Exemplar encontrado!",
                exemplar: exemplar
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    atualizarDiponibilidade(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            const exemplar = estoqueService.atualizarDisponibilidade(req.body.disponivel, id);
            if(!req.body.disponivel){
                res.status(401).json({
                    Status: "Error", 
                    mensagem: "Insira a disponibilidade para poder altera-la"
                });
            }
            res.status(200).json({
                mensagem: "Disponivilidade do exemplar atualizada com sucesso!",
                exemplar: exemplar
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }

    apagarExemplar(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            estoqueService.removerExemplar(id);
            res.status(200).json({
                mensagem: "Exemplar removido com sucesso!"
            });
        } catch (e: any) {
            res.status(400).json({ Status: "Error", mensagem: e.message });
        }
    }
}