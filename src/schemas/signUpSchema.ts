import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, 'errors.name-must-be-at-least-two-characters'),
  email: z.string().email('errors.invalid-email-address'),
  password: z.string().min(6, 'auth.password-min-length'),
});

export type SignUpForm = z.infer<typeof signUpSchema>; 