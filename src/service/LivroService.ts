import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {
    livroRepository = LivroRepository.getInstance();

    cadastrarLivro(livroData: any) {
        const { id, titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        if (!id || !titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações incompletas para o cadastro do livro");
        }

        const novoLivro = new Livro(parseInt(id), titulo, autor, editora, edicao, isbn, parseInt(categoria_id));
        if (!this.verificarSemelhantes(novoLivro.autor, novoLivro.editora, novoLivro.edicao)) {
            this.livroRepository.inserirLivro(novoLivro);
            return novoLivro;
        }
    }

    verificarSemelhantes(autor: string, editora: string, edicao: string): boolean {
        const livros = this.livroRepository.buscarLivros();
        const semelhante = livros.findIndex(l => l.autor == autor && l.editora == editora && l.edicao == edicao);
        if (semelhante == -1) {
            return false;
        } else {
            throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição no sistema");
        }
    }

    listarLivros() {
        const livros = this.livroRepository.buscarLivros();
        return livros;
    }

    filtrarPorISBN(isbn: string): Livro {
        const livro = this.livroRepository.buscarLivroIsbn(isbn);
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
        this.livroRepository.excluirLivro(isbn);
    }
}