import {z} from "zod";

export const UserFormValidation = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name can not be longer than 50 characters."),
    email: z.string().email("Email address is invalid"),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Phone number is invalid"),
})