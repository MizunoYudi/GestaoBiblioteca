"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    static instance;
    constructor() {
        this.criarTabela();
    }
    ;
    async criarTabela() {
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Categoria_Livro (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL
            );
        `;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Categoria Livro criada: ', resultado);
        }
        catch (err) {
            console.log("Erro ao criar a tabela Categoria Livro: ", err);
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    async buscarCategorias() {
        const query = `
            select * from biblioteca.Categoria_Livro;
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultado;
    }
    async verificarCategoria(id) {
        const query = `
            select * from biblioteca.Categoria_livro where id = ?;
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        if (resultado[0] != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
