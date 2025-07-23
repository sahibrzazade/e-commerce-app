import { AiOutlineLogout } from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { showErrorMessage, showSuccessMessage } from "../../utils/toastUtils";
import { useTranslation } from "react-i18next";

export const ProfileSignout = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSignout = async () => {
        try {
            await authService.signOut();
            showSuccessMessage(t("auth.sign-out-successful"));
            navigate('/');
        } catch (error) {
            showErrorMessage(t("auth.sign-out-failed"));
        }
    };

    return (
        <div className="rounded-lg flex flex-col items-center md:items-start p-6 gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <AiOutlineLogout className="text-2xl" />
                <h2 className="text-2xl font-bold">{t("common:sign-out")}</h2>
            </div>
            <p className="text-gray-600">{t("profile.sign-out-instruction")}</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors" onClick={handleSignout}>
                {t("common:sign-out")}
            </button>
            <p className="mt-2 text-sm text-gray-500">
                {t("common:redirect-to-homepage")}
            </p>
        </div>
    )
}
