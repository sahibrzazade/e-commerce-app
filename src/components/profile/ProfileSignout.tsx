import { AiOutlineLogout } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { showErrorMessage, showSuccessMessage } from "../../utils/toastUtils";

export const ProfileSignout = () => {
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await authService.signOut();
            showSuccessMessage('Sign Out successful');
            navigate('/');
        } catch (error) {
            showErrorMessage('Sign Out failed. Please try again later.');
        }
    };

    return (
        <div className="rounded-lg flex flex-col items-center md:items-start p-6 gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <AiOutlineLogout className="text-2xl" />
                <h2 className="text-2xl font-bold">Sign out</h2>
            </div>
            <p className="text-gray-600">Click the button below to sign out of your account.</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors" onClick={handleSignout}>
                Sign out
            </button>
            <p className="mt-2 text-sm text-gray-500">You will be redirected to the homepage.</p>
        </div>
    )
}
