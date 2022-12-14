"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LikeModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var like_schema_1 = require("./like.schema");
var LikeModule = /** @class */ (function () {
    function LikeModule() {
    }
    LikeModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: like_schema_1.Like.name, schema: like_schema_1.LikeSchema }]),
            ],
            exports: [
                mongoose_1.MongooseModule.forFeature([{ name: like_schema_1.Like.name, schema: like_schema_1.LikeSchema }]),
            ]
        })
    ], LikeModule);
    return LikeModule;
}());
exports.LikeModule = LikeModule;
