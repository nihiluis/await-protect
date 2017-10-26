var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
function protect(fn) {
    return __awaiter(this, void 0, void 0, function () {
        var tuple, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tuple = new Result();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fn.then(function (val) { return tuple.res = val; }).catch(function (err) { return tuple.err = err; })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    tuple.err = e_1;
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, tuple];
            }
        });
    });
}
exports.default = protect;
function protectAll(fns) {
    return __awaiter(this, void 0, void 0, function () {
        var tuples, newFns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tuples = [];
                    newFns = fns.map(function (fn, i) {
                        return fn.then(function (val) { return tuples[i] = Result.ok(val); }).catch(function (err) { return tuples[i] = Result.err(err); });
                    });
                    return [4 /*yield*/, Promise.all(newFns)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, tuples];
            }
        });
    });
}
exports.protectAll = protectAll;
function gprotect(fn) {
    var _this = this;
    var hi = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, protect(fn)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    return hi;
}
exports.gprotect = gprotect;
var Result = /** @class */ (function () {
    function Result() {
    }
    Result.prototype.ok = function () {
        if (this.err) {
            return false;
        }
        return true;
    };
    Result.prototype.unwrap = function () {
        return this.res;
    };
    Result.prototype.unwrapErr = function () {
        return this.err;
    };
    Result.prototype.to = function (a) {
        var res = new Result();
        if (this.res) {
            res.res = a(this.res);
        }
        res.err = this.err;
        return res;
    };
    Result.prototype.too = function (a, b) {
        var res = new Result();
        if (this.res) {
            res.res = a(this.res);
        }
        if (this.err) {
            res.err = b(this.err);
        }
        return res;
    };
    Result.err = function (err) {
        var res = new Result();
        res.err = err;
        return res;
    };
    Result.ok = function (ok) {
        var res = new Result();
        res.res = ok;
        return res;
    };
    return Result;
}());
exports.Result = Result;
