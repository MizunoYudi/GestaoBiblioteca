import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EstoqueRepository } from "./EstoqueRepository";
import { LivroRepository } from "./LivroRepository";
import { UsuarioRepository } from "./UsuarioRepository";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private usuarioRepository = UsuarioRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();

    private constructor() { };

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }


    private async criarTabela() {
        const query = `
                    CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        usuario_id INT NOT NULL,
                        estoque_id INT NOT NULL,
                        data_emprestimo DATE NOT NULL
                        data_devolucao DATE NOT NULL,
                        data_entrega DATE,
                        dias_atraso INT,
                        suspensao_ate DATE,
                        foreign key(usuario_id) references biblioteca.Usuario(id),
                        foreign key(estoque_id) references biblioteca.Estoque(id)
                    );
                `;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Emprestimo criada: ', resultado);
        } catch (err: any) {
            console.log("Erro ao criar a tabela Emprestimo: ", err);
        }
    }

    async inserirEmprestimo(emprestimo: EmprestimoEntity) {
        const query = `
            insert into biblioteca.Emprestimo(usuario_id, estoque_id, data_emprestimo, data_devolucao)
                values(?, ?, ?, ?, ?, ?);
        `;
        const resultado = await executarComandoSQL(query, [emprestimo.usuario_id, emprestimo.estoque_id, emprestimo.data_emprestimo, emprestimo.data_devolucao]);
        console.log("Emprestimo inserido com sucesso: ", resultado);
        return new EmprestimoEntity(emprestimo.usuario_id, emprestimo.estoque_id, emprestimo.data_emprestimo, emprestimo.data_devolucao, resultado.insertId);
    }

    async buscarEmprestimos() {
        const query = `
            select * from biblioteca.Emprestimo
        `
        const resultado = await executarComandoSQL(query, []);
        const emprestimos: EmprestimoEntity[] = [];
        for (let i = 0; i < resultado.length; i++) {
            const { usuario_id, estoque_id, data_emprestimo, data_devolucao, id, data_entrega, dias_atraso, suspensao_ate } = resultado[i];
            emprestimos.push(new EmprestimoEntity(usuario_id, estoque_id, data_emprestimo, data_devolucao, id, data_entrega, dias_atraso, suspensao_ate));
        }
        return emprestimos;
    }

    async buscarEmprestimoId(id: number) {
        const query = `
            select * from biblioteca.Emprestimo where id = ?
        `
        const resultado = await executarComandoSQL(query, [id]);
        if (resultado[0] != undefined) {
            const { usuario_id, estoque_id, data_emprestimo, data_devolucao, id, data_entrega, dias_atraso, suspensao_ate } = resultado[0];
            return new EmprestimoEntity(usuario_id, estoque_id, data_emprestimo, data_devolucao, id, data_entrega, dias_atraso, suspensao_ate);
        } else {
            throw new Error("Estoque não encontrado");
        }
    }

    async buscarEmprestimosAtivos() {
        const query = `
            select * from biblioteca.emprestimo 
            where 
                data_entrega is null and 
                CURDATE() > data_devolucao
        `
        const resultado = await executarComandoSQL(query, []);
        const emprestimos: EmprestimoEntity[] = [];
        for (let i = 0; i < resultado.length; i++) {
            const { usuario_id, estoque_id, data_emprestimo, data_devolucao, id, data_entrega, dias_atraso, suspensao_ate } = resultado[i];
            emprestimos.push(new EmprestimoEntity(usuario_id, estoque_id, data_emprestimo, data_devolucao, id, data_entrega, dias_atraso, suspensao_ate));
        }
        return emprestimos;
    }

    async buscarUsuarioEmprestimo(usuario_id: number){
        return await this.usuarioRepository.buscarUsuarioId(usuario_id);
    }

    async buscarLivroEmprestimo(livro_id: number){
        return await this.livroRepository.buscarLivroId(livro_id);
    }

    async buscarEstoqueEmprestimo(estoque_id: number){
        return await this.estoqueRepository.buscarPorId(estoque_id);
    }

    async atualizarUsuarioMulta(status: string, usuario_id: number) {
        const query = `
            update biblioteca.Usuario
                set status = ?
            where id = ?
        `
        await executarComandoSQL(query, [status, usuario_id]);
    }

    async atualizarEmprestimoMulta(dias_atraso: number, suspensao_ate: Date) {
        const query = `
            update biblioteca.Emprestimo
                set dias_atraso = ?
                set suspensao_ate = ?
            where id = ?
        `
        await executarComandoSQL(query, [dias_atraso, suspensao_ate]);
    }

    async emprestarEstoque(estoque_id: number) {
        const resultado = await executarComandoSQL(`select * from biblioteca.Estoque where id = ?`, [estoque_id]);
        let quantidade_emprestada;
        if (resultado[0].quantidade_emprestada != undefined) {
            quantidade_emprestada = resultado[0].quantidade_emprestada + 1;
        } else {
            quantidade_emprestada = 1;
        }
        if (resultado[0].quantidade < resultado[0].quantidade_emprestada) {
            await executarComandoSQL(`update biblioteca.Estoque set quantidade_emprestada  = ? where id = ?`, [quantidade_emprestada, estoque_id])
            if (resultado[0].quantidade === resultado[0].quantidade_emprestada + 1) {
                await executarComandoSQL(`update biblioteca.Estoque set disponivel = false where id = ?`, [estoque_id])
            }
        }
    }

    async devolverEstoque(estoque_id: number) {
        const query = `
            select * from biblioteca.Estoque where id = ?
        `;
        const resultado = await executarComandoSQL(query, [estoque_id]);
        const quantidade = resultado[0].quantidade_emprestada - 1;
        executarComandoSQL(`update biblioteca.estoque set quantidade_emprestada = ? where id = ?`, [quantidade, estoque_id]);
    }

    /*buscarEstoqueEmprestimoAtivo(estoque_id: number) {
        const estoque = this.emprestimoList.filter(e => e.estoque_id == estoque_id);
        if (estoque.filter(e => e.data_entrega == undefined).length != 0) {
            return true;
        } else {
            return false;
        }
    }*/

    async registrarDevolucao(entrega: Date, atraso: number, suspensao: Date, id: number) {
        const query = `
                    update biblioteca.Emprestimo
                        set data_entrega = ?,
                        set dias_atraso = ?,
                        set suspensao_ate = ?,
                    where id = ?
                `
        await executarComandoSQL(query, [entrega, atraso, suspensao, id]);
        return await this.buscarEmprestimoId(id);
    }
}