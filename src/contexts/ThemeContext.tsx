import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useAuthUser } from "../hooks/useAuthUser";
import { THEME_LOCAL_STORAGE_KEY } from "../constants/theme";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthUser();
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const fetchTheme = async () => {
      setLoading(true);
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user?.uid));
          const userData = userDoc.data();
          if (userData && userData.theme) {
            setTheme(userData.theme);
            localStorage.setItem(THEME_LOCAL_STORAGE_KEY, userData.theme);
          } else {
            setTheme("light");
            localStorage.setItem(THEME_LOCAL_STORAGE_KEY, "light");
          }
        } else {
          const storedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as "dark" | "light" | null;
          if (storedTheme === "dark" || storedTheme === "light") {
            setTheme(storedTheme);
          } else {
            setTheme("light");
            localStorage.setItem(THEME_LOCAL_STORAGE_KEY, "light");
          }
        }
      } catch (e) {
        setTheme("light");
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, "light");
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, [user]);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, newTheme);
    if (user) {
      setLoading(true);
      try {
        await setDoc(doc(db, "users", user?.uid), { theme: newTheme }, { merge: true });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; 