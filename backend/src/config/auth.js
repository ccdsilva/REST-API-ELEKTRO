"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs = __importStar(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path = __importStar(require("path"));
const PRIV_KEY = fs.readFileSync(path.join(__dirname, "..", "..", "id_rsa_priv.pem"), "utf-8");
const generatePassword = (password) => {
    const salt = crypto_1.default.randomBytes(32).toString("hex");
    const hash = crypto_1.default
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return {
        salt: salt,
        hash: hash,
    };
};
const generateJWT = (user) => {
    const sub = user.email;
    const payload = {
        sub: sub,
        iat: Math.floor(Date.now() / 1000),
    };
    const jwt = jsonwebtoken_1.default.sign(payload, PRIV_KEY, {
        expiresIn: '10m',
        algorithm: "RS256",
    });
    return jwt;
};
const checkPassword = (password, hash, salt) => {
    const hashFromRequest = crypto_1.default
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hashFromRequest === hash;
};
const decodeJWT = (token) => {
    const payload = token.split(".")[1];
    const encodedPayload = Buffer.from(payload, "base64");
    const decodePayload = encodedPayload.toString("utf-8");
    return JSON.parse(decodePayload);
};
const getToken = (request) => {
    const token = request.get("Authorization");
    if (!token) {
        return Error;
    }
    else {
        return token.split(" ")[1];
    }
};
exports.default = {
    generatePassword,
    generateJWT,
    checkPassword,
    decodeJWT,
    getToken,
};
