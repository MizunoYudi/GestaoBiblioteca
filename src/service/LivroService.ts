import { Livro } from "../model/Livro";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroService } from "./CategoriaLivroService";

export class LivroService {
    private livroRepository = LivroRepository.getInstance();
    private categoriaLivroService = new CategoriaLivroService();
    private estoqueRepository = EstoqueRepository.getInstance();

    cadastrarLivro(livroData: any) {
        const { titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações incompletas para o cadastro do livro");
        }

        const novoLivro = new Livro(titulo, autor, editora, edicao, isbn, parseInt(categoria_id));
        if (this.validarLivro(novoLivro)) {
            this.livroRepository.inserirLivro(novoLivro);
            return novoLivro;
        }
    }

    validarLivro(livro: Livro): boolean {
        if (this.categoriaLivroService.validarCategoriaLivro(livro.categoria_id)) {
            if (!this.verificarSemelhantes(livro.autor, livro.editora, livro.edicao)) {
                return true;
            } else {
                throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição no sistema");
            }
        } else {
            throw new Error("Categoria inválida");
        }
    }

    verificarSemelhantes(autor: string, editora: string, edicao: string): boolean {
        const livros = this.livroRepository.buscarLivros();
        const semelhante = livros.findIndex(l => l.autor == autor && l.editora == editora && l.edicao == edicao);
        if (semelhante == -1) {
            return false;
        } else {
            return true;
        }
    }

    listarLivros(): Livro[] {
        return this.livroRepository.buscarLivros();
    }

    filtrarLivros(livros: Livro[], filtro?: number, valor?: any) {
        if (filtro !== undefined && valor !== undefined) {
            switch (filtro) {
                case 1:
                    const titulo = valor;
                    livros = livros.filter(l => l.titulo === titulo);
                    break;
                case 2:
                    const autor = valor;
                    livros = livros.filter(l => l.autor === autor);
                    break;
                case 3:
                    const editora = valor;
                    livros = livros.filter(l => l.editora === editora);
                    break;
                case 4:
                    const edicao = valor;
                    livros = livros.filter(l => l.edicao === edicao);
                    break;
            }
        }
        return livros;
    }

    filtrarPorISBN(isbn: string): Livro {
        const livro = this.livroRepository.buscarLivroIsbn(isbn);
        return livro;
    }

    filtrarPorId(id: number){
        const livro = this.livroRepository.buscarLivroId(id);
        return livro;
    }

    atualizarLivro(livroData: any, isbn: string) {
        const { titulo, autor, editora, edicao, categoria } = livroData;
        if (!this.verificarSemelhantes(autor, editora, edicao)) {
            const livroAtualizado = this.livroRepository.alterarLivro(titulo, autor, editora, edicao, categoria, isbn);
            return livroAtualizado;
        }
    }

    removerLivro(isbn: string) {
        const livro = this.filtrarPorISBN(isbn);
        if (this.verificarEstoque(livro.id)) {
            throw new Error("Possui um estoque relacionado");
        } else {
            this.livroRepository.excluirLivro(isbn);
        }
    }

    verificarEstoque(livro_id: number) {
        if (this.estoqueRepository.buscarEstoqueLivro(livro_id)) {
            return true;
        } else {
            return false;
        }
    }
}