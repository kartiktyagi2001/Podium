import z from "zod";
export declare const signupValidation: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
}, {
    email: string;
    name: string;
    password: string;
}>;
export declare const signinValidation: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createValidation: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
}, {
    title: string;
    description: string;
}>;
export declare const updateValidation: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    id: string;
}, {
    title: string;
    description: string;
    id: string;
}>;
export type signupValidation = z.infer<typeof signupValidation>;
export type signinValidation = z.infer<typeof signinValidation>;
export type createValidation = z.infer<typeof createValidation>;
export type updateValidation = z.infer<typeof updateValidation>;
