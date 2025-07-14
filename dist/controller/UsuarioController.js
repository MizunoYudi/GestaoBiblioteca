"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const UsuarioService_1 = require("../service/UsuarioService");
const UsuarioDto_1 = require("../model/dto/UsuarioDto");
let UsuarioController = class UsuarioController {
    usuarioService = new UsuarioService_1.UsuarioService();
    async novoUsuario(dto, fail, sucess) {
        try {
            const novoUsuario = await this.usuarioService.cadastrarUsuario(dto);
            return sucess(201, new BasicResponseDto_1.BasicResponseDto("Usuario criado: ", novoUsuario));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao criar o usuario: \n${e.message}`, undefined));
        }
    }
    async exibirUsuarios(fail, sucess, categoria_id, curso_id) {
        try {
            let usuarios = await this.usuarioService.listarUsuarios();
            if (categoria_id != undefined) {
                usuarios = this.usuarioService.filtrarUsuarios(usuarios, 1, categoria_id);
            }
            if (curso_id != undefined) {
                usuarios = this.usuarioService.filtrarUsuarios(usuarios, 2, curso_id);
            }
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Usuarios: ", usuarios));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar livros: \n${e.message}`, undefined));
        }
    }
    async filtrarUsuarioPorCPF(cpf, fail, sucess) {
        try {
            const usuario = await this.usuarioService.filtrarPorCPF(cpf);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Usuario encontrado: ", usuario));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar usuario: \n${e.message}`, undefined));
        }
    }
    async atualizarUsuario(dto, cpf, fail, sucess) {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto, cpf);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Usuario atualizado: ", usuario));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao atualizar o usuario: \n${e.message}`, undefined));
        }
    }
    async apagarUsuario(cpf, fail, sucess) {
        try {
            await this.usuarioService.removerUsuario(cpf);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Usuario removido: ", undefined));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao remover usuario: \n${e.message}`, undefined));
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "novoUsuario", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "exibirUsuarios", null);
__decorate([
    (0, tsoa_1.Get)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "filtrarUsuarioPorCPF", null);
__decorate([
    (0, tsoa_1.Put)("{cpf}"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDto, String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "apagarUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("usuarios"),
    (0, tsoa_1.Tags)("Usuarios")
], UsuarioController);
