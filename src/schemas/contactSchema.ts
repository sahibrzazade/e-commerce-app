import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "errors.name-must-be-at-least-two-characters"),
    email: z.string().email("errors.invalid-email-address"),
    message: z.string().min(10, "errors.message-must-be-at-least-ten-characters"),
});

export type ContactForm = z.infer<typeof contactSchema>;