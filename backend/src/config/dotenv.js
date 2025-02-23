"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configDotenv;
function configDotenv() {
    const result = require('dotenv').config();
    if (result.error) {
        throw result.error;
    }
}
