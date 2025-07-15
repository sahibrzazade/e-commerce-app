import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { signUpSchema, SignUpForm as SignUpFormType } from '../../schemas/signUpSchema';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../../utils/toastUtils';
import { getFirebaseAuthErrorMessage } from '../../utils/firebaseErrorMessages';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { FcGoogle } from 'react-icons/fc';

export const SignUpForm = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormType) => {
    setSignUpError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      await userService.createUser(userCredential.user.uid, {
        name: data.name,
        email: data.email,
      });
      showSuccessMessage('Sign Up successful!');
      navigate('/sign-in');
    } catch (err: any) {
      const message = getFirebaseAuthErrorMessage ? getFirebaseAuthErrorMessage(err) : 'Something went wrong!';
      setSignUpError(message);
      showErrorMessage(message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const response = await authService.signInWithGoogle();
      const user = response.user;
      await userService.createUser(user.uid, {
        name: user.displayName || '',
        email: user.email || '',
      });
      showSuccessMessage(`Welcome, ${response.user.displayName || response.user.email}!`);
      navigate('/');
    } catch (err: any) {
      const message = getFirebaseAuthErrorMessage ? getFirebaseAuthErrorMessage(err) : 'Something went wrong!';
      setSignUpError(message);
      showErrorMessage(message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label className="block mb-1" htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-600 placeholder-gray-500"
          placeholder="Enter your name"
          {...register('name')}
          autoComplete="name"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-600 placeholder-gray-500"
          placeholder="Enter your email"
          {...register('email')}
          autoComplete="username"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none border-gray-600 placeholder-gray-500"
          placeholder="Enter your password"
          {...register('password')}
          autoComplete="new-password"
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
      </div>
      {signUpError && <p className="text-red-400 text-sm mt-1">{signUpError}</p>}
      <button
        type="submit"
        className="w-full py-2 rounded-lg font-semibold border border-gray-600 hover:bg-gray-200 hover:dark:bg-gray-900 transition cursor-pointer disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>
      <div className="flex items-center my-4">
        <div className="flex-grow h-px bg-gray-700" />
        <span className="mx-2 text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-700" />
      </div>
      <button className="w-full flex items-center justify-center gap-2 border border-gray-600 py-2 rounded-lg hover:bg-gray-200 hover:dark:bg-gray-900 transition cursor-pointer"
        onClick={handleGoogleSignUp}
      >
        <FcGoogle />
        Sign up with Google
      </button>
    </form>
  );
}; 