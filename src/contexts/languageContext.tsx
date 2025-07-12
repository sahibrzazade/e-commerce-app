import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useAuthUser } from "../hooks/useAuthUser";
import i18n from "../i18n/i18next";
import { showErrorMessage } from "../utils/toastUtils";

interface LanguageContextType {
  language: "az" | "en" | "tr";
  changeLanguage: (lang: "az" | "en" | "tr") => void;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthUser();
  const [language, setLanguage] = useState<"az" | "en" | "tr">("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguage = async () => {
      setLoading(true);
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user?.uid));
          const userData = userDoc.data();
          if (userData && userData.language) {
            setLanguage(userData.language);
            i18n.changeLanguage(userData.language);
          } else {
            setLanguage("en");
            i18n.changeLanguage("en");
          }
        } else {
          setLanguage("en");
          i18n.changeLanguage("en");
        }
      } catch (e) {
        setLanguage("en");
        i18n.changeLanguage("en");
      } finally {
        setLoading(false);
      }
    };
    fetchLanguage();
  }, [user]);

  const changeLanguage = async (lang: "az" | "en" | "tr") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);

    if (user) {
      setLoading(true);
      try {
        await setDoc(doc(db, "users", user?.uid), { language: lang }, { merge: true });
      } catch (e) {
        showErrorMessage("Failed to save language");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}; 