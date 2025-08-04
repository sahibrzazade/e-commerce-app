import { useTranslation } from "react-i18next";
import AppLayout from "../layouts/AppLayout"

export const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <>
        <div className="w-full h-[500px] bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531265726475-52ad60219627?q=80&w=1191&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
          <h1 className="text-5xl text-white font-bold tracking-wide uppercase">{t("common:about-us")}</h1>
        </div>
        <div className="flex flex-col gap-y-8 md:gap-y-0 items-center md:flex-row justify-around my-8 max-w-4xl mx-auto">
          <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-2">{t('about.mission-title')}</h2>
            <p className="text-lg mb-4">{t('about.mission-desc')}</p>
            <h2 className="text-2xl font-bold mb-2 mt-6">{t('about.values-title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-semibold">{t('about.excellence')}</span> – {t('about.excellence-desc')}</li>
              <li><span className="font-semibold">{t('about.sophistication')}</span> – {t('about.sophistication-desc')}</li>
              <li><span className="font-semibold">{t('about.integrity')}</span> – {t('about.integrity-desc')}</li>
              <li><span className="font-semibold">{t('about.inspiration')}</span> – {t('about.inspiration-desc')}</li>
            </ul>
          </div>
        </div>
      </>
    </AppLayout>
  )
}