import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

export const Register = () => {
  return (
    <div className="min-h-screen flex bg-black">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-black max-h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-white">Create your account</h2>
          <p className="mb-6 text-gray-300">Sign up to get started.</p>
          <RegisterForm />
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-white hover:underline">Login</Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center bg-black">
        <img src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?_gl=1*oxbuq7*_ga*MzEzODIzNDA2LjE3NDk4OTU2Mzc.*_ga_8JE65Q40S6*czE3NTA2NjM5MzQkbzMkZzEkdDE3NTA2NjM5NTMkajQxJGwwJGgw" alt="Register Visual" className="max-w-full h-auto object-contain" />
      </div>
    </div>
  );
} 