import { Post, Res, Route, Tags, Get, TsoaResponse, Body, Path, Query, Put, Delete } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroService } from "../service/LivroService";
import { LivroDto } from "../model/dto/LivroDto";

@Route("livros")
@Tags("Livros")

export class LivroController {
    private livroService = new LivroService()

    @Post()
    async novoLivro(
        @Body() dto: LivroDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ) {
        try {
            const livro = await this.livroService.cadastrarLivro(dto);
            return sucess(201, new BasicResponseDto("Livro criado: ", livro));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao criar o Livro: \n${e.message}`, undefined))
        }
    }

    @Get()
    async exibirLivros(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>,
        @Query() titulo?: string,
        @Query() autor?: string,
        @Query() editora?: string,
        @Query() edicao?: string,        
    ) {
        try {
            let livros = await this.livroService.listarLivros();

            if (titulo != undefined) {
                livros = this.livroService.filtrarLivros(livros, 1, titulo);
            }
            if (autor != undefined) {
                livros = this.livroService.filtrarLivros(livros, 2, autor);
            }
            if (editora != undefined) {
                livros = this.livroService.filtrarLivros(livros, 3, editora);
            }
            if (edicao != undefined) {
                livros = this.livroService.filtrarLivros(livros, 4, edicao);
            }
            return sucess(200, new BasicResponseDto("Livros: ", livros));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao buscar Livros: \n${e.message}`, undefined));
        }
    }

    @Get("{isbn}")
    async filtrarLivroPorIsbn(
        @Path() isbn: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const livro = await this.livroService.filtrarPorISBN(isbn);
            return sucess(200, new BasicResponseDto("Livros encontrado!", livro));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao buscar Livro: \n${e.message}`, undefined));
        }
    }

    @Put("{isbn}")
    async atualizarLivro(
        @Body() dto: LivroDto,
        @Path() isbn: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const livro = await this.livroService.atualizarLivro(dto, isbn);
            return sucess(200, new BasicResponseDto("Livro atualizado!", livro));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao atualizar livro: \n${e.message}`, undefined));
        }
    }

    @Delete("{isbn}")
    async apagarLivro(
        @Path() isbn: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            await this.livroService.removerLivro(isbn);
            return sucess(200, new BasicResponseDto("Livro removido!", undefined));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao remover o livro: \n${e.message}`, undefined));
        }
    }
}