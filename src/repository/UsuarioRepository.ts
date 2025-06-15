import { Usuario } from "../model/Usuario";

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private usuarioList: Usuario[] = [];

    inserirUsuario(usuario: Usuario) {
        const cpf = this.usuarioList.map(u => u.cpf).indexOf(usuario.cpf);
        const id = this.usuarioList.map(u => u.id).indexOf(usuario.id);
        if(cpf == -1 && id == -1){
            this.usuarioList.push(usuario);
        } else {
            throw("Já existe um usuário com o mesmo cpf ou id no sistema");
        }
    }

    buscarUsuarios() {
        return this.usuarioList;
    }

    buscarUsuarioCPF(cpf: string){
        const indice = this.usuarioList.findIndex(u => u.cpf == cpf);
        if(indice == -1){
            throw new Error("Usuário não encontrado");
        } else {
            return this.usuarioList[indice];
        }
    }

    alterarUsuario(nome: string, ativo: string, categoria_id: number, curso_id: number, cpf: string){
        const usuario = this.buscarUsuarioCPF(cpf);

        nome ? usuario.nome = nome : usuario.nome = usuario.nome;
        ativo ? usuario.ativo = ativo : usuario.ativo = usuario.ativo;
        categoria_id ? usuario.categoria_id = categoria_id : usuario.categoria_id = usuario.categoria_id;
        curso_id ? usuario.curso_id = curso_id : usuario.curso_id = usuario.curso_id;
    }

    excluirUsuario(cpf: string){
        const indice = this.usuarioList.findIndex(u => u.cpf == cpf);
        this.usuarioList.splice(indice);
    }
}