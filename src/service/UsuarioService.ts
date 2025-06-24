import { Usuario } from "../model/Usuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
    usuarioRepository = UsuarioRepository.getInstance();
    categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
    cursoRepository = CursoRepository.getInstance();
    emprestimoRepository = EmprestimoRepository.getInstance();

    cadastrarUsuario(usuarioData: any) {
        const { id, nome, cpf, ativo, categoria_id, curso_id } = usuarioData;
        if (!id || !nome || !cpf || !ativo || !categoria_id || !curso_id) {
            throw new Error("Informações incompletas para o cadastro do usuário");
        }

        const novoUsuario = new Usuario(parseInt(id), nome, cpf, ativo, parseInt(categoria_id), parseInt(curso_id));
        if (this.validarCPF(novoUsuario.cpf) && this.validarUsuario(novoUsuario)) {
            this.usuarioRepository.inserirUsuario(novoUsuario);
            return novoUsuario;
        }
    }

    validarUsuario(usuario: Usuario): boolean {
        const curso = this.cursoRepository.verificarCurso(usuario.curso_id);
        const categoria = this.categoriaUsuarioRepository.verificarCategoria(usuario.categoria_id);
        if (categoria) {
            if (curso) {
                return true;
            } else {
                throw new Error("Curso inválido");
            }
        } else {
            throw new Error("Categoria inválida");
        }
    }

    validarCPF(cpf: string): boolean {
        if (cpf.length != 11) {
            throw new Error("CPF inválido: não possui 11 numeros")
        } else {
            const cpfNum = cpf.split('').map(Number);

            if (cpfNum.every(n => n == cpfNum[0])) {
                throw new Error("CPF inválido: é uma sequência de números repetidos");
            }

            const dig_10 = this.validarDigito(10, cpfNum);
            const copiaCPF = cpfNum;
            copiaCPF.push(dig_10);
            const dig_11 = this.validarDigito(11, copiaCPF);

            if (dig_10 == cpfNum[9] && dig_11 == cpfNum[10]) {
                return true;
            } else {
                throw new Error("CPF inválido: digitos de verificacao invalidos");
            }
        }
    }

    validarDigito(digito: number, cpfNum: number[]): number {
        let soma = 0;
        for (let i = 0; i < digito - 1; i++) {
            soma += cpfNum[i] * (digito - i);
        }
        const divisao = soma % 11;
        if (divisao < 2) {
            return 0;
        } else {
            return 11 - divisao;
        }
    }

    listarUsuarios(filtro?: number, valor?: any) {
        let usuarios = this.usuarioRepository.buscarUsuarios();
        if(filtro !== undefined && valor !== undefined){
            switch(filtro){
                case 1:
                    const categoria = parseInt(valor);
                    usuarios = usuarios.filter(u => u.categoria_id == categoria);
                    break;
                case 2:
                    const curso = valor;
                    usuarios = usuarios.filter(u => u.curso_id == curso);
                    break;
            }
        }
        return usuarios;
    }

    filtrarPorCPF(cpf: string) {
        const usuario = this.usuarioRepository.buscarUsuarioCPF(cpf);
        return usuario;
    }

    atualizarUsuario(usuarioData: any, cpf: string): Usuario {
        const { nome, ativo, categoria_id, curso_id } = usuarioData;
        return this.usuarioRepository.alterarUsuario(nome, ativo, categoria_id, curso_id, cpf);
    }

    removerUsuario(cpf: string) {
        const usuario = this.filtrarPorCPF(cpf);
        if (this.verificarEmprestimo(usuario.id)) {
            throw new Error("Usuário possui emprestimos pendentes no sistema");
        } else {
            this.usuarioRepository.excluirUsuario(cpf);
        }
    }

    verificarEmprestimo(usuario_id: number) {
        if (this.emprestimoRepository.buscarUsuarioEmprestimo(usuario_id)) {
            return true;
        } else {
            return false;
        }
    }
}