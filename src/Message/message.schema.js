"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessageSchema = exports.Message = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], Message.prototype, "id");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Message.prototype, "links");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Message.prototype, "channelId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Message.prototype, "guildId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Message.prototype, "createdTimestamp");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Message.prototype, "messageId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Message.prototype, "authorId");
    Message = __decorate([
        (0, mongoose_1.Schema)({ collection: 'komu_bwls' })
    ], Message);
    return Message;
}());
exports.Message = Message;
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(Message);
