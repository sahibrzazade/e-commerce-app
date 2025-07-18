import { Link } from 'react-router-dom';
import { SignInForm } from '../components/auth/SignInForm';
import { themedBackground, themedText } from '../styles/themeClassNames';

export const SignIn = () => {
    return (
        <div className={`${themedBackground} ${themedText} min-h-screen flex `}>
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 max-h-screen overflow-y-auto">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-2">Sign in to your account</h2>
                    <p className="mb-6 text-black dark:text-gray-300">Welcome back! Please enter your details.</p>
                    <SignInForm />
                    <p className="mt-6 text-center text-black dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/sign-up" className={`${themedText} hover:underline`}>Sign Up</Link>
                    </p>
                </div>
            </div>
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <img src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?_gl=1*oxbuq7*_ga*MzEzODIzNDA2LjE3NDk4OTU2Mzc.*_ga_8JE65Q40S6*czE3NTA2NjM5MzQkbzMkZzEkdDE3NTA2NjM5NTMkajQxJGwwJGgw" alt="SignIn Visual" className="max-w-full h-auto object-contain" />
            </div>
        </div>
    );
}
