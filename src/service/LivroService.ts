import { LivroEntity } from "../model/entity/LivroEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroService } from "./CategoriaLivroService";

export class LivroService {
    private livroRepository = LivroRepository.getInstance();
    private categoriaLivroService = new CategoriaLivroService();
    private estoqueRepository = EstoqueRepository.getInstance();

    async cadastrarLivro(livroData: any) {
        const { titulo, autor, editora, edicao, isbn, categoria_id } = livroData;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoria_id) {
            throw new Error("Informações incompletas para o cadastro do livro");
        }

        const novoLivro = new LivroEntity(titulo, autor, editora, edicao, isbn, parseInt(categoria_id));
        if (await this.validarLivro(autor, editora, edicao, categoria_id)) {
            return await this.livroRepository.inserirLivro(novoLivro); 
        }
    }

    async validarLivro(autor: string, editora: string, edicao: string, categoria_id: number): Promise<boolean> {
        if (await this.categoriaLivroService.validarCategoriaLivro(categoria_id)) {
            if (await this.livroRepository.existeSemelhante(autor, editora, edicao)) {
                throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição no sistema");
            } else {
                return true;
            }
        } else {
            throw new Error("Categoria inválida");
        }
    }

    async listarLivros(): Promise<LivroEntity[]> {
        return await this.livroRepository.buscarLivros();
    }

    filtrarLivros(livros: LivroEntity[], filtro?: number, valor?: any) {
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

    async filtrarPorISBN(isbn: string): Promise<LivroEntity> {
        const livro = await this.livroRepository.buscarLivroIsbn(isbn);
        return livro;
    }

    async filtrarPorId(id: number){
        const livro = await this.livroRepository.buscarLivroId(id);
        return livro;
    }

    async atualizarLivro(livroData: any, isbn: string) {
        const { titulo, autor, editora, edicao, categoria_id } = livroData;
        if (await this.validarLivro(autor, editora, edicao, categoria_id)) {
            const livroAtualizado = this.livroRepository.alterarLivro(titulo, autor, editora, edicao, categoria_id, isbn);
            return livroAtualizado;
        }
    }

    async removerLivro(isbn: string) {
        const livro = await this.filtrarPorISBN(isbn);
        if (await this.verificarEstoque(livro.id)) {
            throw new Error("Possui um estoque relacionado");
        } else {
            this.livroRepository.excluirLivro(isbn);
        }
    }

    async verificarEstoque(livro_id: number) {
        if (await this.livroRepository.buscarEstoqueLivro(livro_id)) {
            return true;
        } else {
            return false;
        }
    }
}