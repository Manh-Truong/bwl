"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var mongoose_1 = require("@nestjs/mongoose");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./Authentication/auth.module");
var komu_users_module_1 = require("./Komu_users/komu_users.module");
var reaction_module_1 = require("./Reaction/reaction.module");
var axios_1 = require("@nestjs/axios");
var message_module_1 = require("./Message/message.module");
var comment_module_1 = require("./Comment/comment.module");
var like_module_1 = require("./Like/like.module");
var notification_module_1 = require("./Notification/notification.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/komubot'),
                // mongodb://172.16.100.114:27017/komubot,
                // mongodb://localhost/nest
                auth_module_1.AuthModule,
                komu_users_module_1.KomuUsersModule,
                reaction_module_1.ReactionModule,
                message_module_1.MessageModule,
                comment_module_1.CommentModule,
                like_module_1.LikeModule,
                notification_module_1.NotificationModule,
                axios_1.HttpModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
