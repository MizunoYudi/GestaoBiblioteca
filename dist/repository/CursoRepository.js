"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const mysql_1 = require("../database/mysql");
class CursoRepository {
    static instance;
    constructor() {
        this.criarTabela();
    }
    ;
    async criarTabela() {
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Curso (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(80) NOT NULL
            );
        `;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Curso criada: ', resultado);
        }
        catch (err) {
            console.log("Erro ao criar a tabela Curso: ", err);
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    async buscarCursos() {
        const query = `
            select * from biblioteca.Curso;
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        return resultado;
    }
    async verificarCurso(id) {
        const query = `
            select * from biblioteca.Curso where id = ?;
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
exports.CursoRepository = CursoRepository;
