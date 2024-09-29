import { z } from "zod";

export const formSchema = z.object({ 
    email: z.string({required_error: "Email is required"}).email({message: "Email must be valid"}),
    password: z.string({required_error: "Password is required"}).min(6, {message: "Password must be at least 6 characters"})
})