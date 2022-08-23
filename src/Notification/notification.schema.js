"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotificationSchema = exports.Notification = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Notification = /** @class */ (function () {
    function Notification() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], Notification.prototype, "id");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Notification.prototype, "messageId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Notification.prototype, "authorId");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Notification.prototype, "content");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Notification.prototype, "status");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Notification.prototype, "count");
    __decorate([
        (0, mongoose_1.Prop)()
    ], Notification.prototype, "createdTimestamp");
    Notification = __decorate([
        (0, mongoose_1.Schema)({ collection: 'komu_bwlnotifications' })
    ], Notification);
    return Notification;
}());
exports.Notification = Notification;
exports.NotificationSchema = mongoose_1.SchemaFactory.createForClass(Notification);
