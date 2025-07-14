"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const mysql_1 = require("../database/mysql");
const EstoqueEntity_1 = require("../model/entity/EstoqueEntity");
class EstoqueRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    async criarTabela() {
        const query = `
                CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    livro_id int NOT NULL,
                    quantidade int NOT NULL,
                    quantidade_emprestada int,
                    disponivel boolean NOT NULL,
                    foreign key(livro_id) references biblioteca.livro(id),
                    unique(livro_id)
                );
            `;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Estoque criada: ', resultado);
        }
        catch (err) {
            console.log("Erro ao criar a tabela Estoque: ", err);
        }
    }
    async inserirExemplar(exemplar) {
        const query = `
            insert into biblioteca.Estoque(livro_id, quantidade, disponivel)
                values(?, ?, ?);
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [exemplar.livro_id, exemplar.quantidade, exemplar.disponivel]);
        console.log("Exemplar Inserido com sucesso: ", resultado);
        const estoque = new EstoqueEntity_1.EstoqueEntity(exemplar.livro_id, exemplar.quantidade, resultado.insertId, exemplar.disponivel);
        return estoque;
    }
    async buscarExemplares() {
        const query = `
            select * from biblioteca.Estoque where disponivel = true
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        const estoque = [];
        for (let i = 0; i < resultado.length; i++) {
            const { id, livro_id, quantidade, quantidade_emprestada, disponivel } = resultado[i];
            estoque.push(new EstoqueEntity_1.EstoqueEntity(livro_id, quantidade, id, disponivel, quantidade_emprestada));
        }
        return estoque;
    }
    async buscarEstoqueLivro(livro_id) {
        const query = `
            select * from estoque where livro_id = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [livro_id]);
        if (resultado[0] != undefined) {
            const { id, quantidade, quantidade_emprestada, disponivel } = resultado[0];
            return new EstoqueEntity_1.EstoqueEntity(livro_id, quantidade, id, disponivel, quantidade_emprestada);
        }
        else {
            throw new Error("Estoque não encontrado");
        }
    }
    async buscarPorId(id) {
        const query = `
            select * from biblioteca.estoque where id = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado[0] != undefined) {
            const { livro_id, quantidade, quantidade_emprestada, disponivel } = resultado[0];
            return new EstoqueEntity_1.EstoqueEntity(livro_id, quantidade, id, disponivel, quantidade_emprestada);
        }
        else {
            throw new Error("Estoque não encontrado");
        }
    }
    async alterarExemplar(disponivel, id) {
        const query = `
            update biblioteca.Estoque
                set disponivel = ?
            where id = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [disponivel, id]);
        return await this.buscarPorId(id);
    }
    async excluirExemplar(id) {
        const query = `
            delete from biblioteca.Estoque where id = ?;
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        console.log("Estoque excluido com sucesso: ", resultado);
    }
    async existeEmprestimosAtivos(estoque_id) {
        const query = `
            select * from biblioteca.Emprestimo where estoque_id = ? and data_entrega is null
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [estoque_id]);
        if (resultado[0] != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.EstoqueRepository = EstoqueRepository;
