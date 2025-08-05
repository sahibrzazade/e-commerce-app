import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import AppLayout from "../layouts/AppLayout";
import { TextInput } from "../components/TextInput";
import { OutlinedButton } from "../components/OutlinedButton";
import { contactSchema, ContactForm } from "../schemas/contactSchema";
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { contactService } from "../services/contactService";
import { showErrorMessage, showSuccessMessage } from "../utils/toastUtils";

export const ContactUs = () => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: ContactForm) => contactService.addContactMessage(data),
        onSuccess: () => {
            showSuccessMessage(t("contact.success"));
            reset();
        },
        onError: () => {
            showErrorMessage(t("contact.error"));
        },
    });

    const onSubmit = (data: ContactForm) => {
        mutation.mutate(data);
    };

    return (
        <AppLayout>
            <>
                <div
                    className="w-full h-[500px] bg-cover bg-center flex justify-center items-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1531265726475-52ad60219627?q=80&w=1191&auto=format&fit=crop&ixlib=rb-4.1.0')",
                    }}
                >
                    <h1 className="text-5xl text-white font-bold tracking-wide uppercase">
                        {t("navigation.contact")}
                    </h1>
                </div>

                <div className="flex flex-col items-center my-12 px-4">
                    <p className="text-center max-w-xl text-lg mb-8">
                        {t("contact.description")}
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-lg p-6 flex flex-col gap-4"
                    >
                        <div className="flex flex-row gap-4">
                            <div className="w-full">
                                <TextInput
                                    type="text"
                                    placeholder={t("contact.name")}
                                    {...register("name")}
                                />
                                {errors.name?.message && (
                                    <p className="text-red-500 text-sm mt-1">{t(errors.name.message)}</p>
                                )}
                            </div>

                            <div className="w-full">
                                <TextInput
                                    type="email"
                                    placeholder={t("contact.email")}
                                    {...register("email")}
                                />
                                {errors.email?.message && (
                                    <p className="text-red-500 text-sm mt-1">{t(errors.email.message)}</p>
                                )}
                            </div>
                        </div>

                        <textarea
                            placeholder={t("contact.message")}
                            {...register("message")}
                            className="outline-none resize-none border-[1px] px-1 py-1 w-full border-black dark:border-white"
                            rows={5}
                        ></textarea>
                        {errors.message?.message && (
                            <p className="text-red-500 text-sm mt-1">{t(errors.message.message)}</p>
                        )}

                        <OutlinedButton
                            content={mutation.status === "pending" ? t("common:submitting") : t("contact.send")}
                            fontWeight="normal"
                            height={50}
                            isDisabled={mutation.status === "pending"}
                            type="submit"
                        />
                    </form>

                    <div className="flex flex-row gap-4 mt-4">
                        <a href="https://www.linkedin.com/in/sahib-rzazade/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-4xl" />
                        </a>
                        <a href="https://www.github.com/sahibrzazade" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-4xl" />
                        </a>
                    </div>
                </div>
            </>
        </AppLayout>
    );
};
