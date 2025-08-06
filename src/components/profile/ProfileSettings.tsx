import { SettingFilled, MoonFilled, LockOutlined, GlobalOutlined } from "@ant-design/icons"
import { useTheme } from "../../contexts/ThemeContext"
import { useLanguage } from "../../contexts/LanguageContext"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { changePasswordSchema, ChangePasswordForm } from '../../schemas/changePasswordSchema';
import { authService } from '../../services/authService';
import { showErrorMessage, showSuccessMessage } from '../../utils/toastUtils';
import { getFirebaseAuthErrorMessage } from '../../utils/firebaseErrorMessages';
import { OutlinedButton } from '../OutlinedButton';
import { TextInput } from '../TextInput';
import { useAuthUser } from '../../hooks/useAuthUser';
import { LanguageSelect } from '../LanguageSelect';
import { Language } from '../../types/language';
import { themedBackground } from "../../styles/themeClassNames";
import { useTranslation } from "react-i18next";

export const ProfileSettings = () => {
    const { theme, toggleTheme, loading: themeLoading } = useTheme();
    const { language, changeLanguage, loading: languageLoading } = useLanguage();
    const { user } = useAuthUser();
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
    const { t } = useTranslation();

    const isEmailPasswordUser = user?.providerData.some(provider => provider.providerId === 'password');

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmitChangePassword = async (data: ChangePasswordForm) => {
        setChangePasswordError(null);
        try {
            await authService.changePassword(data.currentPassword, data.newPassword);
            showSuccessMessage(t("password-changed-successfully"));
            reset();
            setShowChangePassword(false);
        } catch (err: any) {
            const messageKey = getFirebaseAuthErrorMessage(err);
            setChangePasswordError(t(`errors.${messageKey}`));
            showErrorMessage(t(`errors.${messageKey}`));
        }
    };

    return (
        <div className="rounded-lg p-6 gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <SettingFilled className="text-2xl" />
                <h2 className="text-2xl font-bold">{t("profile.account-settings")}</h2>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400">
                            <MoonFilled />
                        </div>
                        <div>
                            <h3 className="font-medium">{t("common:dark-mode")}</h3>
                            <p className="text-sm text-gray-600">{t("profile.toggle-theme")}</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={theme === "dark"}
                            onChange={toggleTheme}
                            disabled={themeLoading}
                        />
                        <div
                            className={`w-11 h-6 flex items-center border-2 rounded-full transition-colors duration-300
                                ${theme === "dark" ? "bg-white border-white" : "bg-gray-300 border-gray-300"}
                                peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300`}
                        >
                            <span className={`${themedBackground} w-5 h-5 flex items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`}></span>
                        </div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400">
                            <GlobalOutlined className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium">{t("common:language")}</h3>
                            <p className="text-sm text-gray-600">{t("profile.choose-your-preferred-language")}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <LanguageSelect
                            value={language}
                            onChange={(value) => changeLanguage(value as Language)}
                            disabled={languageLoading}
                            showName={true}
                        />
                    </div>
                </div>

                {isEmailPasswordUser && (
                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-400">
                                    <LockOutlined />
                                </div>
                                <div>
                                    <h3 className="font-medium">{t("common:change-password")}</h3>
                                    <p className="text-sm text-gray-600">{t("profile.update-account-password")}</p>
                                </div>
                            </div>
                            <OutlinedButton
                                content={showChangePassword ? t("common:cancel") : t("common:change")}
                                height={40}
                                width={80}
                                fontWeight="normal"
                                onClick={() => setShowChangePassword(!showChangePassword)}
                            />
                        </div>

                        {showChangePassword && (
                            <form onSubmit={handleSubmit(onSubmitChangePassword)} className="mt-4 space-y-4 p-4 rounded-lg">
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
                                        {t("common:current-password")}
                                    </label>
                                    <TextInput
                                        id="currentPassword"
                                        type="password"
                                        placeholder={t("profile.enter-current-password")}
                                        {...register('currentPassword')}
                                    />
                                    {errors.currentPassword?.message && (
                                        <p className="text-red-500 text-sm mt-1">{t(errors.currentPassword.message)}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
                                        {t("common:new-password")}
                                    </label>
                                    <TextInput
                                        id="newPassword"
                                        type="password"
                                        placeholder={t("profile.enter-new-password")}
                                        {...register('newPassword')}
                                    />
                                    {errors.newPassword?.message && (
                                        <p className="text-red-500 text-sm mt-1">{t(errors.newPassword.message)}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                                        {t("common:confirm-new-password")}
                                    </label>
                                    <TextInput
                                        id="confirmPassword"
                                        type="password"
                                        placeholder={t("common:confirm-new-password")}
                                        {...register('confirmPassword')}
                                    />
                                    {errors.confirmPassword?.message && (
                                        <p className="text-red-500 text-sm mt-1">{t(errors.confirmPassword.message)}</p>
                                    )}
                                </div>

                                {changePasswordError && (
                                    <p className="text-red-500 text-sm">{changePasswordError}</p>
                                )}

                                <OutlinedButton
                                    content={isSubmitting ? t("profile.changing-password") : t("common:change-password")}
                                    height={40}
                                    width={300}
                                    fontWeight="normal"
                                    type="submit"
                                    isDisabled={isSubmitting}
                                />
                            </form>
                        )}
                    </div>
                )}

                {!isEmailPasswordUser && user && (
                    <div className="border-t pt-4">
                        <div className="flex items-center p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500">
                                    <LockOutlined />
                                </div>
                                <div>
                                    <h3 className="font-medium">
                                        {t("common:google-account")}
                                    </h3>
                                    <p className="text-sm text-gray-600">{t("profile.signed-in-with-google-info")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
