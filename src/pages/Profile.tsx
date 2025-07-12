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

export const Profile = () => {
    const user = useAuthUser();
    const navigate = useNavigate();

    return (
        <AppLayout>
            {user ?
                <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8">
                    <ProfileInfo />
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
                    <h1 className="text-2xl font-bold text-center">Please sign in to view your profile</h1>
                    <p className="text-center mt-4">You can manage your account, view your orders, and more once you are signed in.</p>
                    <p className="text-center mt-2">Click the button below to sign in</p>
                    <div className="flex justify-center mt-4">
                        <OutlinedButton
                            content="Sign In"
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
