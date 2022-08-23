"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReactionSchema = exports.Reaction = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Reaction = /** @class */ (function () {
    function Reaction() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "id");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "channelId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "guildId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "messageId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "authorId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "emoji");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "count");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Reaction.prototype, "createdTimestamp");
    Reaction = __decorate([
        (0, mongoose_1.Schema)({ collection: 'komu_bwlreactions' })
    ], Reaction);
    return Reaction;
}());
exports.Reaction = Reaction;
exports.ReactionSchema = mongoose_1.SchemaFactory.createForClass(Reaction);
