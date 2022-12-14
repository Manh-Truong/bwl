"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var komu_users_module_1 = require("../../../../../../src/Komu_users/komu_users.module");
var komu_users_service_1 = require("../../../../../../src/Komu_users/komu_users.service");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./auth.service");
var axios_1 = require("@nestjs/axios");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            imports: [komu_users_module_1.KomuUsersModule, axios_1.HttpModule],
            providers: [komu_users_service_1.KomuUsersService, auth_service_1.AuthService],
            controllers: [auth_controller_1.AuthController],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
