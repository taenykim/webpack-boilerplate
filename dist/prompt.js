"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var terminal_kit_1 = __importDefault(require("terminal-kit"));
var term = terminal_kit_1.default.terminal;
var defaultOptions = {
    defaultDestDirName: "my-boilerplate",
    questionMessage: "생성할 보일러 플레이트를 선택해주세요.\n",
};
var inputHandler = function (selectItemMap, input, destDirName) { return __awaiter(void 0, void 0, void 0, function () {
    var targetItemValue, targetDirectoryName, destDirectoryName;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                targetItemValue = selectItemMap.get(input);
                if (!targetItemValue) return [3 /*break*/, 2];
                if (targetItemValue.type === "quit")
                    return [2 /*return*/, targetItemValue.type];
                targetDirectoryName = path_1.default.join(__dirname, "../lib/" + ((_a = selectItemMap.get(input)) === null || _a === void 0 ? void 0 : _a.dirName));
                destDirectoryName = path_1.default.join(process.cwd(), destDirName);
                return [4 /*yield*/, fs_extra_1.default.copy(targetDirectoryName, destDirectoryName)];
            case 1:
                _b.sent();
                return [2 /*return*/, targetItemValue.type];
            case 2: return [2 /*return*/];
        }
    });
}); };
var createPrompt = function (selectItemMap, options) {
    if (options === void 0) { options = defaultOptions; }
    return __awaiter(void 0, void 0, void 0, function () {
        var questionMessage, defaultDestDirName, destDirName, input, selectItemValues, descriptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    questionMessage = options.questionMessage, defaultDestDirName = options.defaultDestDirName;
                    destDirName = defaultDestDirName;
                    term.cyan("생성할 프로젝트명을 입력하세요(default : my-app, 현재위치: . ) > ");
                    return [4 /*yield*/, term.inputField({}).promise];
                case 1:
                    input = _a.sent();
                    if (input === undefined) {
                    }
                    else if (input === ".") {
                        destDirName = ".";
                    }
                    else
                        destDirName = input;
                    selectItemValues = selectItemMap.values();
                    descriptions = Array.from(selectItemValues).map(function (value) { return value.description; });
                    term.cyan(questionMessage);
                    term.singleColumnMenu(descriptions, {
                        style: term.green,
                        selectedStyle: term.bold.black.bgWhite,
                    }, function (error, response) {
                        if (error) {
                            console.error(error);
                            process.exit(0);
                        }
                        var output = inputHandler(selectItemMap, response.selectedIndex, destDirName);
                        output
                            .then(function (res) {
                            if (res === "boiler-plate")
                                term.cyan("\n생성되었습니다!\n");
                            if (res === "quit")
                                term.red("\n종료되었습니다!\n");
                            if (!res)
                                term.white("아무일도 일어나지않았습니다!\n");
                            process.exit(0);
                        })
                            .catch(function (e) {
                            console.error(e);
                            process.exit(0);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
};
exports.default = createPrompt;
