import z from "zod"

export const signupValidation = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(3)
});

export const signinValidation = z.object({
    email: z.string().email(),
    password: z.string().min(3)
});

export const createValidation = z.object({
    title: z.string().min(2),
    description: z.string().min(10)
});

export const updateValidation = z.object({
    title: z.string().min(2),
    description: z.string().min(10),
    id: z.string()
});



//type inference in zod 
//this will allow access by fe

//signup
export type signupValidation = z.infer<typeof signupValidation>
//signin
export type signinValidation = z.infer<typeof signinValidation>
//create
export type createValidation = z.infer<typeof createValidation>
//update
export type updateValidation = z.infer<typeof updateValidation>