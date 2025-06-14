import { Livro } from "../model/Livro";

export class LivroRepository {
    private static instance: LivroRepository;
    private livroList: Livro[] = [];

    private constructor() { };

    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance
    }

    inserirLivro(livroData: any) {
        this.livroList.push(livroData);
    }

    buscarLivros() {
        return this.livroList;
    }

    buscarLivroIsbn(isbn: string): Livro {
        const indice = this.livroList.findIndex(l => l.isbn == isbn);
        if (indice == -1) {
            throw new Error("Livro não encontrado");
        } else {
            return this.livroList[indice];
        }
    }

    alterarLivro(titulo: string, autor: string, editora: string, edicao: string, categoria_id: number, isbn: string): Livro {
        const livro = this.buscarLivroIsbn(isbn);

        titulo ? livro.titulo = titulo : livro.titulo = livro.titulo;
        autor ? livro.autor = autor : livro.autor = livro.autor;
        editora ? livro.editora = editora : livro.editora = livro.editora;
        edicao ? livro.edicao = edicao : livro.edicao = livro.edicao;
        categoria_id ? livro.categoria_id = categoria_id : livro.categoria_id = livro.categoria_id;

        return livro;
    }

    excluirLivro(isbn: string) {
        const indice = this.livroList.findIndex(l => l.isbn == isbn);
        this.livroList.splice(indice);
    }

}