"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var reaction_schema_1 = require("./Reaction/reaction.schema");
var constants_1 = require("./constants");
var message_schema_1 = require("./Message/message.schema");
var comment_schema_1 = require("./Comment/comment.schema");
var like_schema_1 = require("./Like/like.schema");
var notification_schema_1 = require("./Notification/notification.schema");
var rxjs_1 = require("rxjs");
var komu_users_schema_1 = require("./Komu_users/komu_users.schema");
var AppService = /** @class */ (function () {
    function AppService(komuReaction, komuMessage, komuComment, komuLike, komuNotification, komuUser) {
        this.komuReaction = komuReaction;
        this.komuMessage = komuMessage;
        this.komuComment = komuComment;
        this.komuLike = komuLike;
        this.komuNotification = komuNotification;
        this.komuUser = komuUser;
        this.events = new rxjs_1.Subject();
    }
    AppService.prototype.findLikeFromDiscordId = function (authorId, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuLike.findOne({ authorId: authorId, messageId: messageId })];
            });
        });
    };
    AppService.prototype.findLikeMessageFromDiscordId = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuLike.find({ messageId: messageId })];
            });
        });
    };
    // async findLikeAuthorId(messageId: string): Promise<any> {
    //   return this.komuMessage.find({ messageId: messageId });
    // }
    AppService.prototype.findCommentFromDiscordId = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuMessage.find({
                        messageId: messageId
                    })];
            });
        });
    };
    AppService.prototype.findCommentMessageFromDiscordId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuUser.findOne({ id: id })];
            });
        });
    };
    AppService.prototype.findLikeId = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuMessage.find({
                        messageId: messageId
                    })];
            });
        });
    };
    AppService.prototype.findLikeMessageId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuUser.findOne({ id: id })];
            });
        });
    };
    AppService.prototype.addEvent = function (event) {
        this.events.next(event);
    };
    AppService.prototype.sendEvents = function () {
        return this.events.asObservable();
    };
    AppService.prototype.getHello = function () {
        return 'Hello World!';
    };
    AppService.prototype.getAll = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var aggregatorOpts, data, _i, data_1, item, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        aggregatorOpts = [
                            { $match: { channelId: '924543969357099018' } },
                            { $sort: { _id: -1 } },
                            { $skip: (page - 1) * 20 },
                            { $limit: 20 },
                            {
                                $lookup: {
                                    from: 'komu_users',
                                    localField: 'authorId',
                                    foreignField: 'id',
                                    as: 'author'
                                }
                            },
                            {
                                $unwind: '$author'
                            },
                            {
                                $lookup: {
                                    from: 'komu_bwlreactions',
                                    localField: 'messageId',
                                    foreignField: 'messageId',
                                    as: 'reactions'
                                }
                            },
                            {
                                $lookup: {
                                    from: 'komu_bwlcomments',
                                    localField: 'messageId',
                                    foreignField: 'messageId',
                                    as: 'comments'
                                }
                            },
                            {
                                $lookup: {
                                    from: 'komu_bwllikes',
                                    localField: 'authorId',
                                    foreignField: 'authorId',
                                    as: 'likes'
                                }
                            },
                            {
                                $lookup: {
                                    from: 'komu_bwlnotifications',
                                    localField: 'authorId',
                                    foreignField: 'authorId',
                                    as: 'notifications'
                                }
                            },
                        ];
                        return [4 /*yield*/, this.komuMessage.aggregate(aggregatorOpts).exec()];
                    case 1:
                        data = _d.sent();
                        _i = 0, data_1 = data;
                        _d.label = 2;
                    case 2:
                        if (!(_i < data_1.length)) return [3 /*break*/, 7];
                        item = data_1[_i];
                        item.reactions = item.reactions.reduce(function (result, reaction) {
                            var exists = result.find(function (e) { return e.name === reaction.emoji; });
                            var emojiWithId = constants_1.emojis.find(function (e) { return e.name === reaction.emoji; });
                            if (exists) {
                                exists.count++;
                            }
                            else {
                                result.push(__assign(__assign(__assign({}, reaction), { name: reaction.emoji, count: 1 }), (emojiWithId ? { id: emojiWithId.id } : {})));
                            }
                            return result;
                        }, []);
                        _a = item;
                        return [4 /*yield*/, this.komuComment
                                .count({
                                messageId: item.messageId
                            })
                                .exec()];
                    case 3:
                        _a.totalComment = _d.sent();
                        _b = item;
                        return [4 /*yield*/, this.komuLike
                                .count({
                                messageId: item.messageId
                            })
                                .exec()];
                    case 4:
                        _b.totalLike = _d.sent();
                        _c = item;
                        return [4 /*yield*/, this.komuNotification
                                .count({
                                messageId: item.messageId
                            })
                                .exec()];
                    case 5:
                        _c.totalNotification = _d.sent();
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, data];
                }
            });
        });
    };
    AppService.prototype.getComments = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuComment
                        .aggregate([
                        {
                            $match: {
                                messageId: messageId
                            }
                        },
                        {
                            $lookup: {
                                from: 'komu_users',
                                localField: 'authorId',
                                foreignField: 'id',
                                as: 'author'
                            }
                        },
                    ])
                        .exec()];
            });
        });
    };
    AppService.prototype.comment = function (_a) {
        var messageId = _a.messageId, content = _a.content, authorId = _a.authorId;
        return __awaiter(this, void 0, void 0, function () {
            var comment, message, messageAuthor, commentAuthor, notification;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        comment = new this.komuComment({
                            messageId: messageId,
                            authorId: authorId,
                            content: content,
                            createdTimestamp: Date.now()
                        });
                        return [4 /*yield*/, this.komuMessage.find({ messageId: messageId }).exec()];
                    case 1:
                        message = _b.sent();
                        return [4 /*yield*/, this.komuUser
                                .findOne({ id: message[0].authorId })
                                .exec()];
                    case 2:
                        messageAuthor = _b.sent();
                        return [4 /*yield*/, this.komuUser.findOne({ id: authorId }).exec()];
                    case 3:
                        commentAuthor = _b.sent();
                        notification = new this.komuNotification({
                            messageId: messageId,
                            authorId: authorId,
                            content: content,
                            createdTimestamp: Date.now()
                        });
                        return [4 /*yield*/, comment.save()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, notification.save()];
                    case 5:
                        _b.sent();
                        this.addEvent({ data: { comment: comment, commentAuthor: commentAuthor, message: message, messageAuthor: messageAuthor } });
                        return [2 /*return*/, comment];
                }
            });
        });
    };
    AppService.prototype.getLikes = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuLike
                        .aggregate([
                        {
                            $match: {
                                messageId: messageId
                            }
                        },
                        {
                            $lookup: {
                                from: 'komu_users',
                                localField: 'authorId',
                                foreignField: 'id',
                                as: 'author'
                            }
                        },
                    ])
                        .exec()];
            });
        });
    };
    AppService.prototype.like = function (_a) {
        var messageId = _a.messageId, authorId = _a.authorId;
        return __awaiter(this, void 0, void 0, function () {
            var like, message, messageAuthor, likeAuthor, notification;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        like = new this.komuLike({
                            messageId: messageId,
                            authorId: authorId,
                            createdTimestamp: Date.now()
                        });
                        return [4 /*yield*/, this.komuMessage.find({ messageId: messageId }).exec()];
                    case 1:
                        message = _b.sent();
                        return [4 /*yield*/, this.komuUser
                                .findOne({ id: message[0].authorId })
                                .exec()];
                    case 2:
                        messageAuthor = _b.sent();
                        return [4 /*yield*/, this.komuUser.findOne({ id: authorId }).exec()];
                    case 3:
                        likeAuthor = _b.sent();
                        notification = new this.komuNotification({
                            messageId: messageId,
                            authorId: authorId,
                            createTimestamp: Date.now()
                        });
                        return [4 /*yield*/, like.save()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, notification.save()];
                    case 5:
                        _b.sent();
                        this.addEvent({ data: { like: like, likeAuthor: likeAuthor, message: message, messageAuthor: messageAuthor } });
                        return [2 /*return*/, like];
                }
            });
        });
    };
    AppService.prototype.unlike = function (_a) {
        var messageId = _a.messageId, authorId = _a.authorId;
        return __awaiter(this, void 0, void 0, function () {
            var dislike;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.komuLike
                            .remove({
                            messageId: messageId,
                            authorId: authorId
                        })
                            .exec()];
                    case 1:
                        dislike = _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AppService.prototype.getNotifications = function (messageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.komuNotification
                        .aggregate([
                        {
                            $match: {
                                messageId: messageId
                            }
                        },
                        {
                            $lookup: {
                                from: 'komu_users',
                                localField: 'authorId',
                                foreignField: 'id',
                                as: 'author'
                            }
                        },
                        {
                            $lookup: {
                                from: 'komu_bwls',
                                localField: 'messageId',
                                foreignField: 'messageId',
                                as: 'message'
                            }
                        },
                    ])
                        .exec()];
            });
        });
    };
    AppService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(reaction_schema_1.Reaction.name)),
        __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
        __param(2, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
        __param(3, (0, mongoose_1.InjectModel)(like_schema_1.Like.name)),
        __param(4, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
        __param(5, (0, mongoose_1.InjectModel)(komu_users_schema_1.KomuUsers.name))
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
