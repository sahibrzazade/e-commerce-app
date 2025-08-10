import React from 'react';
import AppLayout from '../layouts/AppLayout';
import { OutlinedButton } from '../components/OutlinedButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <h1 className="text-4xl font-bold mb-4">{t("common:not-found-title")}</h1>
                <p className="text-lg mb-6">{t("common:not-found-description")}</p>
                <OutlinedButton content={t("common:go-back-to-home")} height={60} width={200} fontWeight='bold' onClick={() => navigate("/home")} />
            </div>
        </AppLayout>
    );
};

export default NotFound;
