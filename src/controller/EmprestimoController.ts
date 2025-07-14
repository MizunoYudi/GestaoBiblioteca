import { Post, Res, Route, Tags, Get, TsoaResponse, Body, Path, Query, Put, Delete } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoService } from "../service/EmprestimoService";
import { EmprestimoDto } from "../model/dto/EmprestimoDto";

@Route("emprestimos")
@Tags("Emprestimos")

export class EmprestimoController {
    private emprestimoService = new EmprestimoService();
    
    @Post()
    async novoEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ) {
        try {
            const novoEmprestimo = this.emprestimoService.cadastrarEmprestimo(dto);
            return sucess(201, new BasicResponseDto("Emprestimo criado: ", novoEmprestimo));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao criar emprestimo: \n${e.message}`, undefined));
        }
    }

    @Get()
    async exibirEmprestimos(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            return sucess(200, new BasicResponseDto("Emprestimos: ", emprestimos));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao buscar emprestimos: \n${e.message}`, undefined));
        }
    }

    @Put("{id}")
    async atualizarEmprestimo(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const emprestimo = await this.emprestimoService.atualizarEmprestimo(id);
            return sucess(200, new BasicResponseDto("Emprestimo retornado!: ", emprestimo));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao buscar emprestimo: \n${e.message}`, undefined));
        }
    }
}