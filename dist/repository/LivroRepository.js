"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const mysql_1 = require("../database/mysql");
const LivroEntity_1 = require("../model/entity/LivroEntity");
class LivroRepository {
    static instance;
    constructor() {
        this.criarTabela();
    }
    ;
    async criarTabela() {
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Livro (
                id INT AUTO_INCREMENT PRIMARY KEY,
                titulo VARCHAR(80) NOT NULL,
                autor VARCHAR(80) NOT NULL,
                edicao VARCHAR(80) NOT NULL,
                editora VARCHAR(80) NOT NULL,
                isbn VARCHAR(30) NOT NULL,
                categoria_id INT NOT NULL,
                foreign key (categoria_id) references biblioteca.Categoria_livro(id),
                unique(isbn),
                unique(autor),
                unique(edicao),
                unique(editora)
            );
        `;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Livro criada: ', resultado);
        }
        catch (err) {
            console.log("Erro ao criar a tabela Livro: ", err);
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    async inserirLivro(livro) {
        const query = `
            insert into biblioteca.Livro(titulo, autor, edicao, editora, isbn, categoria_id)
                values(?, ?, ?, ?, ?, ?);
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [livro.titulo, livro.autor, livro.edicao, livro.editora, livro.isbn, livro.categoria_id]);
        console.log("Livro inserido com sucesso: ", resultado);
        return new LivroEntity_1.LivroEntity(livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoria_id, resultado.insertId);
    }
    async buscarLivros() {
        const query = `
            select * from biblioteca.Livro;
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        const livros = [];
        for (let i = 0; i < resultado.length; i++) {
            const { titulo, autor, edicao, editora, isbn, categoria_id, id } = resultado[i];
            livros.push(new LivroEntity_1.LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id, id));
        }
        return livros;
    }
    async buscarLivroIsbn(isbn) {
        const query = `
            select * from biblioteca.livro where isbn = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
        const { titulo, autor, edicao, editora, categoria_id, id } = resultado[0];
        return new LivroEntity_1.LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id, id);
    }
    async buscarLivroId(id) {
        const query = `
            select * from biblioteca.livro where id = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        const { titulo, autor, editora, edicao, isbn, categoria_id } = resultado[0];
        return new LivroEntity_1.LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id, id);
    }
    async alterarLivro(titulo, autor, editora, edicao, categoria_id, isbn) {
        const query = `
            update biblioteca.Livro 
                set titulo = ?,
                set autor = ?,
                set editora = ?,
                set edicao = ?,
                set categoria_id = ?
            where isbn = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [titulo, autor, editora, edicao, categoria_id, isbn]);
        console.log("Livro atualizado com sucesso: ", resultado);
        return new LivroEntity_1.LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id);
    }
    async existeSemelhante(autor, editora, edicao) {
        const query = `
            select * from biblioteca.livro
            where autor = ? and editora = ? and edicao = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [autor, editora, edicao]);
        if (resultado[0] != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    async excluirLivro(isbn) {
        const query = `
        delete from biblioteca.Livro where isbn = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
        console.log("Livro excluido com sucesso: ", resultado);
    }
    async buscarEstoqueLivro(livro_id) {
        const query = `
            select * from biblioteca.estoque where livro_id = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [livro_id]);
        if (resultado[0] != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.LivroRepository = LivroRepository;
