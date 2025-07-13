import { Res, Route, Tags, Get, TsoaResponse } from "tsoa";
import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("catalogos/categorias-livros")
@Tags("CategoriaLivro")

export class CategoriaLivroController {
    private categoriaLivroService = new CategoriaLivroService();

    @Get()
    async exibirCategoriaLivro(
        @Res() fail: TsoaResponse<404, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const categorias = await this.categoriaLivroService.listarCategoriaLivro();
            return sucess(200, new BasicResponseDto("Categorias: ", categorias));
        } catch (e: any) {
            return fail(404, new BasicResponseDto(`Erro ao buscar categorias: \n${e.message}`, undefined))
        }
    }
}