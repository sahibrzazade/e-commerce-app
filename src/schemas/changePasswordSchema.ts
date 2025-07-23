import { z } from 'zod';

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'errors.current-password-required'),
  newPassword: z.string().min(6, 'errors.new-password-must-be-at-least-six-characters'),
  confirmPassword: z.string().min(1, 'errors.please-confirm-your-new-password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "errors.passwords-dont-match",
  path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "errors.new-password-must-be-different-from-current-password",
  path: ["newPassword"],
});

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>; 