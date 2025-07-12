import { UserOutlined } from "@ant-design/icons"
import { User } from "../../types"
import { useAuthUser } from "../../hooks/useAuthUser";
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { useForm } from "react-hook-form";
import { TextInput } from "../TextInput";
import { OutlinedButton } from "../OutlinedButton";
import Button from "@mui/material/Button";
import { showSuccessMessage, showErrorMessage } from "../../utils/toastUtils";
import { updateProfile } from "firebase/auth";
import { auth } from "../../configs/firebase";

export const ProfileInfo = () => {
    const authUser = useAuthUser();

    const [user, setUser] = useState<User | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<{ name: string }>();

    useEffect(() => {
        const fetchUser = async () => {
            if (authUser?.uid) {
                setUserLoading(true);
                const u = await userService.getUser(authUser.uid);
                setUser(u);
                setUserLoading(false);
                if (u) {
                    reset({ name: u.name });
                }
            } else {
                setUser(null);
                setUserLoading(false);
            }
        };
        fetchUser();
    }, [authUser, reset]);

    const onSubmit = async (data: { name: string }) => {
        if (!authUser?.uid) return;
        try {
            await userService.updateUser(authUser.uid, data);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: data.name });
            }
            setUser((prev) => prev ? { ...prev, ...data } : prev);
            setEditMode(false);
            reset(data);
            showSuccessMessage("Profile updated successfully!");
        } catch (e) {
            showErrorMessage("Failed to update profile. Please try again.");
        }
    };

    return (
        <div className="rounded-lg p-6 gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <UserOutlined className="text-2xl" />
                <h2 className="text-2xl font-bold">Profile</h2>
            </div>
            {userLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) : user ? (
                editMode ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <div>
                            <label className="font-bold">Name:</label>
                            <TextInput
                                {...register("name", { required: "Name is required" })}
                                name="name"
                                disabled={isSubmitting}
                            />
                            {errors.name && <span className="text-red-400 ml-2">{errors.name.message}</span>}
                        </div>
                        <div>
                            <label className="font-bold">Email:</label>
                            <span className="ml-2">{user.email}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <OutlinedButton
                                content="Save"
                                height={36}
                                width={80}
                                fontWeight="bold"
                                type="submit"
                                isDisabled={isSubmitting}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                style={{ height: 36, width: 80, fontWeight: 400 }}
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => {
                                    setEditMode(false);
                                    reset({ name: user.name });
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="flex flex-row items-center gap-2">
                            <div>
                                <span className="font-bold">Name:</span> <span>{user.name}</span>
                            </div>
                            {!userLoading && user && !editMode && (
                                <OutlinedButton
                                    content="Edit"
                                    height={36}
                                    width={80}
                                    fontWeight="bold"
                                    onClick={() => setEditMode(true)}
                                    type="button"
                                />
                            )}
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div>
                                <span className="font-bold">Email:</span> <span>{user.email}</span>
                            </div>
                        </div>
                    </>
                )
            ) : (
                <span className="text-red-400">User info not found.</span>
            )}
        </div>
    )
}
