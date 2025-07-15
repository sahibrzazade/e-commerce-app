import { Link } from 'react-router-dom';
import { SignUpForm } from '../components/auth/SignUpForm';
import { themedBackground, themedText } from '../styles/themeClassNames';

export const SignUp = () => {
  return (
    <div className={`${themedBackground} ${themedText} min-h-screen flex`}>
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 max-h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Create your account</h2>
          <p className="mb-6 text-black dark:text-gray-300">Sign up to get started.</p>
          <SignUpForm />
          <p className="mt-6 text-center text-black dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/sign-in" className={`${themedText} hover:underline`}>Sign In</Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?_gl=1*oxbuq7*_ga*MzEzODIzNDA2LjE3NDk4OTU2Mzc.*_ga_8JE65Q40S6*czE3NTA2NjM5MzQkbzMkZzEkdDE3NTA2NjM5NTMkajQxJGwwJGgw" alt="Sign Up Visual" className="max-w-full h-auto object-contain" />
      </div>
    </div>
  );
} 