import AppLayout from "../layouts/AppLayout"
import { ProfileInfo } from "../components/profile/ProfileInfo"
import { ProfileCart } from "../components/profile/ProfileCart"
import { ProfileWishlist } from "../components/profile/ProfileWishlist"
import { ProfileReviews } from "../components/profile/ProfileReviews"
import { ProfileSignout } from "../components/profile/ProfileSignout"
import { ProfileSettings } from "../components/profile/ProfileSettings"
import { useAuthUser } from "../hooks/useAuthUser"
import { OutlinedButton } from "../components/OutlinedButton"
import { useNavigate } from "react-router-dom"
import { ProfileOrders } from "../components/profile/ProfileOrders"
import { useTranslation } from "react-i18next"
import { themedBorder } from "../styles/themeClassNames"

export const Profile = () => {
    const { user, loading } = useAuthUser();
    const navigate = useNavigate();
    const { t } = useTranslation();

    if (loading) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center h-screen">
                    <div className={`${themedBorder} animate-spin rounded-full h-16 w-16 border-b-2`}></div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            {user ?
                <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8">
                    <ProfileInfo />
                    <hr className="border-t border-gray-300" />
                    <ProfileOrders />
                    <hr className="border-t border-gray-300" />
                    <ProfileCart />
                    <hr className="border-t border-gray-300" />
                    <ProfileWishlist />
                    <hr className="border-t border-gray-300" />
                    <ProfileReviews />
                    <hr className="border-t border-gray-300" />
                    <ProfileSettings />
                    <hr className="border-t border-gray-300" />
                    <ProfileSignout />
                </div>
                :
                <div className="max-w-6xl mx-auto py-8 px-4">
                    <h1 className="text-2xl font-bold text-center">{t("auth.sign-in-to-view-profile")}</h1>
                    <p className="text-center mt-4">{t("profile.manage-account-after-sign-in")}</p>
                    <p className="text-center mt-2">{t("auth.click-button-to-sign-in")}</p>
                    <div className="flex justify-center mt-4">
                        <OutlinedButton
                            content={t("common:sign-in")}
                            height={60}
                            width={200}
                            fontWeight="bold"
                            onClick={() => navigate('/sign-in')}
                        />
                    </div>
                </div>
            }
        </AppLayout>
    )
}
