import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { loginSchema, LoginForm as LoginFormType } from '../../schemas/loginSchema';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../../utils/toastUtils';
import { getFirebaseAuthErrorMessage } from '../../utils/firebaseErrorMessages';
import { FcGoogle } from 'react-icons/fc';

export const LoginForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormType) => {
    setLoginError(null);
    try {
      const response = await authService.login(data.email, data.password);
      showSuccessMessage(`Welcome back, ${response.user.displayName}!`);
      navigate('/');
    } catch (err: any) {
      const message = getFirebaseAuthErrorMessage(err);
      setLoginError(message);
      showErrorMessage(message);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoginError(null);
    try {
      const response = await authService.loginWithGoogle();
      showSuccessMessage(`Welcome, ${response.user.displayName}!`);
      navigate('/');
    } catch (err: any) {
      const message = getFirebaseAuthErrorMessage(err);
      setLoginError(message);
      showErrorMessage(message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label className="block text-white mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-black text-white border-gray-600 placeholder-gray-500"
          placeholder="Enter your email"
          {...register('email')}
          autoComplete="username"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-white mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none bg-black text-white border-gray-600 placeholder-gray-500"
          placeholder="Enter your password"
          {...register('password')}
          autoComplete="current-password"
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
      </div>
      {loginError && <p className="text-red-400 text-sm mt-1">{loginError}</p>}
      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </button>
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-700" />
        <span className="mx-2 text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-700" />
      </div>
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-600 py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer text-white bg-black mt-4"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle />
        Sign in with Google
      </button>
    </form>
  );
}; 