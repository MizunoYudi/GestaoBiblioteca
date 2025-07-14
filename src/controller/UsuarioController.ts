import { Post, Res, Route, Tags, Get, TsoaResponse, Body, Path, Query, Put, Delete } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioDto } from "../model/dto/UsuarioDto";

@Route("usuarios")
@Tags("Usuarios")

export class UsuarioController {
    private usuarioService = new UsuarioService();

    @Post()
    async novoUsuario(
        @Body() dto: UsuarioDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ) {
        try {
            const novoUsuario = await this.usuarioService.cadastrarUsuario(dto);
            return sucess(201, new BasicResponseDto("Usuario criado: ", novoUsuario));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao criar o usuario: \n${e.message}`, undefined));
        }
    }

    @Get()
    async exibirUsuarios(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>,
        @Query() categoria_id?: string,
        @Query() curso_id?: string
    ) {
        try {
            let usuarios = await this.usuarioService.listarUsuarios();
            if (categoria_id != undefined) {
                usuarios = this.usuarioService.filtrarUsuarios(usuarios, 1, categoria_id);
            }
            if (curso_id != undefined) {
                usuarios = this.usuarioService.filtrarUsuarios(usuarios, 2, curso_id);
            }
            return sucess(200, new BasicResponseDto("Usuarios: ", usuarios));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao buscar livros: \n${e.message}`, undefined));
        }
    }

    @Get("{cpf}")
    async filtrarUsuarioPorCPF(
        @Path() cpf: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const usuario = await this.usuarioService.filtrarPorCPF(cpf);
            return sucess(200, new BasicResponseDto("Usuario encontrado: ", usuario));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao buscar usuario: \n${e.message}`, undefined))
        }
    }

    @Put("{cpf}")
    async atualizarUsuario(
        @Body() dto: UsuarioDto,
        @Path() cpf: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto, cpf);
            return sucess(200, new BasicResponseDto("Usuario atualizado: ", usuario));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao atualizar o usuario: \n${e.message}`, undefined));
        }
    }

    @Delete("{cpf}")
    async apagarUsuario(
        @Path() cpf: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ) {
        try {
            await this.usuarioService.removerUsuario(cpf);
            return sucess(200, new BasicResponseDto("Usuario removido: ", undefined));
        } catch (e: any) {
            return fail(400, new BasicResponseDto(`Erro ao remover usuario: \n${e.message}`, undefined));
        }
    }
}