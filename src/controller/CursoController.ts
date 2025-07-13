import { Res, Route, Tags, Get, TsoaResponse } from "tsoa";
import { CursoService } from "../service/CursoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";

@Route("catalogos/cursos")
@Tags("Cursos")

export class CursoController {
    private cursoService = new CursoService();

    @Get()
    async exibirCursos(
        @Res() fail: TsoaResponse<404, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const cursos = await this.cursoService.listarCursos();
            return sucess(200, new BasicResponseDto("Categorias: ", cursos));
        } catch (e: any) {
            return fail(404, new BasicResponseDto(`Erro ao buscar curso: \n${e.message}`, undefined))
        }
    }
}