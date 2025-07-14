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
exports.EstoqueController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EstoqueService_1 = require("../service/EstoqueService");
const EstoqueDto_1 = require("../model/dto/EstoqueDto");
let EstoqueController = class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService();
    async novoExemplar(dto, fail, sucess) {
        try {
            const novoExemplar = await this.estoqueService.cadastrarExemplar(dto);
            return sucess(201, new BasicResponseDto_1.BasicResponseDto("Estoque criado: ", novoExemplar));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao criar o estoque: \n${e.message}`, undefined));
        }
    }
    async exibirExemplares(fail, sucess) {
        try {
            const exemplares = await this.estoqueService.listarExemplares();
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Exemplares: ", exemplares));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar exemplares: \n${e.message}`, undefined));
        }
    }
    async filtrarExemplarPorId(id, fail, sucess) {
        try {
            const exemplar = await this.estoqueService.filtrarPorId(id);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Exemplar encontrado: ", exemplar));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao criar o estoque: \n${e.message}`, undefined));
        }
    }
    async atualizarDiponibilidade(dto, id, fail, sucess) {
        try {
            const exemplar = await this.estoqueService.atualizarDisponibilidade(dto, id);
            if (typeof dto == 'undefined') {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(`Insira a disponibilidade para poder altera-la`, undefined));
            }
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Disponibilidade do exemplar atualizada com sucesso!", exemplar));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao alterar a disponibilidade do estoque: \n${e.message}`, undefined));
        }
    }
    async apagarExemplar(id, fail, sucess) {
        try {
            await this.estoqueService.removerExemplar(id);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Exemplar removido", undefined));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao remover o estoque: \n${e.message}`, undefined));
        }
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueDto_1.EstoqueDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "novoExemplar", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "exibirExemplares", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "filtrarExemplarPorId", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Path)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "atualizarDiponibilidade", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "apagarExemplar", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)("estoque"),
    (0, tsoa_1.Tags)("Estoque")
], EstoqueController);
