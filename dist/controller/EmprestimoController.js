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
exports.EmprestimoController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EmprestimoService_1 = require("../service/EmprestimoService");
const EmprestimoDto_1 = require("../model/dto/EmprestimoDto");
let EmprestimoController = class EmprestimoController {
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    async novoEmprestimo(dto, fail, sucess) {
        try {
            const novoEmprestimo = this.emprestimoService.cadastrarEmprestimo(dto);
            return sucess(201, new BasicResponseDto_1.BasicResponseDto("Emprestimo criado: ", novoEmprestimo));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao criar emprestimo: \n${e.message}`, undefined));
        }
    }
    async exibirEmprestimos(fail, sucess) {
        try {
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Emprestimos: ", emprestimos));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar emprestimos: \n${e.message}`, undefined));
        }
    }
    async atualizarEmprestimo(id, fail, sucess) {
        try {
            const emprestimo = await this.emprestimoService.atualizarEmprestimo(id);
            return sucess(200, new BasicResponseDto_1.BasicResponseDto("Emprestimo retornado!: ", emprestimo));
        }
        catch (e) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(`Erro ao buscar emprestimo: \n${e.message}`, undefined));
        }
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoDto_1.EmprestimoDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "novoEmprestimo", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "exibirEmprestimos", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "atualizarEmprestimo", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)("emprestimos"),
    (0, tsoa_1.Tags)("Emprestimos")
], EmprestimoController);
