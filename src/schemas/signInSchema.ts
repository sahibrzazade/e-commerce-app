import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('errors.invalid-email-address'),
  password: z.string().min(6, 'auth.password-min-length'),
});

export type SignInForm = z.infer<typeof signInSchema>; 