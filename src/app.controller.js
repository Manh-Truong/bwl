"use strict";
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
exports.AppController = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var discordTokenUrl = 'https://discord.com/api/oauth2/token';
var discordUserUrl = 'https://discord.com/api/users/@me';
var AppController = /** @class */ (function () {
    function AppController(appService, httpService, authService) {
        this.appService = appService;
        this.httpService = httpService;
        this.authService = authService;
    }
    AppController.prototype.sse = function () {
        return this.appService.sendEvents();
    };
    AppController.prototype.index = function (query, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, posts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.cookies['token']) return [3 /*break*/, 1];
                        try {
                            return [2 /*return*/, this.httpService
                                    .get(discordUserUrl, {
                                    headers: {
                                        Authorization: "Bearer ".concat(req.cookies['token'])
                                    }
                                })
                                    .pipe((0, rxjs_1.map)(function (userResponse) {
                                    return userResponse.data;
                                }), (0, rxjs_1.map)(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                    var userDb, posts;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.authService.findUserFromDiscordId(user.id)];
                                            case 1:
                                                userDb = _a.sent();
                                                if (!!userDb) return [3 /*break*/, 3];
                                                return [4 /*yield*/, this.authService.saveUser(user.id, user.username, user.avatar, user.discriminator)];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [4 /*yield*/, this.appService.getAll(1)];
                                            case 4:
                                                posts = _a.sent();
                                                return [2 /*return*/, res.render('index', { posts: posts, user: user })];
                                        }
                                    });
                                }); }), (0, rxjs_1.first)())];
                        }
                        catch (error) {
                            throw new error();
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        if (!query.code) return [3 /*break*/, 2];
                        body = new URLSearchParams({
                            client_id: process.env.CLIENT_ID,
                            client_secret: process.env.CLIENT_SECRET,
                            grant_type: 'authorization_code',
                            code: query.code,
                            redirect_uri: process.env.REDIRECT_URI,
                            scope: 'identify'
                        });
                        try {
                            return [2 /*return*/, this.httpService
                                    .post(discordTokenUrl, body, {
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                })
                                    .pipe((0, rxjs_1.switchMap)(function (response) {
                                    res.cookie('token', response.data.access_token);
                                    return _this.httpService.get(discordUserUrl, {
                                        headers: {
                                            Authorization: "Bearer ".concat(response.data.access_token)
                                        }
                                    });
                                }), (0, rxjs_1.map)(function (userResponse) {
                                    return userResponse.data;
                                }), (0, rxjs_1.map)(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                    var userDb, posts;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.authService.findUserFromDiscordId(user.id)];
                                            case 1:
                                                userDb = _a.sent();
                                                if (!!userDb) return [3 /*break*/, 3];
                                                return [4 /*yield*/, this.authService.saveUser(user.id, user.username, user.avatar, user.discriminator)];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [4 /*yield*/, this.appService.getAll(1)];
                                            case 4:
                                                posts = _a.sent();
                                                return [2 /*return*/, res.render('index', { posts: posts, user: user })];
                                        }
                                    });
                                }); }), (0, rxjs_1.first)())];
                        }
                        catch (error) {
                            throw new error();
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.appService.getAll(1)];
                    case 3:
                        posts = _a.sent();
                        return [2 /*return*/, res.render('index', { posts: posts })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppController.prototype.root = function () {
        var url = "https://discord.com/api/oauth2/authorize?client_id=".concat(process.env.CLIENT_ID, "&redirect_uri=").concat(encodeURIComponent(process.env.REDIRECT_URI), "&response_type=code&scope=identify");
        return { url: url };
    };
    AppController.prototype.logout = function (res) {
        res.clearCookie('token');
        res.redirect('/');
    };
    AppController.prototype.getAllPaging = function (page) {
        if (page === void 0) { page = 1; }
        return this.appService.getAll(page <= 0 ? 1 : page);
    };
    AppController.prototype.postComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!req.cookies['token']) {
                    throw new common_1.UnauthorizedException();
                }
                return [2 /*return*/, this.httpService
                        .get(discordUserUrl, {
                        headers: {
                            Authorization: "Bearer ".concat(req.cookies['token'])
                        }
                    })
                        .pipe((0, rxjs_1.map)(function (userResponse) {
                        return userResponse.data;
                    }), (0, rxjs_1.first)())
                        .subscribe({
                        next: function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, content, messageId, authorId, comment, userDB, messageDB;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = req.body, content = _a.content, messageId = _a.messageId, authorId = _a.authorId;
                                        return [4 /*yield*/, this.appService.comment({
                                                content: content,
                                                messageId: messageId,
                                                authorId: authorId
                                            })];
                                    case 1:
                                        comment = _b.sent();
                                        return [4 /*yield*/, this.appService.findCommentMessageFromDiscordId(user.id)];
                                    case 2:
                                        userDB = _b.sent();
                                        return [4 /*yield*/, this.appService.findCommentFromDiscordId(messageId)];
                                    case 3:
                                        messageDB = _b.sent();
                                        return [2 /*return*/, res.json({ success: true, comment: comment, userDB: userDB, messageDB: messageDB })];
                                }
                            });
                        }); },
                        error: function (error) {
                            return res
                                .status(401)
                                .json({ success: false, error: error.response.data.message });
                        }
                    })];
            });
        });
    };
    AppController.prototype.getComments = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var messageId, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageId = req.query.messageId;
                        return [4 /*yield*/, this.appService.getComments(messageId)];
                    case 1:
                        comments = _a.sent();
                        return [2 /*return*/, res.json({ comments: comments })];
                }
            });
        });
    };
    AppController.prototype.postLike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!req.cookies['token']) {
                    throw new common_1.UnauthorizedException();
                }
                return [2 /*return*/, this.httpService
                        .get(discordUserUrl, {
                        headers: {
                            Authorization: "Bearer ".concat(req.cookies['token'])
                        }
                    })
                        .pipe((0, rxjs_1.map)(function (userResponse) {
                        return userResponse.data;
                    }), (0, rxjs_1.first)())
                        .subscribe({
                        next: function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, messageId, authorId, userDB, messageDB, usernameDB, messageLikeDB, like, dislike;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = req.body, messageId = _a.messageId, authorId = _a.authorId;
                                        return [4 /*yield*/, this.appService.findLikeFromDiscordId(user.id, messageId)];
                                    case 1:
                                        userDB = _b.sent();
                                        return [4 /*yield*/, this.appService.findLikeMessageFromDiscordId(messageId)];
                                    case 2:
                                        messageDB = _b.sent();
                                        return [4 /*yield*/, this.appService.findLikeMessageId(user.id)];
                                    case 3:
                                        usernameDB = _b.sent();
                                        return [4 /*yield*/, this.appService.findLikeId(messageId)];
                                    case 4:
                                        messageLikeDB = _b.sent();
                                        if (!(messageDB && !userDB)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this.appService.like({
                                                messageId: messageId,
                                                authorId: authorId
                                            })];
                                    case 5:
                                        like = _b.sent();
                                        // return res.json({ success: true, like });
                                        return [2 /*return*/, res.json({ success: true, like: like, usernameDB: usernameDB, messageLikeDB: messageLikeDB })];
                                    case 6:
                                        if (!userDB) return [3 /*break*/, 8];
                                        return [4 /*yield*/, this.appService.unlike({
                                                messageId: messageId,
                                                authorId: user.id
                                            })];
                                    case 7:
                                        dislike = _b.sent();
                                        return [2 /*return*/, res.json({ success: true, dislike: dislike })];
                                    case 8: return [2 /*return*/];
                                }
                            });
                        }); },
                        error: function (error) {
                            return res
                                .status(401)
                                .json({ success: false, error: error.response.data.message });
                        }
                    })];
            });
        });
    };
    AppController.prototype.getLikes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var messageId, likes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageId = req.query.messageId;
                        return [4 /*yield*/, this.appService.getLikes(messageId)];
                    case 1:
                        likes = _a.sent();
                        return [2 /*return*/, res.json({ likes: likes })];
                }
            });
        });
    };
    AppController.prototype.getNotifications = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var messageId, notifications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageId = req.query.messageId;
                        return [4 /*yield*/, this.appService.getNotifications(messageId)];
                    case 1:
                        notifications = _a.sent();
                        return [2 /*return*/, res.json({ notifications: notifications })];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Sse)('/sse')
    ], AppController.prototype, "sse");
    __decorate([
        (0, common_1.Get)(''),
        __param(0, (0, common_1.Query)()),
        __param(1, (0, common_1.Req)()),
        __param(2, (0, common_1.Res)())
    ], AppController.prototype, "index");
    __decorate([
        (0, common_1.Get)('/login'),
        (0, common_1.Render)('login')
    ], AppController.prototype, "root");
    __decorate([
        (0, common_1.Get)('logout'),
        __param(0, (0, common_1.Res)())
    ], AppController.prototype, "logout");
    __decorate([
        (0, common_1.Get)('/getAllPaging'),
        __param(0, (0, common_1.Query)('page'))
    ], AppController.prototype, "getAllPaging");
    __decorate([
        (0, common_1.Post)('/comment'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)())
    ], AppController.prototype, "postComment");
    __decorate([
        (0, common_1.Get)('/comments'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)())
    ], AppController.prototype, "getComments");
    __decorate([
        (0, common_1.Post)('/like'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)())
    ], AppController.prototype, "postLike");
    __decorate([
        (0, common_1.Get)('/likes'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)())
    ], AppController.prototype, "getLikes");
    __decorate([
        (0, common_1.Get)('/notifications'),
        __param(0, (0, common_1.Req)()),
        __param(1, (0, common_1.Res)())
    ], AppController.prototype, "getNotifications");
    AppController = __decorate([
        (0, common_1.Controller)()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
