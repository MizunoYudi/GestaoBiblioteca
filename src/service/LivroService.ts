import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {
    livroRepository = LivroRepository.getInstance();

    cadastrarLivro(livroData: any) {
        const { id, titulo, autor, editora, edicao, isbn, categoria } = livroData;
        if (!titulo || !isbn || !autor || !editora || !edicao || !categoria) {
            throw new Error("Informações incompletas para o cadastro do livro");
        }

        const novoLivro = new Livro(parseInt(id), titulo, autor, editora, edicao, isbn, parseInt(categoria));
        if (!this.verificarSemelhantes(novoLivro.autor, novoLivro.editora, novoLivro.edicao)) {
            this.livroRepository.inserirLivro(novoLivro);
        }
    }

    verificarSemelhantes(autor: string, editora: string, edicao: string): boolean {
        const livros = this.livroRepository.buscarLivros();
        const semelhante = livros.findIndex(l => l.autor == autor && l.editora == editora && l.editora == editora);
        if (semelhante == -1) {
            return false;
        } else {
            throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição no sistema");
        }
    }

    filtrarPorISBN(isbn: string): Livro {
        const livro = this.livroRepository.buscarLivroIsbn(isbn);
        return livro;
    }

    atualizarLivro(livroData: any, isbn: string) {
        const livro = this.livroRepository.buscarLivroIsbn(isbn);
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