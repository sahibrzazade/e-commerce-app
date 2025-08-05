import { UserOutlined } from "@ant-design/icons";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useState } from "react";
import { userService } from "../../services/userService";
import { useForm } from "react-hook-form";
import { TextInput } from "../TextInput";
import { OutlinedButton } from "../OutlinedButton";
import Button from "@mui/material/Button";
import { showSuccessMessage, showErrorMessage } from "../../utils/toastUtils";
import { updateProfile } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const ProfileInfo = () => {
    const authUser = useAuthUser();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const [editMode, setEditMode] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ name: string }>();

    const {
        data: user,
        isLoading: userLoading,
    } = useQuery({
        queryKey: ["user", authUser?.uid],
        queryFn: async () => {
            if (!authUser?.uid) return null;
            const u = await userService.getUser(authUser.uid);
            if (u) reset({ name: u.name });
            return u;
        },
        enabled: !!authUser?.uid,
    });

    const updateUserMutation = useMutation({
        mutationFn: async (data: { name: string }) => {
            if (!authUser?.uid) throw new Error("No auth user");
            await userService.updateUser(authUser.uid, data);
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: data.name });
            }
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user", authUser?.uid] });
            setEditMode(false);
            reset(data);
            showSuccessMessage(t("profile.profile-updated-successfully"));
        },
        onError: () => {
            showErrorMessage(t("profile.update-profile-failed"));
        },
    });

    const onSubmit = (data: { name: string }) => {
        updateUserMutation.mutate(data);
    };

    return (
        <div className="rounded-lg p-6 gap-2">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <UserOutlined className="text-2xl" />
                <h2 className="text-2xl font-bold">{t("common:profile")}</h2>
            </div>

            {userLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
                </div>
            ) : user ? (
                editMode ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <div>
                            <label className="font-bold">{t("common:name")}:</label>
                            <TextInput
                                {...register("name", { required: t("profile.name-is-required") })}
                                name="name"
                                disabled={updateUserMutation.isPending}
                            />
                            {errors.name && <span className="text-red-400 ml-2">{errors.name.message}</span>}
                        </div>
                        <div>
                            <label className="font-bold">{t("common:email")}:</label>
                            <span className="ml-2">{user.email}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <OutlinedButton
                                content={t("common:save")}
                                height={36}
                                fontWeight="bold"
                                type="submit"
                                isDisabled={updateUserMutation.isPending}
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                style={{ height: 36, fontWeight: 400 }}
                                type="button"
                                disabled={updateUserMutation.isPending}
                                onClick={() => {
                                    setEditMode(false);
                                    reset({ name: user.name });
                                }}
                            >
                                {t("common:cancel")}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="flex flex-row items-center gap-2">
                            <div>
                                <span className="font-bold">{t("common:name")}:</span> <span>{user.name}</span>
                            </div>
                            {!userLoading && user && !editMode && (
                                <OutlinedButton
                                    content={t("common:edit")}
                                    height={36}
                                    fontWeight="bold"
                                    onClick={() => setEditMode(true)}
                                    type="button"
                                />
                            )}
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <div>
                                <span className="font-bold">{t("common:email")}:</span> <span>{user.email}</span>
                            </div>
                        </div>
                    </>
                )
            ) : (
                <span className="text-red-400">{t("profile.user-info-not-found")}</span>
            )}
        </div>
    );
};
