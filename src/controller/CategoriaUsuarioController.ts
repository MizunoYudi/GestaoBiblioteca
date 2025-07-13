import { Res, Route, Tags, Get, TsoaResponse } from "tsoa";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("catalogos/categorias-usuarios")
@Tags("CategoriaUsuario")

export class CategoriaUsuarioController {
    private categoriaUsuarioService = new CategoriaUsuarioService();

    @Get()
    async exibirCategoriaUsuario(
        @Res() fail: TsoaResponse<404, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const categorias = await this.categoriaUsuarioService.listarCategoriaUsuario();
            return sucess(200, new BasicResponseDto("Categorias: ", categorias));
        } catch (e: any) {
            return fail(404, new BasicResponseDto(`Erro ao buscar categorias: \n${e.message}`, undefined))
        }
    }
}