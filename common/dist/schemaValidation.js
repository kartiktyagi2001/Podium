"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidation = exports.createValidation = exports.signinValidation = exports.signupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupValidation = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    password: zod_1.default.string().min(3)
});
exports.signinValidation = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(3)
});
exports.createValidation = zod_1.default.object({
    title: zod_1.default.string().min(2),
    description: zod_1.default.string().min(10)
});
exports.updateValidation = zod_1.default.object({
    title: zod_1.default.string().min(2),
    description: zod_1.default.string().min(10),
    id: zod_1.default.string()
});
