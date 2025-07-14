import { Post, Res, Route, Tags, Get, TsoaResponse, Body, Path, Query, Put, Delete } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueService } from "../service/EstoqueService";
import { EstoqueDto } from "../model/dto/EstoqueDto";

@Route("estoque")
@Tags("Estoque")

export class EstoqueController {
    private estoqueService = new EstoqueService();

    @Post()
    async novoExemplar(
        @Body() dto: EstoqueDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ) {
        try {
            const novoExemplar = await this.estoqueService.cadastrarExemplar(dto);
            return sucess(201, new BasicResponseDto("Estoque criado: ", novoExemplar));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao criar o estoque: \n${e.message}`, undefined));
        }
    }

    @Get()
    async exibirExemplares(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const exemplares = await this.estoqueService.listarExemplares();
            return sucess(200, new BasicResponseDto("Exemplares: ", exemplares));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao buscar exemplares: \n${e.message}`, undefined));
        }
    }

    @Get("{id}")
    async filtrarExemplarPorId(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const exemplar = await this.estoqueService.filtrarPorId(id);
            return sucess(200, new BasicResponseDto("Exemplar encontrado: ", exemplar));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao criar o estoque: \n${e.message}`, undefined));
        }
    }

    @Put("{id}")
    async atualizarDiponibilidade(
        @Body() dto: any,
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const exemplar = await this.estoqueService.atualizarDisponibilidade(dto, id);
            if (typeof dto == 'undefined') {
                return fail(400, new BasicResponseDto(`Insira a disponibilidade para poder altera-la`, undefined));
            }
            return sucess(200, new BasicResponseDto("Disponibilidade do exemplar atualizada com sucesso!", exemplar));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao alterar a disponibilidade do estoque: \n${e.message}`, undefined));
        }
    }

    @Delete("{id}")
    async apagarExemplar(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            await this.estoqueService.removerExemplar(id);
            return sucess(200, new BasicResponseDto("Exemplar removido", undefined));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao remover o estoque: \n${e.message}`, undefined));
        }
    }
}