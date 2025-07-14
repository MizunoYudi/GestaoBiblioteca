import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export class UsuarioRepository {
    private static instance: UsuarioRepository;

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance
    }

    constructor() {
        this.criarTabela();
    }

    private async criarTabela() {
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
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Usuario criada: ', resultado);
        } catch (err: any) {
            console.log("Erro ao criar a tabela Usuario: ", err);
        }
    }


    async inserirUsuario(usuario: UsuarioEntity) {
        const query = `
            insert into biblioteca.Usuario(titulo, autor, edicao, editora, isbn, categoria_id)
                values(?, ?, ?, ?, ?, ?);
        `;
        const resultado = await executarComandoSQL(query, [usuario.nome, usuario.cpf, usuario.status, usuario.categoria_id, usuario.curso_id]);
        console.log("Usuario inserido com sucesso: ", resultado);
        return new UsuarioEntity(usuario.nome, usuario.cpf, usuario.categoria_id, usuario.curso_id, resultado.insertId, usuario.status);
    }

    async buscarUsuarios() {
        const query = `
            select * from biblioteca.usuario
        `
        const resultado = await executarComandoSQL(query, []);
        const usuarios: UsuarioEntity[] = [];
        for (let i = 0; i < resultado.length; i++) {
            const { nome, cpf, categoria_id, curso_id, id, status } = resultado[i];
            usuarios.push(new UsuarioEntity(nome, cpf, categoria_id, curso_id, id, status));
        }
        return usuarios;
    }

    async buscarUsuarioCPF(cpf: string) {
        const query = `
            select * from biblioteca.usuario where cpf = ?
        `
        const resultado = await executarComandoSQL(query, [cpf]);
        const { nome, categoria_id, curso_id, id, status } = resultado[0];
        return new UsuarioEntity(nome, cpf, categoria_id, curso_id, id, status);
    }

    async buscarUsuarioId(id: number) {
        const query = `
            select * from biblioteca.usuario where id = ?
        `
        const resultado = await executarComandoSQL(query, [id]);
        const { nome, categoria_id, curso_id, cpf, status } = resultado[0];
        return new UsuarioEntity(nome, cpf, categoria_id, curso_id, id, status);
    }

    async alterarUsuario(nome: string, status: string, categoria_id: number, curso_id: number, cpf: string): Promise<UsuarioEntity> {
        const query = `
                    update biblioteca.Usuario
                        set nome = ?,
                        set status = ?,
                        set categoria_id = ?,
                        set curso_id = ?,
                        set categoria_id = ?
                    where cpf = ?
                `
        await executarComandoSQL(query, [nome, status, categoria_id, curso_id, categoria_id, cpf])
        const usuario = await this.buscarUsuarioCPF(cpf);
        return usuario;
    }

    async excluirUsuario(cpf: string) {
        const query = `
            delete from biblioteca.Usuario where cpf = ?
        `
        const resultado = await executarComandoSQL(query, [cpf]);
        console.log("Usuario excluido com sucesso: ", resultado);
    }

    async existeEmprestimosAtivos(usuario_id: number) {
        const query = `
            select * from biblioteca.Emprestimo where usuario_id = ? and data_entrega is null
        `;
        const resultado = await executarComandoSQL(query, [usuario_id]);
        if(resultado[0] != undefined){
            return true;
        } else {
            return false;
        }
    }
}