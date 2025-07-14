/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsuarioController } from './../controller/UsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LivroController } from './../controller/LivroController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EstoqueController } from './../controller/EstoqueController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EmprestimoController } from './../controller/EmprestimoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CursoController } from './../controller/CursoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriaUsuarioController } from './../controller/CategoriaUsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriaLivroController } from './../controller/CategoriaLivroController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UsuarioDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "nome": {"dataType":"string","required":true},
            "cpf": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
            "categoria_id": {"dataType":"double","required":true},
            "curso_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "titulo": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "categoria_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "livro_id": {"dataType":"double","required":true},
            "quantidade": {"dataType":"double","required":true},
            "quantidade_emprestada": {"dataType":"double","required":true},
            "disponivel": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "usuario_id": {"dataType":"double","required":true},
            "estoque_id": {"dataType":"double","required":true},
            "data_emprestimo": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"undefined"}],"required":true},
            "data_devolucao": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"undefined"}],"required":true},
            "data_entrega": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"undefined"}],"required":true},
            "dias_atraso": {"dataType":"double","required":true},
            "suspensao_ate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"undefined"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsuarioController_novoUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.novoUsuario)),

            async function UsuarioController_novoUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_novoUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'novoUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_exibirUsuarios: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                categoria_id: {"in":"query","name":"categoria_id","dataType":"string"},
                curso_id: {"in":"query","name":"curso_id","dataType":"string"},
        };
        app.get('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.exibirUsuarios)),

            async function UsuarioController_exibirUsuarios(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_exibirUsuarios, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'exibirUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_filtrarUsuarioPorCPF: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.filtrarUsuarioPorCPF)),

            async function UsuarioController_filtrarUsuarioPorCPF(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_filtrarUsuarioPorCPF, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'filtrarUsuarioPorCPF',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_atualizarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioDto"},
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuario)),

            async function UsuarioController_atualizarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_apagarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.apagarUsuario)),

            async function UsuarioController_apagarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_apagarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'apagarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_novoLivro: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.novoLivro)),

            async function LivroController_novoLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_novoLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'novoLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_exibirLivros: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
                titulo: {"in":"query","name":"titulo","dataType":"string"},
                autor: {"in":"query","name":"autor","dataType":"string"},
                editora: {"in":"query","name":"editora","dataType":"string"},
                edicao: {"in":"query","name":"edicao","dataType":"string"},
        };
        app.get('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.exibirLivros)),

            async function LivroController_exibirLivros(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_exibirLivros, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'exibirLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_filtrarLivroPorIsbn: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.filtrarLivroPorIsbn)),

            async function LivroController_filtrarLivroPorIsbn(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_filtrarLivroPorIsbn, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'filtrarLivroPorIsbn',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_atualizarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroDto"},
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizarLivro)),

            async function LivroController_atualizarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_apagarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.apagarLivro)),

            async function LivroController_apagarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_apagarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'apagarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_novoExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"EstoqueDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.novoExemplar)),

            async function EstoqueController_novoExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_novoExemplar, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'novoExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_exibirExemplares: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.exibirExemplares)),

            async function EstoqueController_exibirExemplares(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_exibirExemplares, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'exibirExemplares',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_filtrarExemplarPorId: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.filtrarExemplarPorId)),

            async function EstoqueController_filtrarExemplarPorId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_filtrarExemplarPorId, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'filtrarExemplarPorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_atualizarDiponibilidade: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"dataType":"any"},
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.atualizarDiponibilidade)),

            async function EstoqueController_atualizarDiponibilidade(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarDiponibilidade, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'atualizarDiponibilidade',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_apagarExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.delete('/estoque/:id',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.apagarExemplar)),

            async function EstoqueController_apagarExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_apagarExemplar, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'apagarExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_novoEmprestimo: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"EmprestimoDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/emprestimos',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.novoEmprestimo)),

            async function EmprestimoController_novoEmprestimo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_novoEmprestimo, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'novoEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_exibirEmprestimos: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/emprestimos',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.exibirEmprestimos)),

            async function EmprestimoController_exibirEmprestimos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_exibirEmprestimos, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'exibirEmprestimos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEmprestimoController_atualizarEmprestimo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/emprestimos/:id',
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController)),
            ...(fetchMiddlewares<RequestHandler>(EmprestimoController.prototype.atualizarEmprestimo)),

            async function EmprestimoController_atualizarEmprestimo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEmprestimoController_atualizarEmprestimo, request, response });

                const controller = new EmprestimoController();

              await templateService.apiHandler({
                methodName: 'atualizarEmprestimo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCursoController_exibirCursos: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/cursos',
            ...(fetchMiddlewares<RequestHandler>(CursoController)),
            ...(fetchMiddlewares<RequestHandler>(CursoController.prototype.exibirCursos)),

            async function CursoController_exibirCursos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCursoController_exibirCursos, request, response });

                const controller = new CursoController();

              await templateService.apiHandler({
                methodName: 'exibirCursos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaUsuarioController_exibirCategoriaUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/categorias-usuarios',
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaUsuarioController.prototype.exibirCategoriaUsuario)),

            async function CategoriaUsuarioController_exibirCategoriaUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaUsuarioController_exibirCategoriaUsuario, request, response });

                const controller = new CategoriaUsuarioController();

              await templateService.apiHandler({
                methodName: 'exibirCategoriaUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaLivroController_exibirCategoriaLivro: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                sucess: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/categorias-livros',
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController.prototype.exibirCategoriaLivro)),

            async function CategoriaLivroController_exibirCategoriaLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_exibirCategoriaLivro, request, response });

                const controller = new CategoriaLivroController();

              await templateService.apiHandler({
                methodName: 'exibirCategoriaLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
