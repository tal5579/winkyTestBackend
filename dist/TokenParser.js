"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTHelper = exports.ACCESS_TOKEN_KEY = void 0;
const jwt = __importStar(require("jsonwebtoken"));
exports.ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
class JWTHelper {
    constructor() {
        this.SECRET_KEY = "wn5hTz2vHihcS83Y_7LYZEzHnlCTSYKpwHHA8vmF21TdERo1heWN";
        this.parse = (token) => {
            try {
                const payload = this.verify(token, this.SECRET_KEY);
                return payload.email.toString();
            }
            catch (err) {
                throw new Error(err.message);
            }
        };
        this.getAccessToken = (req) => req.headers[exports.ACCESS_TOKEN_KEY] || req.headers[exports.ACCESS_TOKEN_KEY.toLowerCase()];
    }
    generateToken(payload) {
        return jwt.sign(payload, this.SECRET_KEY, {
            algorithm: "HS512",
            expiresIn: 7200,
            issuer: "winkytest",
        });
    }
    verify(token, secret) {
        if (!token) {
            throw new Error('Authorization token is not provided');
        }
        try {
            return jwt.verify(token, secret);
        }
        catch (err) {
            throw new Error('Token access restricted');
        }
    }
}
exports.JWTHelper = JWTHelper;
//# sourceMappingURL=TokenParser.js.map