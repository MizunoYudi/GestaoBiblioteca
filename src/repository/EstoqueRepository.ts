import { executarComandoSQL } from "../database/mysql";
import { EstoqueEntity } from "../model/entity/EstoqueEntity";
import { EmprestimoRepository } from "./EmprestimoRepository";

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private emprestimoRepository = EmprestimoRepository.getInstance();

    private constructor() { }

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance
    }
    
    private async criarTabela() {
        const query = `
                CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    livro_id int NOT NULL,
                    quantidade int NOT NULL,
                    quantidade_emprestada int,
                    disponivel boolean NOT NULL,
                    foreign key(livro_id) references bilbioteca.livro(id),
                    unique(livro_id)
                );
            `;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Estoque criada: ', resultado);
        } catch (err: any) {
            console.log("Erro ao criar a tabela Estoque: ", err);
        }
    }

    async inserirExemplar(exemplar: EstoqueEntity) {
        const query = `
            insert into bilbioteca.Estoque(livro_id, quantidade, disponivel)
                values(?, ?, ?);
        `;
        const resultado = await executarComandoSQL(query, [exemplar.livro_id, exemplar.quantidade, exemplar.disponivel]);
        console.log("Exemplar Inserido com sucesso: ", resultado);
        const estoque = new EstoqueEntity(exemplar.livro_id, exemplar.quantidade, resultado.insertId, exemplar.disponivel);
        return estoque;
    }

    async buscarExemplares() {
        const query = `
            select * from biblioteca.Estoque where disponivel = true
        `
        const resultado = await executarComandoSQL(query, []);
        const estoque: EstoqueEntity[] = [];
        for (let i = 0; i < resultado.length; i++) {
            const { id, livro_id, quantidade, quantidade_emprestada, disponivel } = resultado[i];
            estoque.push(new EstoqueEntity(livro_id, quantidade, id, disponivel, quantidade_emprestada));
        }
        return estoque;
    }

    async buscarEstoqueLivro(livro_id: number) {
        const query = `
            select * from estoque where livro_id = ?
        `
        const resultado = await executarComandoSQL(query, [livro_id]);
        if(resultado[0] != undefined){
            const { id, quantidade, quantidade_emprestada, disponivel } = resultado[0];
            return new EstoqueEntity(livro_id, quantidade, id, disponivel, quantidade_emprestada);
        } else {
            throw new Error("Estoque não encontrado");
        }
    }

    async buscarPorId(id: number) {
        const query = `
            select * from biblioteca.estoque where id = ?
        `
        const resultado = await executarComandoSQL(query, [id]);
        if(resultado[0] != undefined){
            const { livro_id, quantidade, quantidade_emprestada, disponivel } = resultado[0];
            return new EstoqueEntity(livro_id, quantidade, id, disponivel, quantidade_emprestada);
        } else {
            throw new Error("Estoque não encontrado");
        }
    }

    async alterarExemplar(disponivel: boolean, id: number) {
        const query = `
            update biblioteca.Estoque
                set disponivel = ?
            where id = ?
        `;
        const resultado = await executarComandoSQL(query, [disponivel, id]);
        return await this.buscarPorId(id);
    }

    async excluirExemplar(id: number) {
        const query = `
            delete from bilbioteca.Estoque where id = ?;
        `;
        const resultado = await executarComandoSQL(query, [id]);
        console.log("Estoque excluido com sucesso: ", resultado);
    }

    async existeEmprestimosAtivos(estoque_id: number){
        const query = `
            select * from bilbioteca.Emprestimo where estoque_id = ? and data_entrega is null
        `;
        const resultado = await executarComandoSQL(query, [estoque_id]);
        if(resultado[0] != undefined){
            return true;
        } else {
            return false;
        }
    }
}