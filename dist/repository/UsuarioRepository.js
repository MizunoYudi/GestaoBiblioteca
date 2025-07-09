"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    usuarioList = [];
    cont = 1;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    inserirUsuario(usuario) {
        usuario.id = this.cont++;
        const cpf = this.usuarioList.map(u => u.cpf).indexOf(usuario.cpf);
        const id = this.usuarioList.map(u => u.id).indexOf(usuario.id);
        if (cpf == -1 && id == -1) {
            this.usuarioList.push(usuario);
        }
        else {
            throw new Error("Já existe um usuário com o mesmo cpf ou id no sistema");
        }
    }
    buscarUsuarios() {
        return this.usuarioList;
    }
    buscarUsuarioCPF(cpf) {
        const indice = this.usuarioList.findIndex(u => u.cpf == cpf);
        if (indice == -1) {
            throw new Error("Usuário não encontrado");
        }
        else {
            return this.usuarioList[indice];
        }
    }
    buscarUsuarioId(id) {
        const indice = this.usuarioList.findIndex(u => u.id == id);
        if (indice == -1) {
            throw new Error("Usuário não encontrado");
        }
        else {
            return this.usuarioList[indice];
        }
    }
    alterarUsuario(nome, ativo, categoria_id, curso_id, cpf) {
        const usuario = this.buscarUsuarioCPF(cpf);
        nome ? usuario.nome = nome : usuario.nome = usuario.nome;
        ativo ? usuario.ativo = ativo : usuario.ativo = usuario.ativo;
        categoria_id ? usuario.categoria_id = categoria_id : usuario.categoria_id = usuario.categoria_id;
        curso_id ? usuario.curso_id = curso_id : usuario.curso_id = usuario.curso_id;
        return usuario;
    }
    excluirUsuario(cpf) {
        const indice = this.usuarioList.findIndex(u => u.cpf == cpf);
        this.usuarioList.splice(indice);
    }
}
exports.UsuarioRepository = UsuarioRepository;
