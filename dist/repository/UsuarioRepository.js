"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
const UsuarioEntity_1 = require("../model/entity/UsuarioEntity");
class UsuarioRepository {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    constructor() {
        this.criarTabela();
    }
    async criarTabela() {
        const query = `
                CREATE TABLE IF NOT EXISTS biblioteca.Usuario (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nome VARCHAR(80) NOT NULL,
                    cpf VARCHAR(11) NOT NULL,
                    status VARCHAR(20) NOT NULL,
                    categoria_id int NOT NULL,
                    curso_id int NOT NULL,
                    foreign key(categoria_id) references biblioteca.categoria_usuario(id),
                    foreign key(curso_id) references biblioteca.curso(id),
                    unique(cpf)
                );
            `;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Usuario criada: ', resultado);
        }
        catch (err) {
            console.log("Erro ao criar a tabela Usuario: ", err);
        }
    }
    async inserirUsuario(usuario) {
        const query = `
            insert into biblioteca.Usuario(titulo, autor, edicao, editora, isbn, categoria_id)
                values(?, ?, ?, ?, ?, ?);
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [usuario.nome, usuario.cpf, usuario.status, usuario.categoria_id, usuario.curso_id]);
        console.log("Usuario inserido com sucesso: ", resultado);
        return new UsuarioEntity_1.UsuarioEntity(usuario.nome, usuario.cpf, usuario.categoria_id, usuario.curso_id, resultado.insertId, usuario.status);
    }
    async buscarUsuarios() {
        const query = `
            select * from biblioteca.usuario
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
        const usuarios = [];
        for (let i = 0; i < resultado.length; i++) {
            const { nome, cpf, categoria_id, curso_id, id, status } = resultado[i];
            usuarios.push(new UsuarioEntity_1.UsuarioEntity(nome, cpf, categoria_id, curso_id, id, status));
        }
        return usuarios;
    }
    async buscarUsuarioCPF(cpf) {
        const query = `
            select * from biblioteca.usuario where cpf = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf]);
        const { nome, categoria_id, curso_id, id, status } = resultado[0];
        return new UsuarioEntity_1.UsuarioEntity(nome, cpf, categoria_id, curso_id, id, status);
    }
    async buscarUsuarioId(id) {
        const query = `
            select * from biblioteca.usuario where id = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
        const { nome, categoria_id, curso_id, cpf, status } = resultado[0];
        return new UsuarioEntity_1.UsuarioEntity(nome, cpf, categoria_id, curso_id, id, status);
    }
    async alterarUsuario(nome, status, categoria_id, curso_id, cpf) {
        const query = `
                    update biblioteca.Usuario
                        set nome = ?,
                        set status = ?,
                        set categoria_id = ?,
                        set curso_id = ?,
                        set categoria_id = ?
                    where cpf = ?
                `;
        await (0, mysql_1.executarComandoSQL)(query, [nome, status, categoria_id, curso_id, categoria_id, cpf]);
        const usuario = await this.buscarUsuarioCPF(cpf);
        return usuario;
    }
    async excluirUsuario(cpf) {
        const query = `
            delete from biblioteca.Usuario where cpf = ?
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf]);
        console.log("Usuario excluido com sucesso: ", resultado);
    }
    async existeEmprestimosAtivos(usuario_id) {
        const query = `
            select * from biblioteca.Emprestimo where usuario_id = ? and data_entrega is null
        `;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [usuario_id]);
        if (resultado[0] != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.UsuarioRepository = UsuarioRepository;
